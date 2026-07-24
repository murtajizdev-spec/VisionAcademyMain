import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGetTestimonials, useAdminCreateTestimonial, useAdminUpdateTestimonial, useAdminDeleteTestimonial } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EMPTY = { studentName: "", course: "", year: new Date().getFullYear().toString(), content: "", rating: 5, imageUrl: "", featured: false };

export default function AdminTestimonials() {
  const { toast } = useToast();
  const { data: testimonials, isLoading, refetch } = useAdminGetTestimonials();
  const createMutation = useAdminCreateTestimonial();
  const updateMutation = useAdminUpdateTestimonial();
  const deleteMutation = useAdminDeleteTestimonial();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (t: any) => { setEditing(t); setForm({ ...t }); setOpen(true); };

  const handleSubmit = () => {
    const payload = { ...form, rating: Number(form.rating) };
    if (editing) {
      updateMutation.mutate({ id: editing.id, data: payload }, {
        onSuccess: () => { toast({ title: "Testimonial updated" }); setOpen(false); refetch(); },
        onError: () => toast({ title: "Error", variant: "destructive" })
      });
    } else {
      createMutation.mutate({ data: payload }, {
        onSuccess: () => { toast({ title: "Testimonial added" }); setOpen(false); refetch(); },
        onError: () => toast({ title: "Error", variant: "destructive" })
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-bold">Testimonials Management</h2>
        <Button onClick={openCreate} className="bg-primary hover:bg-primary/90 gap-2"><Plus className="w-4 h-4" /> Add Testimonial</Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 rounded-xl bg-card border border-border" />)}</div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Student</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Course</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Year</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Featured</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials?.map((t) => (
                <tr key={t.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="p-4 font-medium text-white">{t.studentName}</td>
                  <td className="p-4 text-muted-foreground">{t.course}</td>
                  <td className="p-4 text-muted-foreground">{t.year || "—"}</td>
                  <td className="p-4"><span className={`px-2 py-1 text-xs rounded ${t.featured ? "bg-emerald-500/20 text-emerald-500" : "bg-muted text-muted-foreground"}`}>{t.featured ? "Yes" : "No"}</span></td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(t)} className="h-8 w-8 p-0 border-border hover:border-primary/50"><Pencil className="w-3 h-3" /></Button>
                      <Button size="sm" variant="outline" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate({ id: t.id }, { onSuccess: () => refetch() }); }} className="h-8 w-8 p-0 border-border hover:border-red-500/50 hover:text-red-500"><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="col-span-2"><label className="text-sm text-muted-foreground mb-1 block">Student Name *</label><Input value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} className="bg-background/50 border-border" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Course *</label><Input value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} className="bg-background/50 border-border" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Year *</label><Input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} className="bg-background/50 border-border" /></div>
            <div className="col-span-2"><label className="text-sm text-muted-foreground mb-1 block">Testimonial Content *</label><Textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="bg-background/50 border-border resize-none h-24" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Rating (1-5)</label><Input type="number" min={1} max={5} value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} className="bg-background/50 border-border" /></div>
            <div className="flex items-center gap-3 mt-4"><input type="checkbox" id="tfeat" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="accent-primary" /><label htmlFor="tfeat" className="text-sm">Featured</label></div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setOpen(false)} className="border-border">Cancel</Button>
            <Button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending} className="bg-primary hover:bg-primary/90">{editing ? "Update" : "Add"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
