import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useSiteSettings, useUpdateSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export default function AdminSettings() {
  const { data: settings, isLoading } = useSiteSettings();
  const update = useUpdateSiteSettings();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [form, setForm] = React.useState<Record<string, string>>({});
  const [dirty, setDirty] = React.useState(false);
  const [logoUploading, setLogoUploading] = React.useState(false);
  const logoInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (settings && !dirty) {
      setForm({
        siteName: settings.siteName ?? "",
        tagline: settings.tagline ?? "",
        address: settings.address ?? "",
        phone1: settings.phone1 ?? "",
        phone2: settings.phone2 ?? "",
        email1: settings.email1 ?? "",
        email2: settings.email2 ?? "",
        mapEmbedUrl: settings.mapEmbedUrl ?? "",
        websiteUrl: settings.websiteUrl ?? "",
        facebookUrl: settings.facebookUrl ?? "",
        twitterUrl: settings.twitterUrl ?? "",
        instagramUrl: settings.instagramUrl ?? "",
        whatsappNumber: settings.whatsappNumber ?? "",
        logoUrl: settings.logoUrl ?? "",
      });
    }
  }, [settings, dirty]);

  const set = (key: string, value: string) => {
    setForm(f => ({ ...f, [key]: value }));
    setDirty(true);
  };

  const handleSave = () => {
    update.mutate(form, {
      onSuccess: () => {
        toast({ title: "Settings saved", description: "Site settings updated successfully." });
        setDirty(false);
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
      },
    });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUploading(true);
    try {
      const token = localStorage.getItem("vp_token");
      const fd = new FormData();
      fd.append("logo", file);
      const res = await fetch("/api/admin/upload-logo", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      // Save the logo URL immediately
      const token2 = localStorage.getItem("vp_token");
      await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token2}` },
        body: JSON.stringify({ logoUrl: url }),
      });
      setForm(f => ({ ...f, logoUrl: url }));
      qc.invalidateQueries({ queryKey: ["site-settings"] });
      toast({ title: "Logo updated", description: "The site logo has been changed." });
    } catch {
      toast({ title: "Upload failed", description: "Could not upload logo.", variant: "destructive" });
    } finally {
      setLogoUploading(false);
      if (logoInputRef.current) logoInputRef.current.value = "";
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-muted-foreground">Loading settings…</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Site Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage contact info, social links, and site identity shown across the website.</p>
          </div>
          <Button onClick={handleSave} disabled={update.isPending || !dirty} className="bg-primary hover:bg-primary/90 text-white min-w-28">
            {update.isPending ? "Saving…" : "Save Changes"}
          </Button>
        </div>

        {/* Identity */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h2 className="font-display font-semibold text-lg border-b border-border pb-3">Site Identity</h2>

          {/* Logo upload */}
          <Field label="Site Logo" hint="Upload a PNG or SVG logo. Shown in the navbar and footer.">
            <div className="flex items-center gap-4">
              {form.logoUrl ? (
                <img src={form.logoUrl} alt="Logo preview" className="h-12 w-auto object-contain rounded border border-border bg-muted p-1" />
              ) : (
                <div className="h-12 w-20 rounded border border-dashed border-border bg-muted flex items-center justify-center text-xs text-muted-foreground">No logo</div>
              )}
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={logoUploading}
                  onClick={() => logoInputRef.current?.click()}
                >
                  {logoUploading ? "Uploading…" : "Upload Logo"}
                </Button>
                {form.logoUrl && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => { set("logoUrl", ""); setDirty(true); }}
                  >
                    Remove
                  </Button>
                )}
              </div>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </div>
          </Field>

          <Field label="Site Name">
            <Input value={form.siteName ?? ""} onChange={e => set("siteName", e.target.value)} placeholder="VisionPrep" />
          </Field>
          <Field label="Tagline" hint="Shown in footer and meta descriptions.">
            <Textarea value={form.tagline ?? ""} onChange={e => set("tagline", e.target.value)} rows={2} className="resize-none" />
          </Field>
          <Field label="Website URL">
            <Input value={form.websiteUrl ?? ""} onChange={e => set("websiteUrl", e.target.value)} placeholder="https://visionprep.edu.pk" />
          </Field>
        </section>

        {/* Contact Info */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h2 className="font-display font-semibold text-lg border-b border-border pb-3">Contact Information</h2>
          <Field label="Address">
            <Textarea value={form.address ?? ""} onChange={e => set("address", e.target.value)} rows={2} className="resize-none" placeholder="Main Campus, F-8 Markaz, Islamabad, Pakistan" />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Primary Phone">
              <Input value={form.phone1 ?? ""} onChange={e => set("phone1", e.target.value)} placeholder="+92 300 1234567" />
            </Field>
            <Field label="Secondary Phone">
              <Input value={form.phone2 ?? ""} onChange={e => set("phone2", e.target.value)} placeholder="+92 51 1234567" />
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Primary Email">
              <Input value={form.email1 ?? ""} onChange={e => set("email1", e.target.value)} placeholder="info@visionprep.edu.pk" />
            </Field>
            <Field label="Admissions Email">
              <Input value={form.email2 ?? ""} onChange={e => set("email2", e.target.value)} placeholder="admissions@visionprep.edu.pk" />
            </Field>
          </div>
          <Field label="Google Maps Embed URL" hint='Paste the "src" value from Google Maps → Share → Embed a map.'>
            <Input value={form.mapEmbedUrl ?? ""} onChange={e => set("mapEmbedUrl", e.target.value)} placeholder="https://www.google.com/maps/embed?pb=..." />
          </Field>
        </section>

        {/* Social Links */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h2 className="font-display font-semibold text-lg border-b border-border pb-3">Social Media Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Facebook URL">
              <Input value={form.facebookUrl ?? ""} onChange={e => set("facebookUrl", e.target.value)} placeholder="https://facebook.com/visionprep" />
            </Field>
            <Field label="Instagram URL">
              <Input value={form.instagramUrl ?? ""} onChange={e => set("instagramUrl", e.target.value)} placeholder="https://instagram.com/visionprep" />
            </Field>
            <Field label="Twitter / X URL">
              <Input value={form.twitterUrl ?? ""} onChange={e => set("twitterUrl", e.target.value)} placeholder="https://x.com/visionprep" />
            </Field>
            <Field label="WhatsApp Number" hint="Include country code, no spaces or dashes. e.g. +923001234567">
              <Input value={form.whatsappNumber ?? ""} onChange={e => set("whatsappNumber", e.target.value)} placeholder="+923001234567" />
            </Field>
          </div>
        </section>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={update.isPending || !dirty} className="bg-primary hover:bg-primary/90 text-white min-w-28">
            {update.isPending ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
