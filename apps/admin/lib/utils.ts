import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "PKR"): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function generateInvoiceNo(): string {
  const now = new Date();
  return `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

export function calculateSEOScore(data: {
  title?: string;
  description?: string;
  focusKeyword?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  schemaType?: string;
}): number {
  let score = 0;
  if (data.title && data.title.length >= 30 && data.title.length <= 60) score += 20;
  else if (data.title) score += 10;
  if (data.description && data.description.length >= 120 && data.description.length <= 160) score += 20;
  else if (data.description) score += 10;
  if (data.focusKeyword) score += 15;
  if (data.ogTitle && data.ogDescription) score += 15;
  if (data.ogImage) score += 10;
  if (data.canonicalUrl) score += 10;
  if (data.schemaType) score += 10;
  return Math.min(score, 100);
}

export function getSEOGrade(score: number): { grade: string; color: string } {
  if (score >= 80) return { grade: "A", color: "text-emerald-600" };
  if (score >= 60) return { grade: "B", color: "text-blue-600" };
  if (score >= 40) return { grade: "C", color: "text-amber-600" };
  return { grade: "D", color: "text-red-600" };
}
