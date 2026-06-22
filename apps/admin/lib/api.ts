const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// Dashboard
export const getDashboardStats = () => fetcher("/dashboard/stats");
export const getMonthlyRevenue = () => fetcher("/dashboard/revenue");
export const getMonthlyProfit = () => fetcher("/dashboard/profit");
export const getTopPackages = () => fetcher("/dashboard/top-packages");
export const getTopStaff = () => fetcher("/dashboard/top-staff");
export const getPaymentMethodSummary = () => fetcher("/dashboard/payment-methods");
export const getRecentBookings = () => fetcher("/dashboard/recent-bookings");
export const getAIInsight = () => fetcher("/dashboard/ai-insight");

// POS
export const createSale = (data: unknown) =>
  fetcher("/pos", { method: "POST", body: JSON.stringify(data) });

// Bookings
export const getBookings = (params?: string) => fetcher(`/bookings${params || ""}`);
export const getBooking = (id: string) => fetcher(`/bookings/${id}`);
export const updateBooking = (id: string, data: unknown) =>
  fetcher(`/bookings/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const confirmBooking = (id: string) =>
  fetcher(`/bookings/${id}/confirm`, { method: "POST" });
export const cancelBooking = (id: string) =>
  fetcher(`/bookings/${id}/cancel`, { method: "POST" });

// Customers
export const getCustomers = () => fetcher("/customers");
export const getCustomer = (id: string) => fetcher(`/customers/${id}`);
export const createCustomer = (data: unknown) =>
  fetcher("/customers", { method: "POST", body: JSON.stringify(data) });

// Staff
export const getStaff = () => fetcher("/staff");
export const getStaffMember = (id: string) => fetcher(`/staff/${id}`);
export const createStaff = (data: unknown) =>
  fetcher("/staff", { method: "POST", body: JSON.stringify(data) });
export const updateStaff = (id: string, data: unknown) =>
  fetcher(`/staff/${id}`, { method: "PATCH", body: JSON.stringify(data) });

// Suppliers
export const getSuppliers = () => fetcher("/suppliers");
export const getSupplier = (id: string) => fetcher(`/suppliers/${id}`);
export const createSupplier = (data: unknown) =>
  fetcher("/suppliers", { method: "POST", body: JSON.stringify(data) });
export const updateSupplier = (id: string, data: unknown) =>
  fetcher(`/suppliers/${id}`, { method: "PATCH", body: JSON.stringify(data) });

// Expenses
export const getExpenses = () => fetcher("/expenses");
export const createExpense = (data: unknown) =>
  fetcher("/expenses", { method: "POST", body: JSON.stringify(data) });

// Cash Ledger
export const getCashLedger = () => fetcher("/cash-ledger");
export const createLedgerEntry = (data: unknown) =>
  fetcher("/cash-ledger", { method: "POST", body: JSON.stringify(data) });

// Refunds
export const getRefunds = () => fetcher("/refunds");
export const createRefund = (data: unknown) =>
  fetcher("/refunds", { method: "POST", body: JSON.stringify(data) });
export const processRefund = (id: string) =>
  fetcher(`/refunds/${id}/process`, { method: "POST" });

// Reports
export const getSalesReport = (params?: string) => fetcher(`/reports/sales${params || ""}`);
export const getProfitReport = (params?: string) => fetcher(`/reports/profit${params || ""}`);
export const getStaffReport = (params?: string) => fetcher(`/reports/staff${params || ""}`);

// SEO
export const getSEOPages = () => fetcher("/seo");
export const getSEOPage = (id: string) => fetcher(`/seo/${id}`);
export const updateSEOPage = (id: string, data: unknown) =>
  fetcher(`/seo/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const getRedirects = () => fetcher("/seo/redirects");
export const createRedirect = (data: unknown) =>
  fetcher("/seo/redirects", { method: "POST", body: JSON.stringify(data) });
export const deleteRedirect = (id: string) =>
  fetcher(`/seo/redirects/${id}`, { method: "DELETE" });
export const generateSitemap = () => fetcher("/seo/sitemap", { method: "POST" });

// Homepage Sections
export const getHomepageSections = () => fetcher("/homepage-sections");
export const getHomepageSection = (id: string) => fetcher(`/homepage-sections/${id}`);
export const updateHomepageSection = (id: string, data: unknown) =>
  fetcher(`/homepage-sections/${id}`, { method: "PATCH", body: JSON.stringify(data) });

// Media
export const getMedia = () => fetcher("/media");
export const uploadMedia = (formData: FormData) =>
  fetcher("/media/upload", { method: "POST", body: formData });

// Packages
export const getPackages = () => fetcher("/packages");
export const getPackage = (id: string) => fetcher(`/packages/${id}`);
export const createPackage = (data: unknown) =>
  fetcher("/packages", { method: "POST", body: JSON.stringify(data) });
export const updatePackage = (id: string, data: unknown) =>
  fetcher(`/packages/${id}`, { method: "PATCH", body: JSON.stringify(data) });

// Umrah
export const getUmrahPackages = () => fetcher("/umrah");
export const getUmrahPackage = (id: string) => fetcher(`/umrah/${id}`);
export const createUmrahPackage = (data: unknown) =>
  fetcher("/umrah", { method: "POST", body: JSON.stringify(data) });
export const updateUmrahPackage = (id: string, data: unknown) =>
  fetcher(`/umrah/${id}`, { method: "PATCH", body: JSON.stringify(data) });

// Visa
export const getVisaServices = () => fetcher("/visa");
export const getVisaService = (id: string) => fetcher(`/visa/${id}`);
export const createVisaService = (data: unknown) =>
  fetcher("/visa", { method: "POST", body: JSON.stringify(data) });
export const updateVisaService = (id: string, data: unknown) =>
  fetcher(`/visa/${id}`, { method: "PATCH", body: JSON.stringify(data) });

// Blog
export const getBlogPosts = () => fetcher("/blog");
export const getBlogPost = (id: string) => fetcher(`/blog/${id}`);
export const createBlogPost = (data: unknown) =>
  fetcher("/blog", { method: "POST", body: JSON.stringify(data) });
export const updateBlogPost = (id: string, data: unknown) =>
  fetcher(`/blog/${id}`, { method: "PATCH", body: JSON.stringify(data) });

// Coupons
export const getCoupons = () => fetcher("/coupons");
export const createCoupon = (data: unknown) =>
  fetcher("/coupons", { method: "POST", body: JSON.stringify(data) });

// Settings
export const getPaymentGateways = () => fetcher("/settings/payments");
export const updatePaymentGateway = (id: string, data: unknown) =>
  fetcher(`/settings/payments/${id}`, { method: "PATCH", body: JSON.stringify(data) });

export const getWhatsAppSettings = () => fetcher("/settings/whatsapp");
export const updateWhatsAppSettings = (data: unknown) =>
  fetcher("/settings/whatsapp", { method: "PATCH", body: JSON.stringify(data) });
export const testWhatsApp = (data: unknown) =>
  fetcher("/settings/whatsapp/test", { method: "POST", body: JSON.stringify(data) });

export const getSMTPSettings = () => fetcher("/settings/smtp");
export const updateSMTPSettings = (data: unknown) =>
  fetcher("/settings/smtp", { method: "PATCH", body: JSON.stringify(data) });
export const testSMTP = (data: unknown) =>
  fetcher("/settings/smtp/test", { method: "POST", body: JSON.stringify(data) });

export const getGeminiSettings = () => fetcher("/settings/gemini");
export const updateGeminiSettings = (data: unknown) =>
  fetcher("/settings/gemini", { method: "PATCH", body: JSON.stringify(data) });
export const testGemini = (data: unknown) =>
  fetcher("/settings/gemini/test", { method: "POST", body: JSON.stringify(data) });

export const getFlightAPISettings = () => fetcher("/settings/flight-api");
export const updateFlightAPISettings = (data: unknown) =>
  fetcher("/settings/flight-api", { method: "PATCH", body: JSON.stringify(data) });

// Company Settings
export const getCompanySettings = () => fetcher("/company");
export const updateCompanySettings = (data: unknown) =>
  fetcher("/company", { method: "PATCH", body: JSON.stringify(data) });

// Audit Logs
export const getAuditLogs = () => fetcher("/audit-logs");

// AI Chat
export const sendAIChat = (data: { message: string; history?: unknown[] }) =>
  fetcher("/ai/chat", { method: "POST", body: JSON.stringify(data) });

// Manual Ticket
export const createManualTicket = (data: unknown) =>
  fetcher("/manual-ticket", { method: "POST", body: JSON.stringify(data) });
