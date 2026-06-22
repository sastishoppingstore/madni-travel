"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  User,
  Phone,
  Mail,
  Plane,
  Package,
  Star,
  FileText,
  Hotel,
  Bus,
  Wrench,
  Receipt,
  Printer,
  Save,
  Plus,
  X,
  Calculator,
  CreditCard,
  Banknote,
  Landmark,
  Smartphone,
  Globe,
  Trash2,
  Percent,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const serviceTypes = [
  { value: "FLIGHT", label: "Flight", icon: Plane, color: "bg-blue-500" },
  { value: "PACKAGE", label: "Package", icon: Package, color: "bg-purple-500" },
  { value: "UMRAH", label: "Umrah", icon: Star, color: "bg-emerald-500" },
  { value: "VISA", label: "Visa", icon: FileText, color: "bg-amber-500" },
  { value: "HOTEL", label: "Hotel", icon: Hotel, color: "bg-pink-500" },
  { value: "BUS", label: "Bus", icon: Bus, color: "bg-cyan-500" },
  { value: "CUSTOM", label: "Custom", icon: Wrench, color: "bg-gray-500" },
];

const paymentMethods = [
  { value: "JAZZCASH", label: "JazzCash", icon: Smartphone },
  { value: "EASYPAISA", label: "EasyPaisa", icon: Smartphone },
  { value: "BANK_TRANSFER", label: "Bank Transfer", icon: Landmark },
  { value: "CASH_AT_OFFICE", label: "Cash", icon: Banknote },
  { value: "CREDIT_CARD", label: "Credit Card", icon: CreditCard },
  { value: "ONLINE", label: "Online", icon: Globe },
];

const staffList = [
  { id: "1", name: "Ahmed Khan", rate: 1.0 },
  { id: "2", name: "Fatima Ali", rate: 0.8 },
  { id: "3", name: "Zain Malik", rate: 0.8 },
  { id: "4", name: "Ayesha Siddiqui", rate: 0.5 },
  { id: "5", name: "Omar Farooq", rate: 0.3 },
];

interface CartItem {
  id: string;
  serviceType: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  tax: number;
  serviceCharge: number;
  discount: number;
  quantity: number;
}

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("CASH_AT_OFFICE");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [notes, setNotes] = useState("");
  const [invoiceNo, setInvoiceNo] = useState(() => {
    const now = new Date();
    return `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  });

  // Current item being added
  const [currentItem, setCurrentItem] = useState<Partial<CartItem>>({
    serviceType: "FLIGHT",
    description: "",
    purchasePrice: 0,
    salePrice: 0,
    tax: 0,
    serviceCharge: 0,
    discount: 0,
    quantity: 1,
  });

  const calculations = useMemo(() => {
    const subtotals = cart.map((item) => {
      const gross = item.salePrice * item.quantity;
      const taxAmt = (gross * item.tax) / 100;
      const serviceAmt = (gross * item.serviceCharge) / 100;
      const discountAmt = (gross * item.discount) / 100;
      const total = gross + taxAmt + serviceAmt - discountAmt;
      const cost = item.purchasePrice * item.quantity;
      const profit = total - cost - taxAmt - serviceAmt;
      return { gross, taxAmt, serviceAmt, discountAmt, total, cost, profit };
    });

    const grossTotal = subtotals.reduce((s, c) => s + c.gross, 0);
    const totalTax = subtotals.reduce((s, c) => s + c.taxAmt, 0);
    const totalService = subtotals.reduce((s, c) => s + c.serviceAmt, 0);
    const totalDiscount = subtotals.reduce((s, c) => s + c.discountAmt, 0);
    const grandTotal = subtotals.reduce((s, c) => s + c.total, 0);
    const totalCost = subtotals.reduce((s, c) => s + c.cost, 0);
    const totalProfit = subtotals.reduce((s, c) => s + c.profit, 0);

    return {
      grossTotal,
      totalTax,
      totalService,
      totalDiscount,
      grandTotal,
      totalCost,
      totalProfit,
      itemCount: cart.length,
    };
  }, [cart]);

  const addToCart = () => {
    if (!currentItem.description || !currentItem.salePrice) return;
    const newItem: CartItem = {
      id: Math.random().toString(36).substring(2, 9),
      serviceType: currentItem.serviceType || "FLIGHT",
      description: currentItem.description || "",
      purchasePrice: Number(currentItem.purchasePrice) || 0,
      salePrice: Number(currentItem.salePrice) || 0,
      tax: Number(currentItem.tax) || 0,
      serviceCharge: Number(currentItem.serviceCharge) || 0,
      discount: Number(currentItem.discount) || 0,
      quantity: Number(currentItem.quantity) || 1,
    };
    setCart([...cart, newItem]);
    setCurrentItem({
      serviceType: currentItem.serviceType,
      description: "",
      purchasePrice: 0,
      salePrice: 0,
      tax: 0,
      serviceCharge: 0,
      discount: 0,
      quantity: 1,
    });
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setNotes("");
  };

  const commission = selectedStaff
    ? calculations.totalProfit *
      (staffList.find((s) => s.id === selectedStaff)?.rate || 0) / 100
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="h-7 w-7 text-primary-600" />
            POS Sale
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and process new sales
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-sm px-3 py-1">
            {invoiceNo}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setInvoiceNo(() => {
                const now = new Date();
                return `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
              })
            }
          >
            <Receipt className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Panel - Customer & Item Entry */}
        <div className="xl:col-span-2 space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">Customer Name *</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Enter customer name"
                      className="pl-9"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Phone Number</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="+92-300-XXXXXXX"
                      className="pl-9"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="customer@email.com"
                      className="pl-9"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="h-4 w-4" />
                Service Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {serviceTypes.map((st) => {
                  const Icon = st.icon;
                  return (
                    <button
                      key={st.value}
                      onClick={() =>
                        setCurrentItem({ ...currentItem, serviceType: st.value })
                      }
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                        currentItem.serviceType === st.value
                          ? "border-primary-500 bg-primary-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${st.color}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-[10px] font-medium">{st.label}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Item Entry Form */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Item
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-gray-500">Description *</Label>
                <Input
                  placeholder="e.g. Karachi to Dubai Round Trip"
                  className="mt-1"
                  value={currentItem.description || ""}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, description: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">Purchase Price</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="mt-1"
                    value={currentItem.purchasePrice || ""}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        purchasePrice: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Sale Price *</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="mt-1"
                    value={currentItem.salePrice || ""}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        salePrice: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">
                    <Percent className="h-3 w-3 inline" /> Tax
                  </Label>
                  <Input
                    type="number"
                    placeholder="0%"
                    className="mt-1"
                    value={currentItem.tax || ""}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        tax: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">
                    <Percent className="h-3 w-3 inline" /> Srv Charge
                  </Label>
                  <Input
                    type="number"
                    placeholder="0%"
                    className="mt-1"
                    value={currentItem.serviceCharge || ""}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        serviceCharge: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-end">
                <div>
                  <Label className="text-xs text-gray-500">
                    <Percent className="h-3 w-3 inline" /> Discount
                  </Label>
                  <Input
                    type="number"
                    placeholder="0%"
                    className="mt-1"
                    value={currentItem.discount || ""}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        discount: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Quantity</Label>
                  <Input
                    type="number"
                    placeholder="1"
                    min={1}
                    className="mt-1"
                    value={currentItem.quantity || 1}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        quantity: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button
                    className="w-full bg-primary-600 hover:bg-primary-700"
                    onClick={addToCart}
                    disabled={!currentItem.description || !currentItem.salePrice}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cart Items */}
          {cart.length > 0 && (
            <Card>
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Cart Items ({cart.length})
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={clearCart}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-500">
                        <th className="text-left py-2">Service</th>
                        <th className="text-left py-2">Description</th>
                        <th className="text-right py-2">Qty</th>
                        <th className="text-right py-2">Price</th>
                        <th className="text-right py-2">Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => {
                        const st = serviceTypes.find(
                          (s) => s.value === item.serviceType
                        );
                        const Icon = st?.icon || Package;
                        const gross = item.salePrice * item.quantity;
                        const taxAmt = (gross * item.tax) / 100;
                        const serviceAmt = (gross * item.serviceCharge) / 100;
                        const discountAmt = (gross * item.discount) / 100;
                        const lineTotal =
                          gross + taxAmt + serviceAmt - discountAmt;
                        return (
                          <tr
                            key={item.id}
                            className="border-b border-gray-50"
                          >
                            <td className="py-2">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`p-1 rounded ${st?.color || "bg-gray-500"}`}
                                >
                                  <Icon className="h-3 w-3 text-white" />
                                </div>
                                <span className="text-xs">{st?.label}</span>
                              </div>
                            </td>
                            <td className="py-2 max-w-[200px] truncate">
                              {item.description}
                            </td>
                            <td className="text-right py-2">{item.quantity}</td>
                            <td className="text-right py-2">
                              {formatCurrency(item.salePrice)}
                            </td>
                            <td className="text-right py-2 font-medium">
                              {formatCurrency(lineTotal)}
                            </td>
                            <td className="text-right py-2">
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 rounded hover:bg-red-50 text-red-400 hover:text-red-600"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Panel - Summary */}
        <div className="space-y-6">
          {/* Totals Card */}
          <Card className="bg-secondary-800 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Sale Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span>{formatCurrency(calculations.grossTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tax</span>
                <span className="text-amber-400">
                  +{formatCurrency(calculations.totalTax)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Service Charge</span>
                <span className="text-amber-400">
                  +{formatCurrency(calculations.totalService)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Discount</span>
                <span className="text-emerald-400">
                  -{formatCurrency(calculations.totalDiscount)}
                </span>
              </div>
              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Grand Total</span>
                  <span className="text-accent-400">
                    {formatCurrency(calculations.grandTotal)}
                  </span>
                </div>
              </div>
              {calculations.totalProfit > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Est. Profit</span>
                  <span className="text-emerald-400">
                    {formatCurrency(calculations.totalProfit)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map((pm) => {
                  const Icon = pm.icon;
                  return (
                    <button
                      key={pm.value}
                      onClick={() => setSelectedPayment(pm.value)}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border-2 transition-all text-left ${
                        selectedPayment === pm.value
                          ? "border-primary-500 bg-primary-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Icon className="h-4 w-4 text-gray-500" />
                      <span className="text-xs font-medium">{pm.label}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Staff Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Assign Staff
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
              >
                <option value="">Select Staff Member</option>
                {staffList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.rate}% commission)
                  </option>
                ))}
              </select>
              {commission > 0 && (
                <div className="flex justify-between text-sm p-2 bg-emerald-50 rounded-lg">
                  <span className="text-emerald-700">Commission</span>
                  <span className="font-medium text-emerald-700">
                    {formatCurrency(commission)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Add any notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              className="w-full bg-primary-600 hover:bg-primary-700 h-12 text-base font-semibold"
              disabled={cart.length === 0 || !customerName}
            >
              <Save className="h-5 w-5 mr-2" />
              Save Sale
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-10">
                <Printer className="h-4 w-4 mr-1" />
                Invoice
              </Button>
              <Button variant="outline" className="h-10">
                <Receipt className="h-4 w-4 mr-1" />
                Receipt
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
