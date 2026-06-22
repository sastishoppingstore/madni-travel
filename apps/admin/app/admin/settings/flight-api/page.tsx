"use client";

import { useState } from "react";
import { Wifi, Save, Check, Plane, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface FlightAPIConfig {
  providerName: string;
  providerType: string;
  baseUrl: string;
  apiKey: string;
  apiSecret: string;
  clientId: string;
  clientSecret: string;
  sandbox: boolean;
  isActive: boolean;
  currency: string;
  markupPercent: number;
  fixedServiceFee: number;
  timeout: number;
}

const defaultConfig: FlightAPIConfig = {
  providerName: "Amadeus",
  providerType: "Amadeus",
  baseUrl: "https://api.amadeus.com",
  apiKey: "",
  apiSecret: "",
  clientId: "",
  clientSecret: "",
  sandbox: true,
  isActive: false,
  currency: "PKR",
  markupPercent: 5,
  fixedServiceFee: 500,
  timeout: 30,
};

export default function FlightAPISettingsPage() {
  const [config, setConfig] = useState<FlightAPIConfig>(defaultConfig);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Wifi className="h-7 w-7 text-sky-600" />
          Flight API Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure third-party flight search and booking API integration
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base">API Configuration</CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm">Sandbox</Label>
              <Switch
                checked={config.sandbox}
                onCheckedChange={(v) =>
                  setConfig({ ...config, sandbox: v })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Active</Label>
              <Switch
                checked={config.isActive}
                onCheckedChange={(v) =>
                  setConfig({ ...config, isActive: v })
                }
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Provider Name</Label>
              <Input
                value={config.providerName}
                onChange={(e) =>
                  setConfig({ ...config, providerName: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Provider Type</Label>
              <select
                className="w-full h-10 mt-1 rounded-md border border-input bg-background px-3 text-sm"
                value={config.providerType}
                onChange={(e) =>
                  setConfig({ ...config, providerType: e.target.value })
                }
              >
                <option value="Amadeus">Amadeus</option>
                <option value="GDS">GDS</option>
                <option value="NDC">NDC</option>
                <option value="Generic">Generic REST API</option>
                <option value="Sabre">Sabre</option>
                <option value="Travelport">Travelport</option>
              </select>
            </div>
            <div>
              <Label>Base URL</Label>
              <Input
                value={config.baseUrl}
                onChange={(e) =>
                  setConfig({ ...config, baseUrl: e.target.value })
                }
                className="mt-1"
                placeholder="https://api.example.com"
              />
            </div>
            <div>
              <Label>API Key</Label>
              <Input
                type="password"
                value={config.apiKey}
                onChange={(e) =>
                  setConfig({ ...config, apiKey: e.target.value })
                }
                className="mt-1"
                placeholder="Enter API Key"
              />
            </div>
            <div>
              <Label>API Secret</Label>
              <Input
                type="password"
                value={config.apiSecret}
                onChange={(e) =>
                  setConfig({ ...config, apiSecret: e.target.value })
                }
                className="mt-1"
                placeholder="Enter API Secret"
              />
            </div>
            <div>
              <Label>Client ID</Label>
              <Input
                value={config.clientId}
                onChange={(e) =>
                  setConfig({ ...config, clientId: e.target.value })
                }
                className="mt-1"
                placeholder="Enter Client ID"
              />
            </div>
            <div>
              <Label>Client Secret</Label>
              <Input
                type="password"
                value={config.clientSecret}
                onChange={(e) =>
                  setConfig({ ...config, clientSecret: e.target.value })
                }
                className="mt-1"
                placeholder="Enter Client Secret"
              />
            </div>
            <div>
              <Label>Currency</Label>
              <Input
                value={config.currency}
                onChange={(e) =>
                  setConfig({ ...config, currency: e.target.value })
                }
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Rules */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Pricing Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label>Markup Percentage (%)</Label>
              <Input
                type="number"
                value={config.markupPercent}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    markupPercent: Number(e.target.value),
                  })
                }
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Percentage added to base price
              </p>
            </div>
            <div>
              <Label>Fixed Service Fee (Rs.)</Label>
              <Input
                type="number"
                value={config.fixedServiceFee}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    fixedServiceFee: Number(e.target.value),
                  })
                }
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Flat fee per booking
              </p>
            </div>
            <div>
              <Label>API Timeout (seconds)</Label>
              <Input
                type="number"
                value={config.timeout}
                onChange={(e) =>
                  setConfig({ ...config, timeout: Number(e.target.value) })
                }
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
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

      {/* Provider Links */}
      <Card className="bg-sky-50 border-sky-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Plane className="h-5 w-5 text-sky-500 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-sky-800">
                Popular Flight API Providers
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                {[
                  { name: "Amadeus", url: "https://developers.amadeus.com" },
                  { name: "Sabre", url: "https://developer.sabre.com" },
                  { name: "Travelport", url: "https://developer.travelport.com" },
                  { name: "IATA NDC", url: "https://www.iata.org/en/programs/airline-distribution/ndc" },
                ].map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sky-600 underline inline-flex items-center gap-0.5 hover:text-sky-800"
                  >
                    {p.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
