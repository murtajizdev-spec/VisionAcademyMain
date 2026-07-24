import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGetCourses, useAdminCreateCourse, useAdminUpdateCourse, useAdminDeleteCourse } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EMPTY = { title: "", slug: "", category: "competitive", description: "", overview: "", subjects: "", duration: "", fee: "", schedule: "", featured: false, sortOrder: 0 };

export default function AdminCourses() {
  const { toast } = useToast();
  const { data: courses, isLoading, refetch } = useAdminGetCourses();
  const createMutation = useAdminCreateCourse();
  const updateMutation = useAdminUpdateCourse();
  const deleteMutation = useAdminDeleteCourse();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (c: any) => { setEditing(c); setForm({ ...c }); setOpen(true); };

  const handleSubmit = () => {
    const payload = { ...form, sortOrder: Number(form.sortOrder || 0) };
    if (editing) {
      updateMutation.mutate({ id: editing.id, data: payload }, {
        onSuccess: () => { toast({ title: "Course updated" }); setOpen(false); refetch(); },
        onError: () => toast({ title: "Error", variant: "destructive" })
      });
    } else {
      createMutation.mutate({ data: payload }, {
        onSuccess: () => { toast({ title: "Course created" }); setOpen(false); refetch(); },
        onError: () => toast({ title: "Error", variant: "destructive" })
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-bold">Courses Management</h2>
        <Button onClick={openCreate} className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" /> Add Course
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 rounded-xl bg-card border border-border" />)}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">Title</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Duration</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Fee</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Featured</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses?.map((c) => (
                  <tr key={c.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-white">{c.title}</td>
                    <td className="p-4"><span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded capitalize">{c.category}</span></td>
                    <td className="p-4 text-muted-foreground">{c.duration}</td>
                    <td className="p-4 text-muted-foreground">{c.fee}</td>
                    <td className="p-4"><span className={`px-2 py-1 text-xs rounded ${c.featured ? "bg-emerald-500/20 text-emerald-500" : "bg-muted text-muted-foreground"}`}>{c.featured ? "Yes" : "No"}</span></td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEdit(c)} className="h-8 w-8 p-0 border-border hover:border-primary/50"><Pencil className="w-3 h-3" /></Button>
                        <Button size="sm" variant="outline" onClick={() => { if (confirm("Delete this course?")) deleteMutation.mutate({ id: c.id }, { onSuccess: () => refetch() }); }} className="h-8 w-8 p-0 border-border hover:border-red-500/50 hover:text-red-500"><Trash2 className="w-3 h-3" /></Button>
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
        <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit Course" : "Add New Course"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="col-span-2"><label className="text-sm font-medium text-muted-foreground mb-1 block">Title *</label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-background/50 border-border" /></div>
            <div><label className="text-sm font-medium text-muted-foreground mb-1 block">Slug *</label><Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="bg-background/50 border-border" /></div>
            <div><label className="text-sm font-medium text-muted-foreground mb-1 block">Category *</label>
              <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                <SelectTrigger className="bg-background/50 border-border"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="competitive">Competitive</SelectItem>
                  <SelectItem value="entry-test">Entry Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><label className="text-sm font-medium text-muted-foreground mb-1 block">Duration *</label><Input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className="bg-background/50 border-border" placeholder="e.g. 12 Months" /></div>
            <div><label className="text-sm font-medium text-muted-foreground mb-1 block">Fee *</label><Input value={form.fee} onChange={e => setForm({ ...form, fee: e.target.value })} className="bg-background/50 border-border" placeholder="e.g. Rs. 45,000/year" /></div>
            <div><label className="text-sm font-medium text-muted-foreground mb-1 block">Schedule</label><Input value={form.schedule} onChange={e => setForm({ ...form, schedule: e.target.value })} className="bg-background/50 border-border" /></div>
            <div><label className="text-sm font-medium text-muted-foreground mb-1 block">Sort Order</label><Input type="number" value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: e.target.value })} className="bg-background/50 border-border" /></div>
            <div className="col-span-2"><label className="text-sm font-medium text-muted-foreground mb-1 block">Description *</label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-background/50 border-border resize-none h-20" /></div>
            <div className="col-span-2"><label className="text-sm font-medium text-muted-foreground mb-1 block">Overview</label><Textarea value={form.overview} onChange={e => setForm({ ...form, overview: e.target.value })} className="bg-background/50 border-border resize-none h-20" /></div>
            <div className="col-span-2"><label className="text-sm font-medium text-muted-foreground mb-1 block">Subjects (comma-separated)</label><Input value={form.subjects} onChange={e => setForm({ ...form, subjects: e.target.value })} className="bg-background/50 border-border" /></div>
            <div className="col-span-2 flex items-center gap-3"><input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="accent-primary" /><label htmlFor="featured" className="text-sm font-medium">Featured Course</label></div>
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
