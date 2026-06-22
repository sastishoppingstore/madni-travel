"use client";

import { useState } from "react";
import { Globe, Save, Check, Search, ArrowRight, Plus, Trash2, Download, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { calculateSEOScore, getSEOGrade } from "@/lib/utils";
import { mockSEOPages, mockRedirects } from "@/lib/data";

function ScoreRing({ score }: { score: number }) {
  const { grade, color } = getSEOGrade(score);
  const circumference = 2 * Math.PI * 30;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg className="w-16 h-16 transform -rotate-90">
        <circle cx="32" cy="32" r="30" stroke="#e2e8f0" strokeWidth="4" fill="none" />
        <circle
          cx="32" cy="32" r="30"
          stroke={score >= 80 ? "#059669" : score >= 60 ? "#3b82f6" : score >= 40 ? "#f59e0b" : "#ef4444"}
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <span className={`text-sm font-bold ${color}`}>{grade}</span>
      </div>
    </div>
  );
}

export default function SEOManagerPage() {
  const [pages, setPages] = useState(mockSEOPages);
  const [redirects, setRedirects] = useState(mockRedirects);
  const [selectedPage, setSelectedPage] = useState<typeof mockSEOPages[0] | null>(null);
  const [editDialog, setEditDialog] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newRedirect, setNewRedirect] = useState({ fromPath: "", toPath: "" });

  const openEdit = (page: typeof mockSEOPages[0]) => {
    setSelectedPage({ ...page });
    setEditDialog(true);
    setSaved(false);
  };

  const savePage = () => {
    if (!selectedPage) return;
    const score = calculateSEOScore({
      title: selectedPage.seoTitle,
      description: selectedPage.metaDescription,
      focusKeyword: selectedPage.focusKeyword,
      ogTitle: selectedPage.ogTitle,
      ogDescription: selectedPage.ogDescription,
      ogImage: selectedPage.ogImage,
      canonicalUrl: selectedPage.canonicalUrl,
      schemaType: selectedPage.schemaType,
    });
    const updated = { ...selectedPage, seoScore: score };
    setPages(pages.map((p) => (p.id === updated.id ? updated : p)));
    setSaved(true);
    setTimeout(() => {
      setEditDialog(false);
      setSaved(false);
    }, 800);
  };

  const addRedirect = () => {
    if (!newRedirect.fromPath || !newRedirect.toPath) return;
    setRedirects([
      ...redirects,
      {
        id: Math.random().toString(36).substring(2, 9),
        fromPath: newRedirect.fromPath,
        toPath: newRedirect.toPath,
        type: "301",
        isActive: true,
      },
    ]);
    setNewRedirect({ fromPath: "", toPath: "" });
  };

  const deleteRedirect = (id: string) => {
    setRedirects(redirects.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Globe className="h-7 w-7 text-primary-600" />
          SEO Manager
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage SEO settings, redirects, and sitemap for all pages
        </p>
      </div>

      <Tabs defaultValue="pages" className="w-full">
        <TabsList>
          <TabsTrigger value="pages">Pages ({pages.length})</TabsTrigger>
          <TabsTrigger value="redirects">Redirects ({redirects.length})</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="mt-4 space-y-4">
          {/* SEO Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-emerald-600">
                  {pages.filter((p) => p.seoScore >= 80).length}
                </p>
                <p className="text-xs text-gray-500">Excellent (A)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {pages.filter((p) => p.seoScore >= 60 && p.seoScore < 80).length}
                </p>
                <p className="text-xs text-gray-500">Good (B)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-amber-600">
                  {pages.filter((p) => p.seoScore >= 40 && p.seoScore < 60).length}
                </p>
                <p className="text-xs text-gray-500">Average (C)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-red-600">
                  {pages.filter((p) => p.seoScore < 40).length}
                </p>
                <p className="text-xs text-gray-500">Needs Work (D)</p>
              </CardContent>
            </Card>
          </div>

          {/* Pages Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium">Page</th>
                      <th className="text-left py-3 px-4 font-medium">Path</th>
                      <th className="text-left py-3 px-4 font-medium">Focus Keyword</th>
                      <th className="text-center py-3 px-4 font-medium">Score</th>
                      <th className="text-center py-3 px-4 font-medium">Indexed</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map((page) => (
                      <tr key={page.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <ScoreRing score={page.seoScore} />
                            <div>
                              <p className="font-medium text-gray-800">{page.pageName}</p>
                              <p className="text-xs text-gray-500 truncate max-w-[200px]">
                                {page.seoTitle || "No title set"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-gray-500">
                          {page.pagePath}
                        </td>
                        <td className="py-3 px-4">
                          {page.focusKeyword ? (
                            <Badge variant="secondary">{page.focusKeyword}</Badge>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-sm font-bold ${
                            page.seoScore >= 80 ? "text-emerald-600" :
                            page.seoScore >= 60 ? "text-blue-600" :
                            page.seoScore >= 40 ? "text-amber-600" : "text-red-600"
                          }`}>
                            {page.seoScore}/100
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Switch checked={page.robotsIndex} onCheckedChange={() => {}} size="sm" />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm" onClick={() => openEdit(page)}>
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="redirects" className="mt-4 space-y-4">
          {/* Add Redirect */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Add 301 Redirect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <Label>From Path</Label>
                  <Input
                    className="mt-1"
                    placeholder="/old-page"
                    value={newRedirect.fromPath}
                    onChange={(e) => setNewRedirect({ ...newRedirect, fromPath: e.target.value })}
                  />
                </div>
                <div>
                  <Label>To Path</Label>
                  <Input
                    className="mt-1"
                    placeholder="/new-page"
                    value={newRedirect.toPath}
                    onChange={(e) => setNewRedirect({ ...newRedirect, toPath: e.target.value })}
                  />
                </div>
                <Button onClick={addRedirect} className="bg-primary-600 hover:bg-primary-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Redirect
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Redirects Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium">From</th>
                      <th className="text-left py-3 px-4 font-medium">To</th>
                      <th className="text-center py-3 px-4 font-medium">Type</th>
                      <th className="text-center py-3 px-4 font-medium">Active</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {redirects.map((r) => (
                      <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="py-3 px-4 font-mono text-xs text-red-600">{r.fromPath}</td>
                        <td className="py-3 px-4 flex items-center gap-1">
                          <ArrowRight className="h-3 w-3 text-gray-400" />
                          <span className="font-mono text-xs text-emerald-600">{r.toPath}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant="outline">{r.type}</Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Switch checked={r.isActive} onCheckedChange={() => {}} />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => deleteRedirect(r.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sitemap" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Download className="h-4 w-4" />
                XML Sitemap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Generate and download your XML sitemap. The sitemap includes all
                pages that have &quot;sitemap include&quot; enabled.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-xs space-y-1">
                <p>{`<?xml version="1.0" encoding="UTF-8"?>`}</p>
                <p>{`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`}</p>
                {pages.filter(p => p.sitemapInclude).map((p) => (
                  <p key={p.id}>{`  <url><loc>https://madnitravel.com${p.pagePath}</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod></url>`}</p>
                ))}
                <p>{`</urlset>`}</p>
              </div>
              <Button className="bg-primary-600 hover:bg-primary-700">
                <Download className="h-4 w-4 mr-1" />
                Download sitemap.xml
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary-600" />
              Edit SEO: {selectedPage?.pageName}
            </DialogTitle>
          </DialogHeader>

          {selectedPage && (
            <div className="space-y-4">
              {/* Score Bar */}
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <ScoreRing score={calculateSEOScore({
                  title: selectedPage.seoTitle,
                  description: selectedPage.metaDescription,
                  focusKeyword: selectedPage.focusKeyword,
                  ogTitle: selectedPage.ogTitle,
                  ogDescription: selectedPage.ogDescription,
                  ogImage: selectedPage.ogImage,
                  canonicalUrl: selectedPage.canonicalUrl,
                  schemaType: selectedPage.schemaType,
                })} />
                <div>
                  <p className="font-medium">SEO Score: {calculateSEOScore({
                    title: selectedPage.seoTitle,
                    description: selectedPage.metaDescription,
                    focusKeyword: selectedPage.focusKeyword,
                    ogTitle: selectedPage.ogTitle,
                    ogDescription: selectedPage.ogDescription,
                    ogImage: selectedPage.ogImage,
                    canonicalUrl: selectedPage.canonicalUrl,
                    schemaType: selectedPage.schemaType,
                  })}/100</p>
                  <p className="text-xs text-gray-500">
                    {selectedPage.seoScore >= 80
                      ? "Excellent! Your SEO is optimized."
                      : selectedPage.seoScore >= 60
                      ? "Good, but there are improvements you can make."
                      : "Needs improvement. Follow the recommendations."}
                  </p>
                </div>
              </div>

              <Tabs defaultValue="basic">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div>
                    <Label>SEO Title ({(selectedPage.seoTitle?.length || 0)}/60)</Label>
                    <Input
                      value={selectedPage.seoTitle || ""}
                      onChange={(e) => setSelectedPage({ ...selectedPage, seoTitle: e.target.value })}
                      className="mt-1"
                      placeholder="Enter SEO title..."
                    />
                  </div>
                  <div>
                    <Label>Meta Description ({(selectedPage.metaDescription?.length || 0)}/160)</Label>
                    <Textarea
                      value={selectedPage.metaDescription || ""}
                      onChange={(e) => setSelectedPage({ ...selectedPage, metaDescription: e.target.value })}
                      className="mt-1"
                      placeholder="Enter meta description..."
                    />
                  </div>
                  <div>
                    <Label>Focus Keyword</Label>
                    <Input
                      value={selectedPage.focusKeyword || ""}
                      onChange={(e) => setSelectedPage({ ...selectedPage, focusKeyword: e.target.value })}
                      className="mt-1"
                      placeholder="Enter focus keyword..."
                    />
                  </div>
                  <div>
                    <Label>Canonical URL</Label>
                    <Input
                      value={selectedPage.canonicalUrl || ""}
                      onChange={(e) => setSelectedPage({ ...selectedPage, canonicalUrl: e.target.value })}
                      className="mt-1"
                      placeholder="https://madnitravel.com/page"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="social" className="space-y-4 mt-4">
                  <div className="border-b pb-3">
                    <p className="font-medium text-sm text-gray-700 mb-3">Open Graph (Facebook)</p>
                    <div className="space-y-3">
                      <div>
                        <Label>OG Title</Label>
                        <Input
                          value={selectedPage.ogTitle || ""}
                          onChange={(e) => setSelectedPage({ ...selectedPage, ogTitle: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>OG Description</Label>
                        <Textarea
                          value={selectedPage.ogDescription || ""}
                          onChange={(e) => setSelectedPage({ ...selectedPage, ogDescription: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>OG Image URL</Label>
                        <Input
                          value={selectedPage.ogImage || ""}
                          onChange={(e) => setSelectedPage({ ...selectedPage, ogImage: e.target.value })}
                          className="mt-1"
                          placeholder="https://madnitravel.com/images/og.jpg"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-700 mb-3">Twitter Card</p>
                    <div className="space-y-3">
                      <div>
                        <Label>Twitter Title</Label>
                        <Input
                          value={selectedPage.twitterTitle || ""}
                          onChange={(e) => setSelectedPage({ ...selectedPage, twitterTitle: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Twitter Description</Label>
                        <Textarea
                          value={selectedPage.twitterDescription || ""}
                          onChange={(e) => setSelectedPage({ ...selectedPage, twitterDescription: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Twitter Image URL</Label>
                        <Input
                          value={selectedPage.twitterImage || ""}
                          onChange={(e) => setSelectedPage({ ...selectedPage, twitterImage: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4 mt-4">
                  <div>
                    <Label>Schema Type</Label>
                    <select
                      className="w-full h-10 mt-1 rounded-md border border-input bg-background px-3 text-sm"
                      value={selectedPage.schemaType || ""}
                      onChange={(e) => setSelectedPage({ ...selectedPage, schemaType: e.target.value })}
                    >
                      <option value="">None</option>
                      <option value="TravelAgency">TravelAgency</option>
                      <option value="Product">Product</option>
                      <option value="Service">Service</option>
                      <option value="Article">Article</option>
                      <option value="FAQPage">FAQPage</option>
                      <option value="Organization">Organization</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Robots Index</p>
                      <p className="text-xs text-gray-500">Allow search engines to index this page</p>
                    </div>
                    <Switch
                      checked={selectedPage.robotsIndex}
                      onCheckedChange={(v) => setSelectedPage({ ...selectedPage, robotsIndex: v })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Sitemap Include</p>
                      <p className="text-xs text-gray-500">Include this page in the XML sitemap</p>
                    </div>
                    <Switch
                      checked={selectedPage.sitemapInclude}
                      onCheckedChange={(v) => setSelectedPage({ ...selectedPage, sitemapInclude: v })}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={savePage} className="bg-primary-600 hover:bg-primary-700">
                  <Save className="h-4 w-4 mr-1" />
                  {saved ? "Saved!" : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
