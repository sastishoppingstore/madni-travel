"use client";

import { ClipboardList, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { mockAuditLogs } from "@/lib/data";

export default function AuditLogsPage() {
  const getActionBadge = (action: string) => {
    switch (action) {
      case "CREATE": return <Badge variant="success">{action}</Badge>;
      case "UPDATE": return <Badge variant="info">{action}</Badge>;
      case "DELETE": return <Badge variant="destructive">{action}</Badge>;
      case "CONFIRM": return <Badge variant="default">{action}</Badge>;
      default: return <Badge>{action}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ClipboardList className="h-7 w-7 text-primary-600" /> Audit Logs
        </h1>
        <p className="text-sm text-gray-500 mt-1">Track all system activities</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium">Time</th>
                  <th className="text-left py-3 px-4 font-medium">User</th>
                  <th className="text-left py-3 px-4 font-medium">Action</th>
                  <th className="text-left py-3 px-4 font-medium">Entity</th>
                  <th className="text-left py-3 px-4 font-medium">Entity ID</th>
                  <th className="text-left py-3 px-4 font-medium">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {mockAuditLogs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4 text-gray-500 text-xs">{formatDate(log.createdAt)}</td>
                    <td className="py-3 px-4 font-medium">{log.userId ? `User #${log.userId}` : "System"}</td>
                    <td className="py-3 px-4">{getActionBadge(log.action)}</td>
                    <td className="py-3 px-4 text-gray-600">{log.entity}</td>
                    <td className="py-3 px-4 font-mono text-xs text-primary-600">{log.entityId}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{log.ipAddress}</td>
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
