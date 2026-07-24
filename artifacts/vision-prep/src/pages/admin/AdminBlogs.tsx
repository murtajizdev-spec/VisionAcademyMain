import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGetBlogs, useAdminCreateBlog, useAdminUpdateBlog, useAdminDeleteBlog } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EMPTY = { title: "", slug: "", excerpt: "", content: "", category: "Exam Tips", tags: "", imageUrl: "", published: false, featured: false };

export default function AdminBlogs() {
  const { toast } = useToast();
  const { data: blogs, isLoading, refetch } = useAdminGetBlogs();
  const createMutation = useAdminCreateBlog();
  const updateMutation = useAdminUpdateBlog();
  const deleteMutation = useAdminDeleteBlog();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (b: any) => { setEditing(b); setForm({ ...b }); setOpen(true); };

  const handleSubmit = () => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, data: form }, {
        onSuccess: () => { toast({ title: "Blog updated" }); setOpen(false); refetch(); },
        onError: () => toast({ title: "Error", variant: "destructive" })
      });
    } else {
      createMutation.mutate({ data: form }, {
        onSuccess: () => { toast({ title: "Blog created" }); setOpen(false); refetch(); },
        onError: () => toast({ title: "Error", variant: "destructive" })
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-bold">Blog Management</h2>
        <Button onClick={openCreate} className="bg-primary hover:bg-primary/90 gap-2"><Plus className="w-4 h-4" /> New Post</Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 rounded-xl bg-card border border-border" />)}</div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">Title</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Published</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Featured</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs?.map((b) => (
                  <tr key={b.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-white line-clamp-1 max-w-xs">{b.title}</td>
                    <td className="p-4"><span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">{b.category}</span></td>
                    <td className="p-4"><span className={`px-2 py-1 text-xs rounded ${b.published ? "bg-emerald-500/20 text-emerald-500" : "bg-muted text-muted-foreground"}`}>{b.published ? "Yes" : "Draft"}</span></td>
                    <td className="p-4"><span className={`px-2 py-1 text-xs rounded ${b.featured ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"}`}>{b.featured ? "Yes" : "No"}</span></td>
                    <td className="p-4 text-muted-foreground text-xs">{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "—"}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEdit(b)} className="h-8 w-8 p-0 border-border hover:border-primary/50"><Pencil className="w-3 h-3" /></Button>
                        <Button size="sm" variant="outline" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate({ id: b.id }, { onSuccess: () => refetch() }); }} className="h-8 w-8 p-0 border-border hover:border-red-500/50 hover:text-red-500"><Trash2 className="w-3 h-3" /></Button>
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
          <DialogHeader><DialogTitle>{editing ? "Edit Blog Post" : "New Blog Post"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="col-span-2"><label className="text-sm text-muted-foreground mb-1 block">Title *</label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-background/50 border-border" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Slug *</label><Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="bg-background/50 border-border" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Category *</label>
              <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                <SelectTrigger className="bg-background/50 border-border"><SelectValue /></SelectTrigger>
                <SelectContent>{["Exam Tips", "Study Tips", "Career Guidance", "News", "General"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="col-span-2"><label className="text-sm text-muted-foreground mb-1 block">Excerpt</label><Textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} className="bg-background/50 border-border resize-none h-16" /></div>
            <div className="col-span-2"><label className="text-sm text-muted-foreground mb-1 block">Content (HTML) *</label><Textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="bg-background/50 border-border resize-none h-40 font-mono text-xs" /></div>
            <div className="col-span-2"><label className="text-sm text-muted-foreground mb-1 block">Tags (comma-separated)</label><Input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="bg-background/50 border-border" /></div>
            <div className="col-span-2"><label className="text-sm text-muted-foreground mb-1 block">Image URL</label><Input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="bg-background/50 border-border" /></div>
            <div className="flex items-center gap-3"><input type="checkbox" id="pub" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} className="accent-primary" /><label htmlFor="pub" className="text-sm">Published</label></div>
            <div className="flex items-center gap-3"><input type="checkbox" id="feat" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="accent-primary" /><label htmlFor="feat" className="text-sm">Featured</label></div>
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
