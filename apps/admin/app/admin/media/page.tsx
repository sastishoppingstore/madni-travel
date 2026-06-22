"use client";

import { useState } from "react";
import { Image, Upload, Search, Trash2, Copy, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const mockMedia = [
  { id: "1", filename: "hero-bg.jpg", folder: "homepage", size: 245000, url: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?auto=format&fit=crop&w=1920" },
  { id: "2", filename: "umrah-package.jpg", folder: "packages", size: 180000, url: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800" },
  { id: "3", filename: "dubai-trip.jpg", folder: "packages", size: 320000, url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800" },
  { id: "4", filename: "turkey-tour.jpg", folder: "packages", size: 210000, url: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800" },
  { id: "5", filename: "logo-main.png", folder: "branding", size: 45000, url: "https://via.placeholder.com/200x80?text=Madni+Travel" },
  { id: "6", filename: "blog-travel-tips.jpg", folder: "blog", size: 165000, url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800" },
];

const folders = ["All", "homepage", "packages", "blog", "branding"];

export default function MediaPage() {
  const [activeFolder, setActiveFolder] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = mockMedia.filter(m => {
    const folderMatch = activeFolder === "All" || m.folder === activeFolder;
    const searchMatch = m.filename.toLowerCase().includes(search.toLowerCase());
    return folderMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Image className="h-7 w-7 text-primary-600" /> Media Manager
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage images and files</p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700"><Upload className="h-4 w-4 mr-1" /> Upload</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search media..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {folders.map(f => (
            <button key={f} onClick={() => setActiveFolder(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeFolder === f ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((m) => (
          <Card key={m.id} className="overflow-hidden hover:shadow-md transition-shadow group">
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              <img src={m.url} alt={m.filename} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-2 rounded bg-white/20 text-white hover:bg-white/30"><Copy className="h-4 w-4" /></button>
                <button className="p-2 rounded bg-white/20 text-white hover:bg-white/30"><ExternalLink className="h-4 w-4" /></button>
                <button className="p-2 rounded bg-white/20 text-white hover:bg-red-500"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-xs font-medium truncate">{m.filename}</p>
              <div className="flex items-center justify-between mt-1">
                <Badge variant="outline" className="text-[10px]">{m.folder}</Badge>
                <span className="text-[10px] text-gray-400">{(m.size / 1024).toFixed(0)} KB</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
