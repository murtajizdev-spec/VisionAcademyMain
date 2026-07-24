import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useGetEvents } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

const TYPES = ["all", "upcoming", "past"];

export default function Events() {
  const [activeType, setActiveType] = useState("all");

  // The API supports ?upcoming=true filter
  const params = activeType === "upcoming" ? { upcoming: "true" } : {};
  const { data: events, isLoading } = useGetEvents(params);

  // Filter past client-side since API only has upcoming filter
  const filtered = activeType === "past"
    ? events?.filter(e => e.type === "past" || new Date(e.eventDate) < new Date())
    : activeType === "upcoming"
    ? events?.filter(e => e.type === "upcoming" || new Date(e.eventDate) >= new Date())
    : events;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-32 pb-24 bg-background"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Events & <span className="text-primary">Seminars</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay updated with our workshops, mock tests, seminars, and institutional events.
            </p>
          </div>

          {/* Filter */}
          <div className="flex justify-center gap-3 mb-12">
            {TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-200 ${
                  activeType === type
                    ? "bg-primary text-white shadow-[0_0_20px_rgba(0,102,255,0.4)]"
                    : "bg-card border border-border text-muted-foreground hover:text-white hover:border-primary/40"
                }`}
              >
                {type === "all" ? "All Events" : type === "upcoming" ? "Upcoming" : "Past Events"}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-40 rounded-2xl bg-card border border-border" />
              ))}
            </div>
          ) : !filtered?.length ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-xl">No events found.</p>
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {filtered?.map((event, i) => {
                const isPast = event.type === "past" || new Date(event.eventDate) < new Date();
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`group glass-panel p-6 md:p-8 rounded-2xl border transition-all duration-300 ${
                      isPast
                        ? "border-border/50 opacity-70 hover:opacity-100"
                        : "border-border hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,102,255,0.1)]"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Date Block */}
                      <div className={`shrink-0 w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-bold border ${
                        isPast ? "bg-muted/50 border-border/50 text-muted-foreground" : "bg-primary/20 border-primary/30 text-primary"
                      }`}>
                        <span className="text-2xl font-display">{new Date(event.eventDate).getDate()}</span>
                        <span className="text-xs uppercase tracking-wider">{new Date(event.eventDate).toLocaleString('default', { month: 'short' })}</span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block ${
                              isPast ? "bg-muted text-muted-foreground" : "bg-primary/20 text-primary"
                            }`}>
                              {event.type}
                            </span>
                            <h3 className="font-display text-xl font-bold text-white mt-1 mb-3">{event.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{event.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary/70" />
                            <span>{formatDate(event.eventDate)} · {formatTime(event.eventDate)}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-secondary/70" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>

                        {event.registrationLink && !isPast && (
                          <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-4 px-5 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg transition-colors"
                          >
                            Register Now <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </Layout>
  );
}
