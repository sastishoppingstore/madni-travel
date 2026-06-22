"use client";

import { useState } from "react";
import { Building2, Save, Check, Upload, Phone, Mail, Globe, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CompanyConfig {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  country: string;
  logo: string;
  favicon: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  whatsapp: string;
}

const defaultConfig: CompanyConfig = {
  name: "Madni Travel",
  tagline: "Your Trusted Travel Partner Since 2010",
  description: "Pakistan's leading travel agency offering flights, hotels, Umrah packages, visa services, and holiday packages at the best prices.",
  email: "info@madnitravel.com",
  phone: "0321 6001973",
  website: "https://madnitravel.com",
  address: "6 Main Mushaf Ali Road",
  city: "Sargodha",
  country: "Pakistan",
  logo: "",
  favicon: "",
  facebook: "https://facebook.com/madnitravel",
  twitter: "https://twitter.com/madnitravel",
  instagram: "https://instagram.com/madnitravel",
  youtube: "",
  whatsapp: "+923216001973",
};

export default function CompanyPage() {
  const [config, setConfig] = useState<CompanyConfig>(defaultConfig);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Building2 className="h-7 w-7 text-primary-600" /> Company Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage your company profile and branding</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Basic Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>Company Name</Label><Input value={config.name} onChange={(e) => setConfig({...config, name: e.target.value})} className="mt-1" /></div>
            <div><Label>Tagline</Label><Input value={config.tagline} onChange={(e) => setConfig({...config, tagline: e.target.value})} className="mt-1" /></div>
          </div>
          <div><Label>Description</Label><Textarea value={config.description} onChange={(e) => setConfig({...config, description: e.target.value})} className="mt-1" rows={3} /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Contact Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label className="flex items-center gap-1"><Mail className="h-3 w-3" /> Email</Label><Input value={config.email} onChange={(e) => setConfig({...config, email: e.target.value})} className="mt-1" /></div>
            <div><Label className="flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</Label><Input value={config.phone} onChange={(e) => setConfig({...config, phone: e.target.value})} className="mt-1" /></div>
            <div><Label className="flex items-center gap-1"><Globe className="h-3 w-3" /> Website</Label><Input value={config.website} onChange={(e) => setConfig({...config, website: e.target.value})} className="mt-1" /></div>
            <div><Label className="flex items-center gap-1"><Phone className="h-3 w-3" /> WhatsApp</Label><Input value={config.whatsapp} onChange={(e) => setConfig({...config, whatsapp: e.target.value})} className="mt-1" /></div>
          </div>
          <div><Label className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Address</Label><Textarea value={config.address} onChange={(e) => setConfig({...config, address: e.target.value})} className="mt-1" rows={2} /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>City</Label><Input value={config.city} onChange={(e) => setConfig({...config, city: e.target.value})} className="mt-1" /></div>
            <div><Label>Country</Label><Input value={config.country} onChange={(e) => setConfig({...config, country: e.target.value})} className="mt-1" /></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Social Media</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Facebook</Label><Input value={config.facebook} onChange={(e) => setConfig({...config, facebook: e.target.value})} className="mt-1" placeholder="https://facebook.com/..." /></div>
          <div><Label>Twitter / X</Label><Input value={config.twitter} onChange={(e) => setConfig({...config, twitter: e.target.value})} className="mt-1" placeholder="https://twitter.com/..." /></div>
          <div><Label>Instagram</Label><Input value={config.instagram} onChange={(e) => setConfig({...config, instagram: e.target.value})} className="mt-1" placeholder="https://instagram.com/..." /></div>
          <div><Label>YouTube</Label><Input value={config.youtube} onChange={(e) => setConfig({...config, youtube: e.target.value})} className="mt-1" placeholder="https://youtube.com/..." /></div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
        <Button onClick={handleSave} className="bg-primary-600 hover:bg-primary-700">
          <Save className="h-4 w-4 mr-1" /> Save Settings
        </Button>
        {saved && <span className="flex items-center gap-1 text-sm text-emerald-600"><Check className="h-4 w-4" /> Saved</span>}
      </div>
    </div>
  );
}
