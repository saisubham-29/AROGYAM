"use client";
import { useEffect, useState } from "react";

const roleLabels: Record<string, string> = {
  care_manager: "Care Manager",
  parent: "Parent / Caregiver",
  child: "Patient (Read-only)",
};

const roleColors: Record<string, string> = {
  care_manager: "bg-[#d6e3ff] text-[#00468c]",
  parent: "bg-[#bcece5] text-[#204e4a]",
  child: "bg-[#e1dfff] text-[#414273]",
};

export default function UserProfile() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("name") || "User";
    const role = localStorage.getItem("role") || "child";
    setUser({ name, role });
  }, []);

  if (!user) return null;

  const initials = user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="p-4 border-t border-slate-200/30">
      <div className="flex items-center gap-3 px-3 py-3 bg-white rounded-xl shadow-sm">
        <div className="w-9 h-9 rounded-full bg-[#00478d] flex items-center justify-center text-white text-xs font-bold shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#1a1c1d] truncate" style={{ fontFamily: "Manrope, sans-serif" }}>{user.name}</p>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${roleColors[user.role] || roleColors.child}`}>
            {roleLabels[user.role] || user.role}
          </span>
        </div>
      </div>
    </div>
  );
}
