import React from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const { data: s } = useSiteSettings();
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const submitMutation = useSubmitContact();

  const onSubmit = (data: ContactValues) => {
    submitMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({ title: "Message Sent", description: "We will get back to you soon." });
          form.reset();
        },
        onError: () => {
          toast({ title: "Failed to send", description: "Please try again later.", variant: "destructive" });
        },
      }
    );
  };

  const whatsappLink = s?.whatsappNumber
    ? `https://wa.me/${s.whatsappNumber.replace(/\D/g, "")}`
    : null;

  return (
    <Layout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="pt-32 pb-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Have questions about our programs? Our counselors are here to help you chart your academic journey.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="glass-panel p-8 rounded-2xl border border-border/50">
                  <h3 className="font-display text-2xl font-bold mb-6">Contact Information</h3>

                  <div className="space-y-6">
                    {s?.address && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl shrink-0">📍</div>
                        <div>
                          <h4 className="font-bold text-white mb-1">Main Campus</h4>
                          <p className="text-muted-foreground">{s.address}</p>
                        </div>
                      </div>
                    )}

                    {(s?.phone1 || s?.phone2) && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-xl shrink-0">📞</div>
                        <div>
                          <h4 className="font-bold text-white mb-1">Phone</h4>
                          {s?.phone1 && (
                            <p className="text-muted-foreground">
                              <a href={`tel:${s.phone1.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">{s.phone1}</a>
                            </p>
                          )}
                          {s?.phone2 && (
                            <p className="text-muted-foreground">
                              <a href={`tel:${s.phone2.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">{s.phone2}</a>
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {(s?.email1 || s?.email2) && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-xl shrink-0">✉️</div>
                        <div>
                          <h4 className="font-bold text-white mb-1">Email</h4>
                          {s?.email1 && (
                            <p className="text-muted-foreground">
                              <a href={`mailto:${s.email1}`} className="hover:text-primary transition-colors">{s.email1}</a>
                            </p>
                          )}
                          {s?.email2 && (
                            <p className="text-muted-foreground">
                              <a href={`mailto:${s.email2}`} className="hover:text-primary transition-colors">{s.email2}</a>
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {whatsappLink && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xl shrink-0">💬</div>
                        <div>
                          <h4 className="font-bold text-white mb-1">WhatsApp</h4>
                          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            Chat with us on WhatsApp
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Google Maps embed */}
                <div className="rounded-2xl border border-border/50 overflow-hidden h-64 relative">
                  {s?.mapEmbedUrl ? (
                    <iframe
                      src={s.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Campus Location"
                    />
                  ) : (
                    <a
                      href="https://maps.google.com/?q=F-8+Markaz+Islamabad+Pakistan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-muted flex flex-col items-center justify-center gap-2 hover:bg-muted/80 transition-colors"
                    >
                      <span className="text-3xl">📍</span>
                      <span className="text-muted-foreground font-medium text-sm">View on Google Maps</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Form */}
              <div className="glass-panel p-8 md:p-10 rounded-2xl border border-border/50">
                <h3 className="font-display text-2xl font-bold mb-8">Send a Message</h3>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl><Input placeholder="John Doe" className="bg-background/50 border-border" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl><Input placeholder="+92 3XX XXXXXXX" className="bg-background/50 border-border" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input placeholder="you@example.com" className="bg-background/50 border-border" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="subject" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl><Input placeholder="How can we help you?" className="bg-background/50 border-border" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl><Textarea placeholder="Write your message here..." className="bg-background/50 border-border resize-none h-32" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <Button type="submit" className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white glow-border" disabled={submitMutation.isPending}>
                      {submitMutation.isPending ? "Sending…" : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
