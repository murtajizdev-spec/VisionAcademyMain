import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGetFaqs, useAdminCreateFaq, useAdminUpdateFaq, useAdminDeleteFaq } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = ["General", "Admissions", "Courses", "Fees", "Facilities", "Tests"];
const EMPTY = { question: "", answer: "", category: "General", sortOrder: 0, published: true };

export default function AdminFAQs() {
  const { toast } = useToast();
  const { data: faqs, isLoading, refetch } = useAdminGetFaqs();
  const createMutation = useAdminCreateFaq();
  const updateMutation = useAdminUpdateFaq();
  const deleteMutation = useAdminDeleteFaq();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (f: any) => { setEditing(f); setForm({ ...f }); setOpen(true); };

  const handleSubmit = () => {
    const payload = { ...form, sortOrder: Number(form.sortOrder || 0) };
    if (editing) {
      updateMutation.mutate({ id: editing.id, data: payload }, {
        onSuccess: () => { toast({ title: "FAQ updated" }); setOpen(false); refetch(); },
        onError: () => toast({ title: "Error", variant: "destructive" })
      });
    } else {
      createMutation.mutate({ data: payload }, {
        onSuccess: () => { toast({ title: "FAQ added" }); setOpen(false); refetch(); },
        onError: () => toast({ title: "Error", variant: "destructive" })
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-bold">FAQs Management</h2>
        <Button onClick={openCreate} className="bg-primary hover:bg-primary/90 gap-2"><Plus className="w-4 h-4" /> Add FAQ</Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 rounded-xl bg-card border border-border" />)}</div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">#</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Question</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Published</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs?.map((f) => (
                <tr key={f.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="p-4 text-muted-foreground">{f.sortOrder}</td>
                  <td className="p-4 font-medium text-white line-clamp-1 max-w-sm">{f.question}</td>
                  <td className="p-4"><span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">{f.category}</span></td>
                  <td className="p-4"><span className={`px-2 py-1 text-xs rounded ${"bg-muted text-muted-foreground"}`}>Active</span></td>
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
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit FAQ" : "Add FAQ"}</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-4">
            <div><label className="text-sm text-muted-foreground mb-1 block">Question *</label><Input value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} className="bg-background/50 border-border" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Answer *</label><Textarea value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} className="bg-background/50 border-border resize-none h-28" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm text-muted-foreground mb-1 block">Category</label>
                <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                  <SelectTrigger className="bg-background/50 border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><label className="text-sm text-muted-foreground mb-1 block">Sort Order</label><Input type="number" value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: e.target.value })} className="bg-background/50 border-border" /></div>
            </div>
            <div className="flex items-center gap-3"><input type="checkbox" id="fpub" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} className="accent-primary" /><label htmlFor="fpub" className="text-sm">Published</label></div>
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
