import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGetAdmissions, useAdminUpdateAdmission } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-500/20 text-amber-500",
  approved: "bg-emerald-500/20 text-emerald-500",
  enrolled: "bg-blue-500/20 text-blue-500",
  rejected: "bg-red-500/20 text-red-500",
};

export default function AdminAdmissions() {
  const { toast } = useToast();
  const { data: admissions, isLoading, refetch } = useAdminGetAdmissions();
  const updateMutation = useAdminUpdateAdmission();
  const [selected, setSelected] = useState<any>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<string>("");

  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = filterStatus === "all" ? admissions : admissions?.filter(a => a.status === filterStatus);

  const openDetail = (a: any) => { setSelected(a); setNotes(a.notes || ""); setStatus(a.status); };

  const handleUpdate = () => {
    updateMutation.mutate({ id: selected.id, data: { status: status as any, notes } }, {
      onSuccess: () => { toast({ title: "Admission updated" }); setSelected(null); refetch(); },
      onError: () => toast({ title: "Error updating", variant: "destructive" })
    });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="font-display text-2xl font-bold">Admissions Management</h2>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-44 bg-card border-border"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="enrolled">Enrolled</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 rounded-xl bg-card border border-border" />)}</div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">Student</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Course</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Contact</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered?.map((a) => (
                  <tr key={a.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-white">{a.studentName}</div>
                      <div className="text-xs text-muted-foreground">{a.guardianName}</div>
                    </td>
                    <td className="p-4 text-muted-foreground">{a.course}</td>
                    <td className="p-4">
                      <div className="text-xs text-muted-foreground">{a.email}</div>
                      <div className="text-xs text-muted-foreground">{a.phone}</div>
                    </td>
                    <td className="p-4 text-muted-foreground text-xs">{new Date(a.createdAt).toLocaleDateString()}</td>
                    <td className="p-4"><span className={`px-2 py-1 text-xs rounded font-medium ${STATUS_COLORS[a.status] || "bg-muted text-muted-foreground"}`}>{a.status}</span></td>
                    <td className="p-4 text-right">
                      <Button size="sm" variant="outline" onClick={() => openDetail(a)} className="h-8 w-8 p-0 border-border hover:border-primary/50"><Eye className="w-3 h-3" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Admission Details</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Student:</span><p className="font-medium text-white">{selected.studentName}</p></div>
                <div><span className="text-muted-foreground">Guardian:</span><p className="font-medium text-white">{selected.guardianName}</p></div>
                <div><span className="text-muted-foreground">Email:</span><p className="text-white">{selected.email}</p></div>
                <div><span className="text-muted-foreground">Phone:</span><p className="text-white">{selected.phone}</p></div>
                <div><span className="text-muted-foreground">Course:</span><p className="text-white">{selected.course}</p></div>
                <div><span className="text-muted-foreground">Class:</span><p className="text-white">{selected.class}</p></div>
                {selected.address && <div className="col-span-2"><span className="text-muted-foreground">Address:</span><p className="text-white">{selected.address}</p></div>}
                {selected.previousSchool && <div className="col-span-2"><span className="text-muted-foreground">Previous School:</span><p className="text-white">{selected.previousSchool}</p></div>}
                {selected.message && <div className="col-span-2"><span className="text-muted-foreground">Message:</span><p className="text-white">{selected.message}</p></div>}
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-background/50 border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="enrolled">Enrolled</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Internal Notes</label>
                <Textarea value={notes} onChange={e => setNotes(e.target.value)} className="bg-background/50 border-border resize-none h-24" />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setSelected(null)} className="border-border">Cancel</Button>
                <Button onClick={handleUpdate} disabled={updateMutation.isPending} className="bg-primary hover:bg-primary/90">Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
