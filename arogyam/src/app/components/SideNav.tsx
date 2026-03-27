"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserProfile from "./UserProfile";

interface SideNavProps {
  activeItem?: "vitals" | "medication" | "activity" | "alerts" | "security" | "care-team";
  patientName?: string;
  patientStatus?: string;
}

export default function SideNav({ activeItem = "vitals", patientName = "Select a Patient", patientStatus = "Stable" }: SideNavProps) {
  const router = useRouter();
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role") || "");
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.clear();
    router.push("/");
  }

  const navItems = [
    { key: "vitals", icon: "monitoring", label: "Vitals Monitoring", href: "/dashboard" },
    { key: "medication", icon: "pill", label: "Medication", href: "#" },
    { key: "activity", icon: "directions_run", label: "Activity Logs", href: "#" },
    { key: "alerts", icon: "warning", label: "Alert History", href: "#" },
    { key: "security", icon: "shield", label: "Security Settings", href: "/settings" },
    { key: "care-team", icon: "groups", label: "Care Team", href: "/care-team" },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 pt-16 flex-col border-r border-slate-200/50 bg-slate-50 hidden lg:flex">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#00478d] flex items-center justify-center text-white font-bold text-sm">
            {patientName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-bold text-[#1a1c1d]" style={{ fontFamily: "Manrope, sans-serif" }}>{patientName}</p>
            <p className="text-xs text-[#396661] font-medium">{patientStatus}</p>
          </div>
        </div>
        {role === "care_manager" && (
          <button className="w-full bg-[#bcece5] text-[#3f6c67] py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 mb-6 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-sm">add</span> Add Medical Note
          </button>
        )}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-r-full text-sm transition-all ${activeItem === item.key ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-600 hover:pl-5 hover:bg-blue-50/50"}`}>
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto">
        <UserProfile />
        <div className="p-4 border-t border-slate-200/30 space-y-1">
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-[#00478d] transition-colors text-xs">
            <span className="material-symbols-outlined text-lg">help</span> Support
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-[#ba1a1a] transition-colors text-xs w-full">
            <span className="material-symbols-outlined text-lg">logout</span> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
