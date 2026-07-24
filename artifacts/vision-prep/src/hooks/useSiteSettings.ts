import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface SiteSettings {
  id: number;
  siteName: string;
  tagline: string;
  address: string;
  phone1: string;
  phone2: string | null;
  email1: string;
  email2: string | null;
  mapEmbedUrl: string | null;
  websiteUrl: string | null;
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  whatsappNumber: string | null;
  logoUrl: string | null;
  updatedAt: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  id: 1,
  siteName: "VisionPrep",
  tagline: "Transforming destinies through precision coaching for MDCAT, ECAT, NUMS, and Federal Board examinations.",
  address: "Main Campus, 123 Education Street, F-8 Markaz, Islamabad, Pakistan",
  phone1: "+92 300 1234567",
  phone2: "+92 51 1234567",
  email1: "info@visionprep.edu.pk",
  email2: "admissions@visionprep.edu.pk",
  mapEmbedUrl: "https://maps.google.com/maps?q=F-8+Markaz+Islamabad+Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed",
  websiteUrl: "https://visionprep.edu.pk",
  facebookUrl: "",
  twitterUrl: "",
  instagramUrl: "",
  whatsappNumber: "+923001234567",
  logoUrl: "",
  updatedAt: new Date().toISOString(),
};

export function useSiteSettings() {
  return useQuery<SiteSettings>({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const res = await fetch("/api/site-settings");
      if (!res.ok) return DEFAULT_SETTINGS;
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: DEFAULT_SETTINGS,
  });
}

export function useUpdateSiteSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<SiteSettings>) => {
      const token = localStorage.getItem("vp_token");
      const res = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });
}
