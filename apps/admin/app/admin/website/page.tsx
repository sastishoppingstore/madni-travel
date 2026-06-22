"use client";

import { useState } from "react";
import { Monitor, Save, Check, Eye, EyeOff, MoveUp, MoveDown, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { mockHomepageSections } from "@/lib/data";

export default function WebsiteBuilderPage() {
  const [sections, setSections] = useState(mockHomepageSections);
  const [selectedSection, setSelectedSection] = useState<typeof mockHomepageSections[0] | null>(null);
  const [editDialog, setEditDialog] = useState(false);
  const [previewDialog, setPreviewDialog] = useState(false);
  const [saved, setSaved] = useState(false);

  const openEdit = (section: typeof mockHomepageSections[0]) => {
    setSelectedSection({ ...section });
    setEditDialog(true);
    setSaved(false);
  };

  const saveSection = () => {
    if (!selectedSection) return;
    setSections(sections.map((s) => (s.id === selectedSection.id ? selectedSection : s)));
    setSaved(true);
    setTimeout(() => {
      setEditDialog(false);
      setSaved(false);
    }, 800);
  };

  const toggleVisibility = (id: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, isVisible: !s.isVisible } : s)));
  };

  const moveSection = (id: string, direction: "up" | "down") => {
    const idx = sections.findIndex((s) => s.id === id);
    if (direction === "up" && idx > 0) {
      const newSections = [...sections];
      [newSections[idx], newSections[idx - 1]] = [newSections[idx - 1], newSections[idx]];
      setSections(newSections.map((s, i) => ({ ...s, sortOrder: i + 1 })));
    } else if (direction === "down" && idx < sections.length - 1) {
      const newSections = [...sections];
      [newSections[idx], newSections[idx + 1]] = [newSections[idx + 1], newSections[idx]];
      setSections(newSections.map((s, i) => ({ ...s, sortOrder: i + 1 })));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Monitor className="h-7 w-7 text-primary-600" />
          Website Builder
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage homepage sections and their content
        </p>
      </div>

      {/* Sections List */}
      <div className="space-y-3">
        {sections.sort((a, b) => a.sortOrder - b.sortOrder).map((section, idx) => (
          <Card
            key={section.id}
            className={`overflow-hidden transition-all hover:shadow-md ${!section.isVisible ? "opacity-60" : ""}`}
          >
            <CardContent className="p-0">
              <div className="flex items-center gap-4 p-4">
                {/* Cover Preview */}
                <div className="w-24 h-16 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                  {section.coverImage ? (
                    <img src={section.coverImage} alt={section.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">{section.title}</h3>
                    {!section.isVisible && (
                      <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                        Hidden
                      </span>
                    )}
                    {section.is3D && (
                      <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                        3D
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{section.subtitle}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">
                      Key: <code className="bg-gray-100 px-1 rounded">{section.key}</code>
                    </span>
                    {section.buttonText && (
                      <span className="text-xs text-primary-600">
                        Button: {section.buttonText}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveSection(section.id, "up")}
                    disabled={idx === 0}
                    className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"
                  >
                    <MoveUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveSection(section.id, "down")}
                    disabled={idx === sections.length - 1}
                    className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"
                  >
                    <MoveDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => toggleVisibility(section.id)}
                    className="p-1.5 rounded hover:bg-gray-100"
                  >
                    {section.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <Button size="sm" variant="ghost" onClick={() => openEdit(section)}>
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Section: {selectedSection?.title}</DialogTitle>
          </DialogHeader>

          {selectedSection && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={selectedSection.title}
                    onChange={(e) => setSelectedSection({ ...selectedSection, title: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <Input
                    value={selectedSection.subtitle || ""}
                    onChange={(e) => setSelectedSection({ ...selectedSection, subtitle: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={selectedSection.description || ""}
                  onChange={(e) => setSelectedSection({ ...selectedSection, description: e.target.value })}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Cover Image URL</Label>
                  <Input
                    value={selectedSection.coverImage || ""}
                    onChange={(e) => setSelectedSection({ ...selectedSection, coverImage: e.target.value })}
                    className="mt-1"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label>Background Color</Label>
                  <Input
                    value={selectedSection.bgColor || ""}
                    onChange={(e) => setSelectedSection({ ...selectedSection, bgColor: e.target.value })}
                    className="mt-1"
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={selectedSection.buttonText || ""}
                    onChange={(e) => setSelectedSection({ ...selectedSection, buttonText: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Button Link</Label>
                  <Input
                    value={selectedSection.buttonLink || ""}
                    onChange={(e) => setSelectedSection({ ...selectedSection, buttonLink: e.target.value })}
                    className="mt-1"
                    placeholder="/flights"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Visible</p>
                    <p className="text-xs text-gray-500">Show on homepage</p>
                  </div>
                  <Switch
                    checked={selectedSection.isVisible}
                    onCheckedChange={(v) => setSelectedSection({ ...selectedSection, isVisible: v })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">3D Effect</p>
                    <p className="text-xs text-gray-500">Enable 3D animations</p>
                  </div>
                  <Switch
                    checked={selectedSection.is3D}
                    onCheckedChange={(v) => setSelectedSection({ ...selectedSection, is3D: v })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Text Color</p>
                  </div>
                  <Input
                    type="color"
                    value={selectedSection.textColor || "#FFFFFF"}
                    onChange={(e) => setSelectedSection({ ...selectedSection, textColor: e.target.value })}
                    className="w-12 h-8 p-1"
                  />
                </div>
              </div>

              {/* Preview */}
              {selectedSection.coverImage && (
                <div
                  className="rounded-lg overflow-hidden p-6 text-center"
                  style={{
                    backgroundImage: `url(${selectedSection.coverImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: selectedSection.textColor || "#FFFFFF",
                  }}
                >
                  <h2 className="text-2xl font-bold drop-shadow-lg">{selectedSection.title}</h2>
                  <p className="text-lg opacity-90 drop-shadow">{selectedSection.subtitle}</p>
                  <p className="mt-2 opacity-80 text-sm max-w-md mx-auto drop-shadow">{selectedSection.description}</p>
                  {selectedSection.buttonText && (
                    <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium">
                      {selectedSection.buttonText}
                    </button>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={saveSection} className="bg-primary-600 hover:bg-primary-700">
                  <Save className="h-4 w-4 mr-1" />
                  {saved ? "Saved!" : "Save Section"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
