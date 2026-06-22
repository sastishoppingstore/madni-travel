"use client";

import { useState } from "react";
import {
  MessageCircle,
  Save,
  Send,
  Check,
  ExternalLink,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface WhatsAppConfig {
  provider: string;
  apiBaseUrl: string;
  accessToken: string;
  phoneNumberId: string;
  businessAccountId: string;
  templateName: string;
  languageCode: string;
  fallbackLink: string;
  isActive: boolean;
}

const defaultConfig: WhatsAppConfig = {
  provider: "meta",
  apiBaseUrl: "https://graph.facebook.com/v18.0",
  accessToken: "",
  phoneNumberId: "",
  businessAccountId: "",
  templateName: "madni_travel_",
  languageCode: "en",
  fallbackLink: "https://wa.me/923216001973",
  isActive: false,
};

export default function WhatsAppSettingsPage() {
  const [config, setConfig] = useState<WhatsAppConfig>(defaultConfig);
  const [saved, setSaved] = useState(false);
  const [testNumber, setTestNumber] = useState("");
  const [testSent, setTestSent] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleTest = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <MessageCircle className="h-7 w-7 text-green-600" />
          WhatsApp API Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure WhatsApp Business API for notifications and messaging
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base">API Configuration</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm">Active</Label>
              <Switch
                checked={config.isActive}
                onCheckedChange={(v) => setConfig({ ...config, isActive: v })}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Provider</Label>
              <select
                className="w-full h-10 mt-1 rounded-md border border-input bg-background px-3 text-sm"
                value={config.provider}
                onChange={(e) =>
                  setConfig({ ...config, provider: e.target.value })
                }
              >
                <option value="meta">Meta (WhatsApp Business)</option>
                <option value="twilio">Twilio</option>
                <option value="messagebird">MessageBird</option>
                <option value="custom">Custom API</option>
              </select>
            </div>
            <div>
              <Label>API Base URL</Label>
              <Input
                value={config.apiBaseUrl}
                onChange={(e) =>
                  setConfig({ ...config, apiBaseUrl: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Access Token</Label>
              <Input
                type="password"
                value={config.accessToken}
                onChange={(e) =>
                  setConfig({ ...config, accessToken: e.target.value })
                }
                className="mt-1"
                placeholder="Enter your access token"
              />
            </div>
            <div>
              <Label>Phone Number ID</Label>
              <Input
                value={config.phoneNumberId}
                onChange={(e) =>
                  setConfig({ ...config, phoneNumberId: e.target.value })
                }
                className="mt-1"
                placeholder="Enter Phone Number ID"
              />
            </div>
            <div>
              <Label>Business Account ID</Label>
              <Input
                value={config.businessAccountId}
                onChange={(e) =>
                  setConfig({ ...config, businessAccountId: e.target.value })
                }
                className="mt-1"
                placeholder="Enter Business Account ID"
              />
            </div>
            <div>
              <Label>Template Name Prefix</Label>
              <Input
                value={config.templateName}
                onChange={(e) =>
                  setConfig({ ...config, templateName: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Language Code</Label>
              <select
                className="w-full h-10 mt-1 rounded-md border border-input bg-background px-3 text-sm"
                value={config.languageCode}
                onChange={(e) =>
                  setConfig({ ...config, languageCode: e.target.value })
                }
              >
                <option value="en">English</option>
                <option value="ur">Urdu</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
            <div>
              <Label>Fallback Link (e.g. wa.me)</Label>
              <Input
                value={config.fallbackLink}
                onChange={(e) =>
                  setConfig({ ...config, fallbackLink: e.target.value })
                }
                className="mt-1"
                placeholder="https://wa.me/your-number"
              />
            </div>
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

      {/* Test Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Send className="h-4 w-4" />
            Test WhatsApp
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Phone Number (with country code)</Label>
              <Input
                placeholder="+923216001973"
                className="mt-1"
                value={testNumber}
                onChange={(e) => setTestNumber(e.target.value)}
              />
            </div>
            <div>
              <Label>Test Message Template</Label>
              <select className="w-full h-10 mt-1 rounded-md border border-input bg-background px-3 text-sm">
                <option>booking_confirmation</option>
                <option>payment_received</option>
                <option>ticket_pending</option>
                <option>custom_message</option>
              </select>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleTest}
            disabled={!testNumber}
          >
            <Send className="h-4 w-4 mr-1" />
            Send Test Message
          </Button>
          {testSent && (
            <p className="text-sm text-emerald-600 flex items-center gap-1">
              <Check className="h-4 w-4" />
              Test message sent successfully!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Help */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-blue-800">
                How to get credentials
              </p>
              <p className="text-xs text-blue-600 mt-1">
                1. Go to{" "}
                <a
                  href="https://developers.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline inline-flex items-center gap-0.5"
                >
                  developers.facebook.com
                  <ExternalLink className="h-3 w-3" />
                </a>{" "}
                and create an app. 2. Add WhatsApp product to your app. 3.
                Copy the Access Token, Phone Number ID, and Business Account
                ID.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
