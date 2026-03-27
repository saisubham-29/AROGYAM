"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Dashboard acts as a role-based router
export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) return router.push("/");

    if (role === "care_manager") router.replace("/care-manager");
    else if (role === "parent") router.replace("/parent-dashboard");
    else if (role === "child") router.replace("/child-dashboard");
    else router.push("/");
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9fb] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="w-8 h-8 border-4 border-[#00478d]/30 border-t-[#00478d] rounded-full animate-spin" />
        <p className="text-[#424752] text-sm font-medium">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
