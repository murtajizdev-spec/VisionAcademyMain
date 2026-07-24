import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGetMessages, useAdminUpdateMessage } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-primary/20 text-primary",
  read: "bg-muted text-muted-foreground",
  replied: "bg-emerald-500/20 text-emerald-500",
};

export default function AdminMessages() {
  const { toast } = useToast();
  const { data: messages, isLoading, refetch } = useAdminGetMessages();
  const updateMutation = useAdminUpdateMessage();
  const [selected, setSelected] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = filterStatus === "all" ? messages : messages?.filter(m => m.status === filterStatus);

  const handleStatusChange = (id: number, status: string) => {
    updateMutation.mutate({ id, data: { status: status as any } }, {
      onSuccess: () => { toast({ title: "Status updated" }); refetch(); },
      onError: () => toast({ title: "Error", variant: "destructive" })
    });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="font-display text-2xl font-bold">Contact Messages</h2>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-44 bg-card border-border"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 rounded-xl bg-card border border-border" />)}</div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">From</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Subject / Message</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered?.map((msg) => (
                <tr key={msg.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-white flex items-center gap-2">
                      {msg.name}
                      {msg.status === "new" && <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block" />}
                    </div>
                    <div className="text-xs text-muted-foreground">{msg.email}</div>
                  </td>
                  <td className="p-4 text-muted-foreground line-clamp-1 max-w-xs text-sm">{msg.subject || msg.message}</td>
                  <td className="p-4 text-muted-foreground text-xs">{new Date(msg.createdAt).toLocaleDateString()}</td>
                  <td className="p-4"><span className={`px-2 py-1 text-xs rounded font-medium ${STATUS_COLORS[msg.status] || "bg-muted text-muted-foreground"}`}>{msg.status}</span></td>
                  <td className="p-4 text-right">
                    <Button size="sm" variant="outline" onClick={() => { setSelected(msg); if (msg.status === "new") handleStatusChange(msg.id, "read"); }} className="h-8 w-8 p-0 border-border hover:border-primary/50"><Eye className="w-3 h-3" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader><DialogTitle>Message from {selected?.name}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4 mt-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-muted-foreground">Name:</span><p className="font-medium text-white">{selected.name}</p></div>
                <div><span className="text-muted-foreground">Phone:</span><p className="text-white">{selected.phone || "—"}</p></div>
                <div className="col-span-2"><span className="text-muted-foreground">Email:</span><p className="text-white">{selected.email}</p></div>
                {selected.subject && <div className="col-span-2"><span className="text-muted-foreground">Subject:</span><p className="text-white">{selected.subject}</p></div>}
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Message:</span>
                <p className="text-white leading-relaxed bg-background/50 rounded-lg p-4 border border-border">{selected.message}</p>
              </div>
              <div className="flex gap-3 justify-end flex-wrap">
                <a href={`mailto:${selected.email}`} className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-colors">Reply via Email</a>
                <Button variant="outline" onClick={() => { handleStatusChange(selected.id, "replied"); setSelected(null); }} className="border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10">Mark Replied</Button>
                <Button variant="outline" onClick={() => setSelected(null)} className="border-border">Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
