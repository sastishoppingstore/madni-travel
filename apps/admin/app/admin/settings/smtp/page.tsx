"use client";

import { useState } from "react";
import { Mail, Save, Send, Check, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SMTPConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  encryption: string;
  fromEmail: string;
  fromName: string;
  replyTo: string;
  isActive: boolean;
}

const defaultConfig: SMTPConfig = {
  host: "smtp.gmail.com",
  port: 587,
  username: "",
  password: "",
  encryption: "tls",
  fromEmail: "noreply@madnitravel.com",
  fromName: "Madni Travel",
  replyTo: "support@madnitravel.com",
  isActive: false,
};

export default function SMTPSettingsPage() {
  const [config, setConfig] = useState<SMTPConfig>(defaultConfig);
  const [saved, setSaved] = useState(false);
  const [testEmail, setTestEmail] = useState("");
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
          <Mail className="h-7 w-7 text-blue-600" />
          SMTP Email Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure SMTP for transactional emails and notifications
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base">SMTP Configuration</CardTitle>
          <div className="flex items-center gap-2">
            <Label className="text-sm">Active</Label>
            <Switch
              checked={config.isActive}
              onCheckedChange={(v) => setConfig({ ...config, isActive: v })}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>SMTP Host</Label>
              <Input
                value={config.host}
                onChange={(e) =>
                  setConfig({ ...config, host: e.target.value })
                }
                className="mt-1"
                placeholder="smtp.gmail.com"
              />
            </div>
            <div>
              <Label>Port</Label>
              <Input
                type="number"
                value={config.port}
                onChange={(e) =>
                  setConfig({ ...config, port: Number(e.target.value) })
                }
                className="mt-1"
                placeholder="587"
              />
            </div>
            <div>
              <Label>Username</Label>
              <Input
                value={config.username}
                onChange={(e) =>
                  setConfig({ ...config, username: e.target.value })
                }
                className="mt-1"
                placeholder="your-email@gmail.com"
              />
            </div>
            <div>
              <Label>Password / App Password</Label>
              <Input
                type="password"
                value={config.password}
                onChange={(e) =>
                  setConfig({ ...config, password: e.target.value })
                }
                className="mt-1"
                placeholder="Enter password"
              />
            </div>
            <div>
              <Label>Encryption</Label>
              <select
                className="w-full h-10 mt-1 rounded-md border border-input bg-background px-3 text-sm"
                value={config.encryption}
                onChange={(e) =>
                  setConfig({ ...config, encryption: e.target.value })
                }
              >
                <option value="tls">TLS</option>
                <option value="ssl">SSL</option>
                <option value="none">None</option>
              </select>
            </div>
            <div>
              <Label>From Email</Label>
              <Input
                value={config.fromEmail}
                onChange={(e) =>
                  setConfig({ ...config, fromEmail: e.target.value })
                }
                className="mt-1"
                placeholder="noreply@madnitravel.com"
              />
            </div>
            <div>
              <Label>From Name</Label>
              <Input
                value={config.fromName}
                onChange={(e) =>
                  setConfig({ ...config, fromName: e.target.value })
                }
                className="mt-1"
                placeholder="Madni Travel"
              />
            </div>
            <div>
              <Label>Reply-To Email</Label>
              <Input
                value={config.replyTo}
                onChange={(e) =>
                  setConfig({ ...config, replyTo: e.target.value })
                }
                className="mt-1"
                placeholder="support@madnitravel.com"
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

      {/* Test Email */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Send className="h-4 w-4" />
            Test Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Recipient Email</Label>
              <Input
                type="email"
                placeholder="test@email.com"
                className="mt-1"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
              />
            </div>
            <div>
              <Label>Test Type</Label>
              <select className="w-full h-10 mt-1 rounded-md border border-input bg-background px-3 text-sm">
                <option>Basic Connection Test</option>
                <option>Booking Confirmation Template</option>
                <option>Payment Receipt Template</option>
              </select>
            </div>
          </div>
          <Button variant="outline" onClick={handleTest} disabled={!testEmail}>
            <Send className="h-4 w-4 mr-1" />
            Send Test Email
          </Button>
          {testSent && (
            <p className="text-sm text-emerald-600 flex items-center gap-1">
              <Check className="h-4 w-4" />
              Test email sent! Check your inbox.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Security Note */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-amber-800">
                Security Note
              </p>
              <p className="text-xs text-amber-600 mt-1">
                For Gmail, use an App Password instead of your regular password.
                Enable 2FA on your Google account and generate an App Password
                at myaccount.google.com/apppasswords.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
