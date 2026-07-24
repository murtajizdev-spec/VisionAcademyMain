import React from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmitAdmission } from "@workspace/api-client-react";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const admissionSchema = z.object({
  studentName: z.string().min(2, "Name is required"),
  guardianName: z.string().min(2, "Guardian name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  course: z.string().min(1, "Please select a course"),
  class: z.string().min(1, "Please enter your current class"),
  address: z.string().optional(),
  previousSchool: z.string().optional(),
  message: z.string().optional(),
});

type AdmissionValues = z.infer<typeof admissionSchema>;

export default function Admissions() {
  const { toast } = useToast();
  const form = useForm<AdmissionValues>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      studentName: "",
      guardianName: "",
      email: "",
      phone: "",
      course: "",
      class: "",
      address: "",
      previousSchool: "",
      message: "",
    },
  });

  const submitMutation = useSubmitAdmission();

  const onSubmit = (data: AdmissionValues) => {
    submitMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({ title: "Application Submitted", description: "We will contact you shortly." });
          form.reset();
        },
        onError: () => {
          toast({ title: "Submission Failed", description: "Please try again later.", variant: "destructive" });
        }
      }
    );
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="pt-32 pb-16 bg-background relative overflow-hidden">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 relative z-10">
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Apply for <span className="text-primary">Admission</span></h1>
              <p className="text-xl text-muted-foreground">Take the first step towards securing your future. Fill out the application form below.</p>
            </div>

            <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border border-border/50 relative z-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="studentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Student Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" className="bg-background/50 border-border" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="guardianName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guardian Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter guardian's name" className="bg-background/50 border-border" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" className="bg-background/50 border-border" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+92 3XX XXXXXXX" className="bg-background/50 border-border" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Desired Course</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background/50 border-border">
                                <SelectValue placeholder="Select a course" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="mdcat">MDCAT Preparation</SelectItem>
                              <SelectItem value="ecat">ECAT Preparation</SelectItem>
                              <SelectItem value="fsc-pre-med">FSc Pre-Medical</SelectItem>
                              <SelectItem value="fsc-pre-eng">FSc Pre-Engineering</SelectItem>
                              <SelectItem value="9th-class">9th Class (Science)</SelectItem>
                              <SelectItem value="10th-class">10th Class (Science)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="class"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current/Previous Class</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. FSc Part 1" className="bg-background/50 border-border" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="previousSchool"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Previous School/College</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your previous institution name" className="bg-background/50 border-border" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Home Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter your complete address" className="bg-background/50 border-border resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Any Additional Message/Notes</FormLabel>
                          <FormControl>
                            <Textarea placeholder="How did you hear about us? Any specific requirements?" className="bg-background/50 border-border resize-none h-32" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button type="submit" size="lg" className="w-full md:w-auto px-12 h-14 text-lg bg-primary hover:bg-primary/90 text-white rounded-xl glow-border" disabled={submitMutation.isPending}>
                      {submitMutation.isPending ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
