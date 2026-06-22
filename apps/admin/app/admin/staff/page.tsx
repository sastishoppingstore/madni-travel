"use client";

import { useState } from "react";
import { UserCog, Search, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { mockStaff } from "@/lib/data";

export default function StaffPage() {
  const [search, setSearch] = useState("");
  const filtered = mockStaff.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.department.toLowerCase().includes(search.toLowerCase()));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE": return <Badge variant="success">{status}</Badge>;
      case "ON_LEAVE": return <Badge variant="warning">{status}</Badge>;
      case "INACTIVE": return <Badge variant="destructive">{status}</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "MANAGER": return <Badge variant="default">{role}</Badge>;
      case "SUPERVISOR": return <Badge variant="info">{role}</Badge>;
      default: return <Badge variant="secondary">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <UserCog className="h-7 w-7 text-primary-600" /> Staff / Workers
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage staff members and agents</p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700"><Plus className="h-4 w-4 mr-1" /> Add Staff</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search staff..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="text-left py-3 px-4 font-medium">Department</th>
                  <th className="text-left py-3 px-4 font-medium">Contact</th>
                  <th className="text-right py-3 px-4 font-medium">Salary</th>
                  <th className="text-right py-3 px-4 font-medium">Commission</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                          {s.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{getRoleBadge(s.role)}</td>
                    <td className="py-3 px-4 text-gray-600">{s.department}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{s.phone}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(s.salary)}</td>
                    <td className="py-3 px-4 text-right text-primary-600">{s.commissionRate}%</td>
                    <td className="py-3 px-4">{getStatusBadge(s.status)}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{formatDate(s.joinDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
