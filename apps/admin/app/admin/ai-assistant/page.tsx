"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, BarChart3, FileText, TrendingUp, Receipt, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

const quickActions = [
  { label: "Aaj ki sales?", icon: Receipt },
  { label: "Monthly profit?", icon: TrendingUp },
  { label: "Pending bookings?", icon: FileText },
  { label: "Staff performance?", icon: BarChart3 },
];

const mockResponses: Record<string, string> = {
  "aaj ki sales?":
    "Aaj ki total sales **Rs. 245,000** hain. Is mein se:\n\n- **Flights**: Rs. 95,000 (4 bookings)\n- **Umrah Packages**: Rs. 100,000 (1 booking)\n- **Hotels**: Rs. 32,000 (1 booking)\n- **Visa**: Rs. 18,000 (2 bookings)\n\nKal ke muqable mein 12.5% zyada hai.",
  "monthly profit?":
    "Is month ka profit **Rs. 420,000** hai. Revenue **Rs. 1,850,000** aur total costs **Rs. 1,430,000** rahe hain.\n\nTop profit sources:\n1. Umrah Packages - Rs. 180,000\n2. Flights - Rs. 120,000\n3. Holiday Packages - Rs. 85,000\n4. Visa Services - Rs. 35,000",
  "pending bookings?":
    "Total **18 pending bookings** hain:\n\n- **Payment Pending**: 7 bookings\n- **Confirmation Pending**: 8 bookings\n- **Ticket Upload Pending**: 3 bookings\n\nSab se zyada pending Umrah bookings (6) hain. Aap inhe confirm karne ki koshish karein.",
  "staff performance?":
    "Is month ki staff performance:\n\n1. **Ahmed Khan** - 25 sales, Rs. 2.5M revenue, Rs. 25K commission\n2. **Fatima Ali** - 19 sales, Rs. 1.9M revenue, Rs. 19K commission\n3. **Zain Malik** - 17 sales, Rs. 1.7M revenue, Rs. 17K commission\n4. **Ayesha Siddiqui** - 15 sales, Rs. 1.5M revenue\n5. **Omar Farooq** - 12 sales, Rs. 1.2M revenue\n\nAhmed Khan sab se aage hain!",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const [key, value] of Object.entries(mockResponses)) {
    if (lower.includes(key)) return value;
  }
  if (lower.includes("sale") || lower.includes("revenue")) {
    return `Aapki sales inquiry ka jawab:\n\n**Aaj**: ${formatCurrency(245000)}\n**Is Hafta**: ${formatCurrency(1450000)}\n**Is Mahina**: ${formatCurrency(1850000)}\n\nSab se zyada sales Umrah packages se aa rahi hain.`;
  }
  if (lower.includes("profit") || lower.includes("munafa")) {
    return `Profit summary:\n\n**Aaj**: ${formatCurrency(52000)}\n**Is Mahina**: ${formatCurrency(420000)}\n\nProfit margin **22.7%** hai jo acha hai.`;
  }
  if (lower.includes("booking") || lower.includes("ticket")) {
    return `Bookings status:\n\n**Total Active**: 42\n**Confirmed**: 24\n**Pending**: 18\n**Cancelled**: 3\n\nKoi specific booking dekhni hai?`;
  }
  if (lower.includes("customer") || lower.includes("client")) {
    return `Customer summary:\n\n**Total Customers**: 1,250\n**Active**: 180\n**New (is mahina)**: 45\n**Dues**: ${formatCurrency(320000)}\n\nTop customer: Muhammad Ali (Rs. 450,000 total spent)`;
  }
  if (lower.includes("report") || lower.includes("pdf")) {
    return `Main aapke liye report generate kar sakta hoon. Konsi report chahiye?\n\n1. **Daily Sales Report**\n2. **Monthly Profit Report**\n3. **Staff Performance Report**\n4. **Booking Summary Report**\n\nReport type batain aur main usay PDF format mein taiyaar kar dunga.`;
  }
  return `Assalamualaikum! Main aapki kis tarah madad kar sakta hoon?\n\nMain yeh cheezein kar sakta hoon:\n- Sales aur profit dekhna\n- Bookings check karna\n- Staff performance\n- Customer details\n- Reports generate karna\n\nKoi bhi sawal poochain!`;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content:
        "Assalamualaikum! I'm your Madni Travel AI assistant. How can I help you today?\n\nYou can ask me about:\n- Daily/Monthly Sales\n- Profit & Revenue\n- Pending Bookings\n- Staff Performance\n- Customer Details\n- Generate Reports",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: "model",
        content: getAIResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 800 + Math.random() * 700);
  };

  const formatContent = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="text-primary-700">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bot className="h-7 w-7 text-violet-500" />
            AI Assistant
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Powered by Google Gemini AI
          </p>
        </div>
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
          <Sparkles className="h-3 w-3 mr-1" />
          Online
        </Badge>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 flex flex-col p-0">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === "user"
                      ? "bg-primary-600"
                      : "bg-violet-500"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Sparkles className="h-4 w-4 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-primary-600 text-white rounded-tr-sm"
                      : "bg-gray-100 text-gray-800 rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{formatContent(msg.content)}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      msg.role === "user" ? "text-primary-200" : "text-gray-400"
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-white animate-spin" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((qa) => {
                  const Icon = qa.icon;
                  return (
                    <button
                      key={qa.label}
                      onClick={() => sendMessage(qa.label)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-primary-50 hover:text-primary-700 text-sm transition-colors"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {qa.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                placeholder="Type your question in English or Urdu..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                className="flex-1"
              />
              <Button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="bg-violet-600 hover:bg-violet-700"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
