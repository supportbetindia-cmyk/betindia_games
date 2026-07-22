import type { Metadata } from "next";
import Link from "next/link";
import {
  Users, Activity, ArrowDownCircle, ArrowUpCircle,
  Gift, FileText, TrendingUp, Plus, Settings, AlertCircle,
} from "lucide-react";
import SyncCmsButton from "@/components/admin/SyncCmsButton";

export const metadata: Metadata = { title: "Dashboard — BetIndia Admin" };

// ─── Sparkline ────────────────────────────────────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const W = 80; const H = 28;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * (H - 2) + 1}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-7 w-20" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Area chart ───────────────────────────────────────────────────────────────
function AreaChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const W = 100; const H = 60;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - (v / max) * (H - 4) + 2}`);
  const line = pts.join(" ");
  const area = `0,${H} ${line} ${W},${H}`;
  const gradId = `grad-${color.replace("#", "")}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${gradId})`} />
      <polyline points={line} fill="none" stroke={color} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const STATS = [
  {
    label: "Total Users",       value: "12,840", delta: "+248",  up: true,
    icon: Users,                color: "#FF6B00",
    spark: [40, 55, 48, 62, 58, 70, 75, 80, 88, 95],
  },
  {
    label: "Active Sessions",   value: "1,204",  delta: "Live",   up: true,
    icon: Activity,             color: "#138808",
    spark: [30, 45, 40, 60, 55, 72, 68, 80, 74, 90],
  },
  {
    label: "Deposits Today",    value: "₹4.8L",  delta: "+18%",  up: true,
    icon: ArrowDownCircle,      color: "#138808",
    spark: [50, 42, 65, 58, 70, 66, 80, 75, 88, 92],
  },
  {
    label: "Withdrawals Today", value: "₹2.1L",  delta: "-4%",   up: false,
    icon: ArrowUpCircle,        color: "#FF6B00",
    spark: [60, 58, 55, 62, 50, 48, 52, 45, 40, 38],
  },
  {
    label: "Revenue (MTD)",     value: "₹38.4L", delta: "+12%",  up: true,
    icon: TrendingUp,           color: "#FF6B00",
    spark: [30, 35, 42, 40, 55, 58, 62, 68, 72, 80],
  },
  {
    label: "Active Promotions", value: "4",      delta: "0 new", up: true,
    icon: Gift,                 color: "#138808",
    spark: [4, 4, 5, 4, 4, 5, 5, 4, 4, 4],
  },
] as const;

const REVENUE_DATA = [28, 34, 30, 42, 38, 50, 46, 60, 55, 68, 62, 74, 70, 84, 78, 92, 88, 96, 90, 100, 94, 108, 102, 116, 110, 120, 115, 130, 122, 138];

const RECENT = [
  { user: "Rahul S.",   type: "Deposit",      amount: "₹5,000",  status: "Completed",  time: "2m ago"  },
  { user: "Priya K.",   type: "Withdrawal",   amount: "₹12,000", status: "Pending",    time: "5m ago"  },
  { user: "Amit V.",    type: "Registration", amount: "—",        status: "KYC Needed", time: "9m ago"  },
  { user: "Neha T.",    type: "Withdrawal",   amount: "₹8,000",  status: "Completed",  time: "18m ago" },
  { user: "Suresh M.",  type: "Deposit",      amount: "₹15,000", status: "Completed",  time: "25m ago" },
  { user: "Kavita S.",  type: "Registration", amount: "—",        status: "Active",     time: "32m ago" },
  { user: "Dev P.",     type: "Deposit",      amount: "₹3,000",  status: "Pending",    time: "44m ago" },
] as const;

const STATUS_COLOR: Record<string, { color: string; bg: string }> = {
  Completed:  { color: "#138808", bg: "#13880820" },
  Pending:    { color: "#FF6B00", bg: "#FF6B0020" },
  "KYC Needed":{ color: "#3b82f6", bg: "#3b82f620" },
  Active:     { color: "#138808", bg: "#13880820" },
};

const QUICK_ACTIONS = [
  { label: "Add Promotion",     href: "/admin/promotions", icon: Plus,      color: "#FF6B00" },
  { label: "Create Article",    href: "/admin/content",    icon: FileText,  color: "#138808" },
  { label: "View Users",        href: "/admin/users",      icon: Users,     color: "#FF6B00" },
  { label: "Platform Settings", href: "/admin/settings",   icon: Settings,  color: "#138808" },
] as const;

const ALERTS = [
  { text: "12 withdrawals awaiting review",    type: "warning" },
  { text: "3 KYC submissions need approval",   type: "info"    },
  { text: "Promo 'Weekend Reload' ends in 2d", type: "notice"  },
] as const;

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Dashboard</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Platform overview · June 19, 2026
          </p>
        </div>
        <Link
          href="/admin/content"
          className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#FF8A00]"
        >
          <Plus size={15} strokeWidth={2.5} />
          Manage Content
        </Link>
      </div>

      {/* Alerts Banner */}
    

      {/* Stats Grid */}
      

      {/* Revenue & Quick Actions Row */}
  
      {/* Recent Operations */}
      
      <SyncCmsButton />
    </div>
  );
}
