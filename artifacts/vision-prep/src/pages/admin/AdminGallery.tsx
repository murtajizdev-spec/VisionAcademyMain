import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGetGallery, useAdminCreateGalleryItem, useAdminDeleteGalleryItem } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EMPTY = { title: "", imageUrl: "", category: "campus", description: "" };

export default function AdminGallery() {
  const { toast } = useToast();
  const { data: gallery, isLoading, refetch } = useAdminGetGallery();
  const createMutation = useAdminCreateGalleryItem();
  const deleteMutation = useAdminDeleteGalleryItem();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(EMPTY);

  const handleSubmit = () => {
    createMutation.mutate({ data: form }, {
      onSuccess: () => { toast({ title: "Image added" }); setOpen(false); setForm(EMPTY); refetch(); },
      onError: () => toast({ title: "Error", variant: "destructive" })
    });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-bold">Gallery Management</h2>
        <Button onClick={() => setOpen(true)} className="bg-primary hover:bg-primary/90 gap-2"><Plus className="w-4 h-4" /> Add Image</Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <Skeleton key={i} className="aspect-square rounded-xl bg-card border border-border" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery?.map((g) => (
            <div key={g.id} className="group relative rounded-xl overflow-hidden border border-border bg-card aspect-square hover:border-primary/50 transition-all duration-300">
              <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button size="sm" variant="outline" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate({ id: g.id }, { onSuccess: () => refetch() }); }} className="h-8 w-8 p-0 border-red-500/50 text-red-500 bg-card hover:bg-red-500/10"><Trash2 className="w-3 h-3" /></Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-background/90 to-transparent">
                <p className="text-xs font-medium text-white line-clamp-1">{g.title}</p>
                <span className="text-xs text-muted-foreground capitalize">{g.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader><DialogTitle>Add Gallery Image</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-4">
            <div><label className="text-sm text-muted-foreground mb-1 block">Title *</label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-background/50 border-border" /></div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Image URL *</label>
              <Input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="bg-background/50 border-border" placeholder="https://..." />
              {form.imageUrl && <img src={form.imageUrl} alt="" className="mt-2 h-24 w-full object-cover rounded-lg border border-border" />}
            </div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Category</label>
              <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                <SelectTrigger className="bg-background/50 border-border"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="campus">Campus</SelectItem><SelectItem value="events">Events</SelectItem><SelectItem value="results">Results</SelectItem></SelectContent>
              </Select>
            </div>
            <div><label className="text-sm text-muted-foreground mb-1 block">Description</label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-background/50 border-border resize-none h-16" /></div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setOpen(false)} className="border-border">Cancel</Button>
            <Button onClick={handleSubmit} disabled={createMutation.isPending} className="bg-primary hover:bg-primary/90">Add Image</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
