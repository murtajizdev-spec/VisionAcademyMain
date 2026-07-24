import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGetEvents, useAdminCreateEvent, useAdminUpdateEvent, useAdminDeleteEvent } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EMPTY = { title: "", description: "", type: "upcoming", eventDate: "", location: "", registrationLink: "" };

export default function AdminEvents() {
  const { toast } = useToast();
  const { data: events, isLoading, refetch } = useAdminGetEvents();
  const createMutation = useAdminCreateEvent();
  const updateMutation = useAdminUpdateEvent();
  const deleteMutation = useAdminDeleteEvent();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (e: any) => { setEditing(e); setForm({ ...e, eventDate: e.eventDate ? e.eventDate.split("T")[0] : "" }); setOpen(true); };

  const handleSubmit = () => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, data: form }, {
        onSuccess: () => { toast({ title: "Event updated" }); setOpen(false); refetch(); },
        onError: () => toast({ title: "Error", variant: "destructive" })
      });
    } else {
      createMutation.mutate({ data: form }, {
        onSuccess: () => { toast({ title: "Event created" }); setOpen(false); refetch(); },
        onError: () => toast({ title: "Error", variant: "destructive" })
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-bold">Events Management</h2>
        <Button onClick={openCreate} className="bg-primary hover:bg-primary/90 gap-2"><Plus className="w-4 h-4" /> Add Event</Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 rounded-xl bg-card border border-border" />)}</div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">Title</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Type</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Location</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events?.map((e) => (
                  <tr key={e.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-white line-clamp-1 max-w-xs">{e.title}</td>
                    <td className="p-4"><span className={`px-2 py-1 text-xs rounded capitalize ${e.type === "upcoming" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>{e.type}</span></td>
                    <td className="p-4 text-muted-foreground text-xs">{new Date(e.eventDate).toLocaleDateString()}</td>
                    <td className="p-4 text-muted-foreground text-xs">{e.location || "—"}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEdit(e)} className="h-8 w-8 p-0 border-border hover:border-primary/50"><Pencil className="w-3 h-3" /></Button>
                        <Button size="sm" variant="outline" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate({ id: e.id }, { onSuccess: () => refetch() }); }} className="h-8 w-8 p-0 border-border hover:border-red-500/50 hover:text-red-500"><Trash2 className="w-3 h-3" /></Button>
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
          <DialogHeader><DialogTitle>{editing ? "Edit Event" : "Add Event"}</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-4">
            <div><label className="text-sm text-muted-foreground mb-1 block">Title *</label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-background/50 border-border" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Description *</label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-background/50 border-border resize-none h-20" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm text-muted-foreground mb-1 block">Type</label>
                <Select value={form.type} onValueChange={v => setForm({ ...form, type: v })}>
                  <SelectTrigger className="bg-background/50 border-border"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="upcoming">Upcoming</SelectItem><SelectItem value="past">Past</SelectItem><SelectItem value="registration">Registration</SelectItem></SelectContent>
                </Select>
              </div>
              <div><label className="text-sm text-muted-foreground mb-1 block">Date *</label><Input type="date" value={form.eventDate} onChange={e => setForm({ ...form, eventDate: e.target.value })} className="bg-background/50 border-border" /></div>
            </div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Location</label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="bg-background/50 border-border" /></div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Registration Link</label><Input value={form.registrationLink} onChange={e => setForm({ ...form, registrationLink: e.target.value })} className="bg-background/50 border-border" /></div>
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
