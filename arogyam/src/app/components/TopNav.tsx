"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface TopNavProps {
  activeTab?: "dashboard" | "health-records" | "care-team" | "timeline";
}

export default function TopNav({ activeTab }: TopNavProps) {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("name") || "";
    const role = localStorage.getItem("role") || "";
    if (name) setUser({ name, role });
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.clear();
    router.push("/");
  }

  const navLinks = [
    { label: "Dashboard", href: "/dashboard", key: "dashboard" },
    { label: "Health Records", href: "/health-records", key: "health-records" },
    { label: "Care Team", href: "/care-team", key: "care-team" },
    { label: "Timeline", href: "/care-timeline", key: "timeline" },
  ];

  const initials = user?.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm" style={{ boxShadow: "0 1px 2px rgba(0,71,141,0.05)" }}>
      <div className="flex justify-between items-center h-16 px-6 w-full">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold bg-gradient-to-br from-blue-800 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: "Manrope, sans-serif" }}>
            Clinical Serenity
          </span>
          <nav className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <Link key={link.key} href={link.href}
                className={`font-semibold text-sm tracking-tight transition-colors ${activeTab === link.key ? "text-blue-700 border-b-2 border-blue-600 pb-1" : "text-slate-500 hover:text-blue-600"}`}
                style={{ fontFamily: "Manrope, sans-serif" }}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user?.role === "parent" && (
            <button onClick={() => alert("🚨 Emergency alert dispatched!")}
              className="px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 active:scale-95 transition-all bg-[#ba1a1a] text-white shadow-lg">
              <span className="material-symbols-outlined text-[18px]">emergency</span> Emergency Call
            </button>
          )}
          <button className="p-2 hover:bg-slate-50 rounded-lg transition-all active:scale-95">
            <span className="material-symbols-outlined text-[#424752]">notifications</span>
          </button>
          <button onClick={handleLogout} className="p-2 hover:bg-slate-50 rounded-lg transition-all active:scale-95" title="Logout">
            <span className="material-symbols-outlined text-[#424752]">logout</span>
          </button>
          <div className="w-9 h-9 rounded-full bg-[#00478d] flex items-center justify-center text-white text-xs font-bold">
            {initials}
          </div>
        </div>
      </div>
      <div className="bg-slate-100/50 h-[1px] w-full absolute bottom-0" />
    </header>
  );
}
