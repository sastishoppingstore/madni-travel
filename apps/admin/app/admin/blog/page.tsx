"use client";

import { useState } from "react";
import { FileText, Plus, Search, Eye, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { formatDate } from "@/lib/utils";
import { mockBlogPosts } from "@/lib/data";

export default function BlogManagerPage() {
  const [search, setSearch] = useState("");
  const filtered = mockBlogPosts.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-7 w-7 text-blue-600" /> Blog Manager
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage blog posts and articles</p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700"><Plus className="h-4 w-4 mr-1" /> New Post</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search blog posts..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filtered.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{post.title}</h3>
                    {!post.isPublished && <Badge variant="warning">Draft</Badge>}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{post.excerpt}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span>By {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}</span>
                    <Badge variant="outline">{post.category}</Badge>
                    <span>{post.views.toLocaleString()} views</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Switch checked={post.isPublished} onCheckedChange={() => {}} />
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
