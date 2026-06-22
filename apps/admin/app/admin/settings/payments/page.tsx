"use client";

import { useState } from "react";
import { CreditCard, Save, RefreshCw, Check, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PaymentGateway {
  id: string;
  name: string;
  displayName: string;
  isActive: boolean;
  sandbox: boolean;
  merchantId: string;
  storeId: string;
  username: string;
  password: string;
  publicKey: string;
  privateKey: string;
  secretKey: string;
  callbackUrl: string;
  extraFee: number;
  instructions: string;
}

const defaultGateways: PaymentGateway[] = [
  {
    id: "jazzcash",
    name: "JazzCash",
    displayName: "JazzCash Mobile Wallet",
    isActive: false,
    sandbox: true,
    merchantId: "",
    storeId: "",
    username: "",
    password: "",
    publicKey: "",
    privateKey: "",
    secretKey: "",
    callbackUrl: "https://yourdomain.com/api/payments/jazzcash/callback",
    extraFee: 2.5,
    instructions: "Pay via JazzCash Mobile Account",
  },
  {
    id: "easypaisa",
    name: "EasyPaisa",
    displayName: "EasyPaisa Mobile Wallet",
    isActive: false,
    sandbox: true,
    merchantId: "",
    storeId: "",
    username: "",
    password: "",
    publicKey: "",
    privateKey: "",
    secretKey: "",
    callbackUrl: "https://yourdomain.com/api/payments/easypaisa/callback",
    extraFee: 2.0,
    instructions: "Pay via EasyPaisa Mobile Account",
  },
  {
    id: "payfast",
    name: "PayFast",
    displayName: "PayFast Payment Gateway",
    isActive: false,
    sandbox: true,
    merchantId: "",
    storeId: "",
    username: "",
    password: "",
    publicKey: "",
    privateKey: "",
    secretKey: "",
    callbackUrl: "https://yourdomain.com/api/payments/payfast/callback",
    extraFee: 3.0,
    instructions: "Secure payment via PayFast",
  },
];

function GatewayForm({
  gateway,
  onChange,
}: {
  gateway: PaymentGateway;
  onChange: (g: PaymentGateway) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${gateway.isActive ? "bg-emerald-500" : "bg-gray-400"}`}
          >
            <CreditCard className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{gateway.displayName}</p>
            <p className="text-xs text-gray-500">
              {gateway.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label className="text-sm text-gray-500">Active</Label>
            <Switch
              checked={gateway.isActive}
              onCheckedChange={(v) => onChange({ ...gateway, isActive: v })}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-sm text-gray-500">Sandbox</Label>
            <Switch
              checked={gateway.sandbox}
              onCheckedChange={(v) => onChange({ ...gateway, sandbox: v })}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Display Name</Label>
          <Input
            value={gateway.displayName}
            onChange={(e) =>
              onChange({ ...gateway, displayName: e.target.value })
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label>Merchant ID</Label>
          <Input
            value={gateway.merchantId}
            onChange={(e) =>
              onChange({ ...gateway, merchantId: e.target.value })
            }
            className="mt-1"
            placeholder="Enter Merchant ID"
          />
        </div>
        <div>
          <Label>Store ID</Label>
          <Input
            value={gateway.storeId}
            onChange={(e) =>
              onChange({ ...gateway, storeId: e.target.value })
            }
            className="mt-1"
            placeholder="Enter Store ID"
          />
        </div>
        <div>
          <Label>Username</Label>
          <Input
            value={gateway.username}
            onChange={(e) =>
              onChange({ ...gateway, username: e.target.value })
            }
            className="mt-1"
            placeholder="Enter Username"
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            value={gateway.password}
            onChange={(e) =>
              onChange({ ...gateway, password: e.target.value })
            }
            className="mt-1"
            placeholder="Enter Password"
          />
        </div>
        <div>
          <Label>Secret Key</Label>
          <Input
            type="password"
            value={gateway.secretKey}
            onChange={(e) =>
              onChange({ ...gateway, secretKey: e.target.value })
            }
            className="mt-1"
            placeholder="Enter Secret Key"
          />
        </div>
        <div>
          <Label>Public Key</Label>
          <Input
            value={gateway.publicKey}
            onChange={(e) =>
              onChange({ ...gateway, publicKey: e.target.value })
            }
            className="mt-1"
            placeholder="Enter Public Key"
          />
        </div>
        <div>
          <Label>Private Key</Label>
          <Input
            type="password"
            value={gateway.privateKey}
            onChange={(e) =>
              onChange({ ...gateway, privateKey: e.target.value })
            }
            className="mt-1"
            placeholder="Enter Private Key"
          />
        </div>
      </div>

      <div>
        <Label>Callback URL</Label>
        <div className="flex gap-2 mt-1">
          <Input value={gateway.callbackUrl} readOnly />
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigator.clipboard.writeText(gateway.callbackUrl)}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Extra Fee (%)</Label>
          <Input
            type="number"
            value={gateway.extraFee}
            onChange={(e) =>
              onChange({ ...gateway, extraFee: Number(e.target.value) })
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label>Instructions (shown to customer)</Label>
          <Input
            value={gateway.instructions}
            onChange={(e) =>
              onChange({ ...gateway, instructions: e.target.value })
            }
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}

export default function PaymentSettingsPage() {
  const [gateways, setGateways] = useState<PaymentGateway[]>(defaultGateways);
  const [saved, setSaved] = useState(false);

  const updateGateway = (updated: PaymentGateway) => {
    setGateways(gateways.map((g) => (g.id === updated.id ? updated : g)));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <CreditCard className="h-7 w-7 text-primary-600" />
          Payment Gateway Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure payment gateways for JazzCash, EasyPaisa, and PayFast
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base">Configure Gateways</CardTitle>
          <div className="flex items-center gap-2">
            {saved && (
              <span className="flex items-center gap-1 text-sm text-emerald-600">
                <Check className="h-4 w-4" />
                Saved
              </span>
            )}
            <Button
              onClick={handleSave}
              className="bg-primary-600 hover:bg-primary-700"
            >
              <Save className="h-4 w-4 mr-1" />
              Save All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="jazzcash" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="jazzcash">
                JazzCash{" "}
                {gateways[0].isActive && (
                  <span className="ml-1.5 h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                )}
              </TabsTrigger>
              <TabsTrigger value="easypaisa">
                EasyPaisa{" "}
                {gateways[1].isActive && (
                  <span className="ml-1.5 h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                )}
              </TabsTrigger>
              <TabsTrigger value="payfast">
                PayFast{" "}
                {gateways[2].isActive && (
                  <span className="ml-1.5 h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                )}
              </TabsTrigger>
            </TabsList>
            {gateways.map((gateway) => (
              <TabsContent key={gateway.id} value={gateway.id} className="mt-4">
                <GatewayForm gateway={gateway} onChange={updateGateway} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {gateways.map((g) => (
          <Card key={g.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${g.isActive ? "bg-emerald-500" : "bg-gray-300"}`}
                  >
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{g.name}</p>
                    <p className="text-xs text-gray-500">
                      {g.sandbox ? "Sandbox" : "Production"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={g.isActive}
                  onCheckedChange={(v) =>
                    updateGateway({ ...g, isActive: v })
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
