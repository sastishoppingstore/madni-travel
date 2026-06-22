"use client";

import { useState } from "react";
import { TicketCheck, Plane, Save, Check, User, Phone, CalendarDays, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function ManualTicketPage() {
  const [saved, setSaved] = useState(false);
  const [ticket, setTicket] = useState({
    pnr: "", eTicketNo: "", airline: "", flightNo: "",
    fromCity: "", toCity: "", departureDate: "", arrivalDate: "",
    passengerName: "", passengerPhone: "", passportNo: "",
    classType: "ECONOMY", tripType: "ONE_WAY",
    baseFare: 0, taxes: 0, total: 0,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <TicketCheck className="h-7 w-7 text-primary-600" />
          Manual Ticket Entry
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manually enter flight ticket details</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Passenger Details</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Full Name</Label><Input className="mt-1" placeholder="Enter passenger name" /></div>
          <div><Label>Phone</Label><Input className="mt-1" placeholder="+92-300-XXXXXXX" /></div>
          <div><Label>Passport Number</Label><Input className="mt-1" placeholder="Passport No" /></div>
          <div><Label>Email</Label><Input className="mt-1" placeholder="email@example.com" /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Plane className="h-4 w-4" /> Flight Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><Label>PNR</Label><Input className="mt-1" placeholder="PNR Code" /></div>
            <div><Label>E-Ticket Number</Label><Input className="mt-1" placeholder="Ticket Number" /></div>
            <div><Label>Airline</Label>
              <select className="w-full h-10 mt-1 rounded-md border border-input bg-background px-3 text-sm">
                <option>PIA</option><option>Emirates</option><option>Qatar Airways</option><option>Etihad</option><option>Saudia</option><option>Turkish Airlines</option><option>Other</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><Label>Flight Number</Label><Input className="mt-1" placeholder="PK-301" /></div>
            <div><Label>From</Label><Input className="mt-1" placeholder="KHI" /></div>
            <div><Label>To</Label><Input className="mt-1" placeholder="DXB" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><Label>Departure Date</Label><Input type="datetime-local" className="mt-1" /></div>
            <div><Label>Arrival Date</Label><Input type="datetime-local" className="mt-1" /></div>
            <div><Label>Class</Label>
              <select className="w-full h-10 mt-1 rounded-md border border-input bg-background px-3 text-sm">
                <option>ECONOMY</option><option>BUSINESS</option><option>FIRST</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Pricing</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><Label>Base Fare (Rs.)</Label><Input type="number" className="mt-1" placeholder="0" /></div>
          <div><Label>Taxes (Rs.)</Label><Input type="number" className="mt-1" placeholder="0" /></div>
          <div><Label>Total (Rs.)</Label><Input type="number" className="mt-1" placeholder="0" /></div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
        <Button onClick={handleSave} className="bg-primary-600 hover:bg-primary-700">
          <Save className="h-4 w-4 mr-1" /> Save Ticket
        </Button>
        {saved && <span className="flex items-center gap-1 text-sm text-emerald-600"><Check className="h-4 w-4" /> Saved</span>}
      </div>
    </div>
  );
}
