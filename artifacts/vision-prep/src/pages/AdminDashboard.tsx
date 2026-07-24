import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGetDashboard } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { GlowCard } from "@/components/shared/GlowCard";

export default function AdminDashboard() {
  const { data, isLoading } = useAdminGetDashboard();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-xl bg-card border border-border" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96 rounded-xl bg-card border border-border" />
          <Skeleton className="h-96 rounded-xl bg-card border border-border" />
        </div>
      </AdminLayout>
    );
  }

  const stats = [
    { label: "Total Students", value: data?.totalStudents || 0, icon: "👨‍🎓", color: "text-blue-500" },
    { label: "Pending Admissions", value: data?.pendingAdmissions || 0, icon: "⏳", color: "text-amber-500" },
    { label: "Unread Messages", value: data?.unreadMessages || 0, icon: "✉️", color: "text-emerald-500" },
    { label: "Active Courses", value: data?.totalCourses || 0, icon: "📚", color: "text-purple-500" },
  ];

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <GlowCard key={i} className="!p-6 !bg-card border border-border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className={`text-2xl ${stat.color}`}>{stat.icon}</span>
            </div>
            <div>
              <h4 className="text-3xl font-display font-bold text-white mb-1">{stat.value}</h4>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </div>
          </GlowCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-display font-bold text-lg mb-6 flex justify-between items-center">
            <span>Recent Admissions</span>
            <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded">View All</span>
          </h3>
          <div className="space-y-4">
            {data?.recentAdmissions?.length ? data.recentAdmissions.map((admission) => (
              <div key={admission.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold">
                    {admission.studentName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-white">{admission.studentName}</p>
                    <p className="text-xs text-muted-foreground">{admission.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    admission.status === 'pending' ? 'bg-amber-500/20 text-amber-500' :
                    admission.status === 'approved' ? 'bg-emerald-500/20 text-emerald-500' :
                    admission.status === 'enrolled' ? 'bg-blue-500/20 text-blue-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {admission.status}
                  </span>
                </div>
              </div>
            )) : (
              <p className="text-muted-foreground text-sm text-center py-4">No recent admissions.</p>
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-display font-bold text-lg mb-6 flex justify-between items-center">
            <span>Recent Messages</span>
            <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded">View All</span>
          </h3>
          <div className="space-y-4">
            {data?.recentMessages?.length ? data.recentMessages.map((msg) => (
              <div key={msg.id} className="flex justify-between items-start p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                <div>
                  <p className="font-medium text-sm text-white flex items-center gap-2">
                    {msg.name}
                    {msg.status === 'new' && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{msg.message}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
            )) : (
              <p className="text-muted-foreground text-sm text-center py-4">No recent messages.</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
