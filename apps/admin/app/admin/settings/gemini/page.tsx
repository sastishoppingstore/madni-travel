"use client";

import { useState } from "react";
import { Sparkles, Save, Send, Check, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface GeminiConfig {
  apiKey: string;
  modelName: string;
  temperature: number;
  systemPrompt: string;
  greeting: string;
  maxTokens: number;
  isActive: boolean;
}

const defaultConfig: GeminiConfig = {
  apiKey: "",
  modelName: "gemini-pro",
  temperature: 0.7,
  systemPrompt:
    "You are Madni Travel's AI assistant. Help staff with bookings, pricing, and travel information. Answer in English or Urdu as requested. Be professional and helpful.",
  greeting:
    "Assalamualaikum! I'm your Madni Travel AI assistant. How can I help you today?",
  maxTokens: 2048,
  isActive: false,
};

export default function GeminiSettingsPage() {
  const [config, setConfig] = useState<GeminiConfig>(defaultConfig);
  const [saved, setSaved] = useState(false);
  const [testMessage, setTestMessage] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [testing, setTesting] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleTest = () => {
    setTesting(true);
    // Simulate AI response
    setTimeout(() => {
      setTestResponse(
        "Assalamualaikum! I'm your Madni Travel AI assistant. I'm ready to help you with bookings, pricing, reports, and any travel-related questions. How can I assist you today?"
      );
      setTesting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-violet-500" />
          Gemini AI Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure Google Gemini AI for the AI Assistant and business insights
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base">API Configuration</CardTitle>
          <div className="flex items-center gap-2">
            <Label className="text-sm">Active</Label>
            <Switch
              checked={config.isActive}
              onCheckedChange={(v) => setConfig({ ...config, isActive: v })}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Gemini API Key</Label>
            <Input
              type="password"
              value={config.apiKey}
              onChange={(e) =>
                setConfig({ ...config, apiKey: e.target.value })
              }
              className="mt-1"
              placeholder="Enter your Gemini API key"
            />
            <p className="text-xs text-gray-500 mt-1">
              Get your API key from{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 underline"
              >
                Google AI Studio
              </a>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label>Model</Label>
              <select
                className="w-full h-10 mt-1 rounded-md border border-input bg-background px-3 text-sm"
                value={config.modelName}
                onChange={(e) =>
                  setConfig({ ...config, modelName: e.target.value })
                }
              >
                <option value="gemini-pro">Gemini Pro</option>
                <option value="gemini-pro-vision">Gemini Pro Vision</option>
                <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
              </select>
            </div>
            <div>
              <Label>Temperature ({config.temperature})</Label>
              <Input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={config.temperature}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    temperature: Number(e.target.value),
                  })
                }
                className="mt-2"
              />
            </div>
            <div>
              <Label>Max Tokens</Label>
              <Input
                type="number"
                value={config.maxTokens}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    maxTokens: Number(e.target.value),
                  })
                }
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label>System Prompt</Label>
            <Textarea
              value={config.systemPrompt}
              onChange={(e) =>
                setConfig({ ...config, systemPrompt: e.target.value })
              }
              className="mt-1 min-h-[120px]"
              placeholder="Define how the AI should behave..."
            />
            <p className="text-xs text-gray-500 mt-1">
              This sets the AI&apos;s personality and behavior for all
              conversations.
            </p>
          </div>

          <div>
            <Label>Greeting Message</Label>
            <Input
              value={config.greeting}
              onChange={(e) =>
                setConfig({ ...config, greeting: e.target.value })
              }
              className="mt-1"
              placeholder="Enter the greeting message..."
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button
              onClick={handleSave}
              className="bg-primary-600 hover:bg-primary-700"
            >
              <Save className="h-4 w-4 mr-1" />
              Save Settings
            </Button>
            {saved && (
              <span className="flex items-center gap-1 text-sm text-emerald-600">
                <Check className="h-4 w-4" />
                Saved
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Test Chat */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Test Chat
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {testResponse && (
            <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-violet-700">Gemini</p>
                  <p className="text-sm text-gray-700 mt-1">{testResponse}</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <Input
              placeholder="Type a test message..."
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTest()}
            />
            <Button
              variant="outline"
              onClick={handleTest}
              disabled={!testMessage || testing}
            >
              <Send className="h-4 w-4 mr-1" />
              {testing ? "..." : "Send"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
