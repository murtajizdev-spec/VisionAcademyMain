import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGetResults, useAdminCreateResult, useAdminDeleteResult } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EMPTY = { studentName: "", class: "", year: new Date().getFullYear().toString(), board: "Federal Board", marks: "", percentage: "", position: "1st", imageUrl: "" };

export default function AdminResults() {
  const { toast } = useToast();
  const { data: results, isLoading, refetch } = useAdminGetResults();
  const createMutation = useAdminCreateResult();
  const deleteMutation = useAdminDeleteResult();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(EMPTY);

  const handleSubmit = () => {
    createMutation.mutate({ data: form }, {
      onSuccess: () => { toast({ title: "Result added" }); setOpen(false); setForm(EMPTY); refetch(); },
      onError: () => toast({ title: "Error", variant: "destructive" })
    });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-bold">Results Management</h2>
        <Button onClick={() => setOpen(true)} className="bg-primary hover:bg-primary/90 gap-2"><Plus className="w-4 h-4" /> Add Result</Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 rounded-xl bg-card border border-border" />)}</div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">Student</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Class/Exam</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Year</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Percentage</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Position</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {results?.map((r) => (
                  <tr key={r.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-white">{r.studentName}</td>
                    <td className="p-4 text-muted-foreground">{r.class}</td>
                    <td className="p-4 text-muted-foreground">{r.year}</td>
                    <td className="p-4"><span className="font-bold text-secondary">{r.percentage}</span></td>
                    <td className="p-4 text-muted-foreground">{r.position}</td>
                    <td className="p-4 text-right">
                      <Button size="sm" variant="outline" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate({ id: r.id }, { onSuccess: () => refetch() }); }} className="h-8 w-8 p-0 border-border hover:border-red-500/50 hover:text-red-500"><Trash2 className="w-3 h-3" /></Button>
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
          <DialogHeader><DialogTitle>Add Result</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="col-span-2"><label className="text-sm text-muted-foreground mb-1 block">Student Name *</label><Input value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} className="bg-background/50 border-border" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Class/Exam *</label><Input value={form.class} onChange={e => setForm({ ...form, class: e.target.value })} className="bg-background/50 border-border" placeholder="e.g. MDCAT 2024" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Year *</label><Input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} className="bg-background/50 border-border" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Board</label><Input value={form.board} onChange={e => setForm({ ...form, board: e.target.value })} className="bg-background/50 border-border" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Position *</label><Input value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} className="bg-background/50 border-border" placeholder="e.g. 1st" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Marks *</label><Input value={form.marks} onChange={e => setForm({ ...form, marks: e.target.value })} className="bg-background/50 border-border" placeholder="e.g. 1052/1100" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Percentage *</label><Input value={form.percentage} onChange={e => setForm({ ...form, percentage: e.target.value })} className="bg-background/50 border-border" placeholder="e.g. 95.6%" /></div>
            <div className="col-span-2"><label className="text-sm text-muted-foreground mb-1 block">Image URL</label><Input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="bg-background/50 border-border" /></div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setOpen(false)} className="border-border">Cancel</Button>
            <Button onClick={handleSubmit} disabled={createMutation.isPending} className="bg-primary hover:bg-primary/90">Add Result</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
