"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";

type Alert = { _id: string; patientName: string; type: string; message: string; createdAt: string };
type HealthRecord = { _id: string; heartRate: number; oxygenLevel: number; systolic: number; diastolic: number; createdAt: string };

export default function ParentDashboard() {
  const router = useRouter();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [latest, setLatest] = useState<HealthRecord | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) return router.push("/");
    if (role !== "parent") return router.push("/dashboard");

    const headers = { Authorization: `Bearer ${token}` };
    fetch("/api/alerts", { headers }).then(r => r.ok && r.json()).then(d => d && setAlerts(d));
    // Load latest record for first patient
    fetch("/api/patient/p001", { headers }).then(r => r.ok && r.json()).then(d => d?.length && setLatest(d[0]));
  }, []);

  return (
    <div className="bg-[#faf9fb] text-[#1a1c1d] min-h-screen">
      <TopNav activeTab="dashboard" />
      <SideNav activeItem="vitals" />

      <main className="lg:ml-64 pt-24 px-6 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto">

          <header className="mb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-[#396661] font-bold text-xs uppercase tracking-widest mb-2 block">Executive Overview</span>
                <h1 className="text-4xl font-extrabold text-[#1a1c1d] tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Parent Dashboard</h1>
                <p className="text-[#424752] mt-2 text-lg">Monitoring your loved one&apos;s health in real-time.</p>
              </div>
              <button onClick={() => alert("🚨 Emergency alert dispatched to care team!")}
                className="relative overflow-hidden bg-gradient-to-br from-[#ba1a1a] to-[#801010] text-white px-10 py-5 rounded-2xl shadow-2xl flex items-center gap-4 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>emergency_home</span>
                <div className="text-left">
                  <div className="font-extrabold text-xl leading-none" style={{ fontFamily: "Manrope, sans-serif" }}>EMERGENCY</div>
                  <div className="text-xs opacity-80">Dispatch Medical Team</div>
                </div>
              </button>
            </div>
          </header>

          {/* Vitals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            <div className="md:col-span-2 bg-white p-8 rounded-[1.5rem] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 bg-[#396661] text-white px-3 py-1 rounded-full w-fit mb-6 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#bcece5] animate-pulse" /> LIVE
                </div>
                <h3 className="text-[#424752] text-sm font-semibold uppercase tracking-wider mb-2">Heart Rate</h3>
                <div className="flex items-baseline gap-3">
                  <span className={`text-7xl font-extrabold ${latest && (latest.heartRate < 50 || latest.heartRate > 110) ? "text-[#ba1a1a]" : "text-[#1a1c1d]"}`} style={{ fontFamily: "Manrope, sans-serif" }}>
                    {latest?.heartRate ?? "—"}
                  </span>
                  <span className="text-2xl font-semibold text-[#424752]">BPM</span>
                </div>
                <p className="mt-4 text-xs font-medium text-[#396661]">
                  {latest ? new Date(latest.createdAt).toLocaleString() : "No data recorded yet"}
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[1.5rem] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#bcece5] flex items-center justify-center text-[#3f6c67] mb-6">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>air</span>
                </div>
                <h3 className="text-[#424752] text-sm font-semibold uppercase tracking-wider mb-1">Oxygen Sat</h3>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-extrabold ${latest && latest.oxygenLevel < 92 ? "text-[#ba1a1a]" : "text-[#1a1c1d]"}`} style={{ fontFamily: "Manrope, sans-serif" }}>
                    {latest?.oxygenLevel ?? "—"}
                  </span>
                  <span className="text-lg font-semibold text-[#424752]">%</span>
                </div>
              </div>
              <div className="mt-6">
                <div className="w-full bg-[#eeedf0] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#396661] h-full" style={{ width: `${latest?.oxygenLevel ?? 0}%` }} />
                </div>
                <p className="text-[10px] mt-2 text-[#424752] font-semibold">
                  {latest ? (latest.oxygenLevel >= 95 ? "OPTIMAL RANGE" : "BELOW NORMAL") : "NO DATA"}
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[1.5rem] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#e1dfff] flex items-center justify-center text-[#151545] mb-6">
                  <span className="material-symbols-outlined text-2xl">speed</span>
                </div>
                <h3 className="text-[#424752] text-sm font-semibold uppercase tracking-wider mb-1">Blood Pressure</h3>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-extrabold ${latest && latest.systolic > 140 ? "text-[#ba1a1a]" : "text-[#1a1c1d]"}`} style={{ fontFamily: "Manrope, sans-serif" }}>
                    {latest ? `${latest.systolic}/${latest.diastolic}` : "—"}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${latest && latest.systolic > 140 ? "text-[#ba1a1a] bg-[#ffdad6]" : "text-[#204e4a] bg-[#bcece5]"}`}>
                  {latest ? (latest.systolic > 140 ? "HIGH" : "STABLE") : "NO DATA"}
                </span>
              </div>
            </div>
          </div>

          {/* Alert History */}
          <div className="bg-[#f4f3f5] rounded-[2rem] p-8">
            <h2 className="text-2xl font-bold text-[#1a1c1d] mb-8" style={{ fontFamily: "Manrope, sans-serif" }}>Alert History</h2>
            <div className="space-y-4">
              {alerts.length === 0 && <p className="text-slate-400 text-sm">No alerts — all vitals are normal ✓</p>}
              {alerts.slice(0, 5).map(a => (
                <div key={a._id} className="bg-white p-5 rounded-2xl flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${a.type === "critical" ? "bg-[#ffdad6] text-[#ba1a1a]" : a.type === "warning" ? "bg-[#d6e3ff] text-[#00478d]" : "bg-orange-100 text-orange-700"}`}>
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-[#1a1c1d]">{a.patientName} — <span className="capitalize">{a.type}</span></h4>
                      <span className="text-xs text-[#424752]">{new Date(a.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-[#424752]">{a.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
