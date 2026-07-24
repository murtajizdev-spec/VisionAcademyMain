import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGetFaculty, useAdminCreateFaculty, useAdminUpdateFaculty, useAdminDeleteFaculty } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EMPTY = { name: "", subject: "", qualification: "", experience: "", bio: "", imageUrl: "", featured: false, sortOrder: 0 };

export default function AdminFaculty() {
  const { toast } = useToast();
  const { data: faculty, isLoading, refetch } = useAdminGetFaculty();
  const createMutation = useAdminCreateFaculty();
  const updateMutation = useAdminUpdateFaculty();
  const deleteMutation = useAdminDeleteFaculty();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (f: any) => { setEditing(f); setForm({ ...f }); setOpen(true); };

  const handleSubmit = () => {
    const payload = { ...form, sortOrder: Number(form.sortOrder || 0) };
    if (editing) {
      updateMutation.mutate({ id: editing.id, data: payload }, {
        onSuccess: () => { toast({ title: "Faculty updated" }); setOpen(false); refetch(); },
        onError: () => toast({ title: "Error", variant: "destructive" })
      });
    } else {
      createMutation.mutate({ data: payload }, {
        onSuccess: () => { toast({ title: "Faculty created" }); setOpen(false); refetch(); },
        onError: () => toast({ title: "Error", variant: "destructive" })
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-bold">Faculty Management</h2>
        <Button onClick={openCreate} className="bg-primary hover:bg-primary/90 gap-2"><Plus className="w-4 h-4" /> Add Faculty</Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 rounded-xl bg-card border border-border" />)}</div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Subject</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Qualification</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Experience</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Featured</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {faculty?.map((f) => (
                  <tr key={f.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-white">{f.name}</td>
                    <td className="p-4 text-muted-foreground">{f.subject}</td>
                    <td className="p-4 text-muted-foreground">{f.qualification}</td>
                    <td className="p-4 text-muted-foreground">{f.experience}</td>
                    <td className="p-4"><span className={`px-2 py-1 text-xs rounded ${f.featured ? "bg-emerald-500/20 text-emerald-500" : "bg-muted text-muted-foreground"}`}>{f.featured ? "Yes" : "No"}</span></td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEdit(f)} className="h-8 w-8 p-0 border-border hover:border-primary/50"><Pencil className="w-3 h-3" /></Button>
                        <Button size="sm" variant="outline" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate({ id: f.id }, { onSuccess: () => refetch() }); }} className="h-8 w-8 p-0 border-border hover:border-red-500/50 hover:text-red-500"><Trash2 className="w-3 h-3" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit Faculty" : "Add Faculty Member"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="col-span-2"><label className="text-sm text-muted-foreground mb-1 block">Name *</label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="bg-background/50 border-border" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Subject *</label><Input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="bg-background/50 border-border" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Experience *</label><Input value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} className="bg-background/50 border-border" placeholder="e.g. 10 Years" /></div>
            <div className="col-span-2"><label className="text-sm text-muted-foreground mb-1 block">Qualification *</label><Input value={form.qualification} onChange={e => setForm({ ...form, qualification: e.target.value })} className="bg-background/50 border-border" /></div>
            <div className="col-span-2"><label className="text-sm text-muted-foreground mb-1 block">Bio</label><Textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className="bg-background/50 border-border resize-none h-24" /></div>
            <div className="col-span-2"><label className="text-sm text-muted-foreground mb-1 block">Image URL</label><Input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="bg-background/50 border-border" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Sort Order</label><Input type="number" value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: e.target.value })} className="bg-background/50 border-border" /></div>
            <div className="flex items-center gap-3 mt-4"><input type="checkbox" id="featured2" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="accent-primary" /><label htmlFor="featured2" className="text-sm">Featured</label></div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setOpen(false)} className="border-border">Cancel</Button>
            <Button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending} className="bg-primary hover:bg-primary/90">{editing ? "Update" : "Create"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
