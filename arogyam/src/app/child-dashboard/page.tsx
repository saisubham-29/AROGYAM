"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";

type HealthRecord = { _id: string; heartRate: number; oxygenLevel: number; systolic: number; diastolic: number; createdAt: string };

export default function ChildDashboard() {
  const router = useRouter();
  const [records, setRecords] = useState<HealthRecord[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) return router.push("/");
    if (role !== "child") return router.push("/dashboard");

    fetch("/api/patient/p001", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok && r.json()).then(d => d && setRecords(d));
  }, []);

  const latest = records[0];

  return (
    <div className="bg-[#faf9fb] text-[#1a1c1d] antialiased min-h-screen">
      <TopNav activeTab="dashboard" />
      <SideNav activeItem="vitals" />

      <main className="lg:ml-64 pt-24 p-6 lg:p-10 min-h-screen">
        <div className="max-w-6xl mx-auto space-y-12">

          <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-[#1a1c1d] tracking-tight mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>Health Overview</h2>
              <p className="text-[#424752] font-medium">Read-only view — latest recorded vitals.</p>
            </div>
            <div className="flex items-center gap-2 bg-[#bcece5] px-4 py-2 rounded-xl text-[#3f6c67]">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-sm font-semibold">View Only Access</span>
            </div>
          </section>

          {/* Vitals */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
                  <span className="material-symbols-outlined">favorite</span>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${latest && (latest.heartRate < 50 || latest.heartRate > 110) ? "bg-[#ffdad6] text-[#ba1a1a]" : "bg-[#bcece5] text-[#3f6c67]"}`}>
                  {latest ? (latest.heartRate < 50 || latest.heartRate > 110 ? "ALERT" : "STABLE") : "NO DATA"}
                </span>
              </div>
              <h3 className="text-[#424752] text-sm font-semibold mb-1">Heart Rate</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-[#1a1c1d]" style={{ fontFamily: "Manrope, sans-serif" }}>{latest?.heartRate ?? "—"}</span>
                <span className="text-[#424752] font-medium text-sm">BPM</span>
              </div>
              <p className="text-xs text-[#424752]">{latest ? new Date(latest.createdAt).toLocaleString() : "No records"}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#bcece5] flex items-center justify-center text-[#396661]">
                  <span className="material-symbols-outlined">air</span>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${latest && latest.oxygenLevel < 92 ? "bg-[#ffdad6] text-[#ba1a1a]" : "bg-[#bcece5] text-[#3f6c67]"}`}>
                  {latest ? (latest.oxygenLevel < 92 ? "CRITICAL" : "EXCELLENT") : "NO DATA"}
                </span>
              </div>
              <h3 className="text-[#424752] text-sm font-semibold mb-1">Oxygen Saturation</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-[#1a1c1d]" style={{ fontFamily: "Manrope, sans-serif" }}>{latest?.oxygenLevel ?? "—"}</span>
                <span className="text-[#424752] font-medium text-sm">% SpO2</span>
              </div>
              <div className="bg-[#f4f3f5] h-2 w-full rounded-full overflow-hidden">
                <div className="bg-[#396661] h-full" style={{ width: `${latest?.oxygenLevel ?? 0}%` }} />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#e1dfff] flex items-center justify-center text-[#414273]">
                  <span className="material-symbols-outlined">reorder</span>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${latest && latest.systolic > 140 ? "bg-[#ffdad6] text-[#ba1a1a]" : "bg-[#d6e3ff] text-[#00468c]"}`}>
                  {latest ? (latest.systolic > 140 ? "HIGH" : "NORMAL") : "NO DATA"}
                </span>
              </div>
              <h3 className="text-[#424752] text-sm font-semibold mb-1">Blood Pressure</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-[#1a1c1d]" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {latest ? `${latest.systolic}/${latest.diastolic}` : "—"}
                </span>
                <span className="text-[#424752] font-medium text-sm">mmHg</span>
              </div>
            </div>
          </section>

          {/* Recent Records */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>Recent Observations</h3>
            {records.length === 0 && <p className="text-slate-400 text-sm">No health records available yet.</p>}
            {records.slice(0, 5).map((r, i) => {
              const isAlert = r.heartRate < 50 || r.heartRate > 110 || r.oxygenLevel < 92 || r.systolic > 140;
              return (
                <div key={r._id} className={`flex items-center justify-between py-4 ${i < records.length - 1 ? "border-b border-[#eeedf0]" : ""}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${isAlert ? "bg-[#ba1a1a]" : "bg-[#396661]"}`} />
                    <div>
                      <p className="text-sm font-bold">{isAlert ? "⚠ Abnormal Vitals" : "Routine Check"}</p>
                      <p className="text-[10px] text-[#424752]">{new Date(r.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-6 text-sm font-semibold">
                    <div className="text-center"><span className="block text-[10px] text-[#424752] font-normal">HR</span>{r.heartRate}</div>
                    <div className="text-center"><span className="block text-[10px] text-[#424752] font-normal">SpO2</span>{r.oxygenLevel}%</div>
                    <div className="text-center"><span className="block text-[10px] text-[#424752] font-normal">BP</span>{r.systolic}/{r.diastolic}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
