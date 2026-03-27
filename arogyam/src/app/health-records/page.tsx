"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";

type HealthRecord = { _id: string; patientName: string; patientId: string; heartRate: number; oxygenLevel: number; systolic: number; diastolic: number; recordedBy: string; createdAt: string };

export default function HealthRecords() {
  const router = useRouter();
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/");
    fetch("/api/health", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok && r.json()).then(d => d && setRecords(d));
  }, []);

  const filtered = filter ? records.filter(r => r.patientName.toLowerCase().includes(filter.toLowerCase())) : records;

  function getParamColor(r: HealthRecord) {
    if (r.heartRate < 50 || r.heartRate > 110 || r.oxygenLevel < 92 || r.systolic > 140) return "bg-[#ffdad6] text-[#ba1a1a]";
    return "bg-[#bcece5]/20 text-[#3f6c67]";
  }

  return (
    <div className="bg-[#faf9fb] text-[#1a1c1d] min-h-screen">
      <TopNav activeTab="health-records" />
      <SideNav activeItem="vitals" />

      <main className="lg:pl-64 pt-24 min-h-screen">
        <div className="max-w-7xl mx-auto p-6 lg:p-10">
          <header className="mb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-bold text-3xl text-[#1a1c1d] tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Health Records</h1>
                <p className="text-[#424752] mt-2">All recorded vitals from MongoDB — {records.length} total entries</p>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white p-6 rounded-3xl shadow-sm">
                <p className="text-[#424752] text-xs font-medium">Avg. Heart Rate</p>
                <h3 className="text-2xl font-bold mt-1" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {records.length ? Math.round(records.reduce((s, r) => s + r.heartRate, 0) / records.length) : "—"} <span className="text-sm font-medium text-[#424752]">BPM</span>
                </h3>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm">
                <p className="text-[#424752] text-xs font-medium">Avg. SpO2</p>
                <h3 className="text-2xl font-bold mt-1" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {records.length ? (records.reduce((s, r) => s + r.oxygenLevel, 0) / records.length).toFixed(1) : "—"} <span className="text-sm font-medium text-[#424752]">%</span>
                </h3>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm">
                <p className="text-[#424752] text-xs font-medium">Alert Records</p>
                <h3 className="text-2xl font-bold mt-1 text-[#ba1a1a]" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {records.filter(r => r.heartRate < 50 || r.heartRate > 110 || r.oxygenLevel < 92 || r.systolic > 140).length}
                </h3>
              </div>
            </div>
          </header>

          {/* Filter */}
          <div className="bg-[#f4f3f5] p-4 rounded-2xl mb-6">
            <input value={filter} onChange={e => setFilter(e.target.value)}
              className="w-full md:w-72 bg-white rounded-xl py-3 px-4 text-sm outline-none"
              placeholder="Filter by patient name..." />
          </div>

          {/* Table */}
          <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f4f3f5]/50">
                    {["Timestamp", "Patient", "Heart Rate", "SpO2", "Blood Pressure", "Status"].map(h => (
                      <th key={h} className="px-6 py-5 text-[11px] font-bold text-[#424752] uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c2c6d4]/10">
                  {filtered.length === 0 && (
                    <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-400 text-sm">No records found.</td></tr>
                  )}
                  {filtered.slice(0, 20).map(r => {
                    const isAlert = r.heartRate < 50 || r.heartRate > 110 || r.oxygenLevel < 92 || r.systolic > 140;
                    return (
                      <tr key={r._id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold block">{new Date(r.createdAt).toLocaleDateString()}</span>
                          <span className="text-[11px] text-[#424752]">{new Date(r.createdAt).toLocaleTimeString()}</span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-sm">{r.patientName}</td>
                        <td className={`px-6 py-4 font-bold text-lg ${(r.heartRate < 50 || r.heartRate > 110) ? "text-[#ba1a1a]" : "text-[#1a1c1d]"}`}>
                          {r.heartRate} <span className="text-xs text-[#424752] font-normal">BPM</span>
                        </td>
                        <td className={`px-6 py-4 font-bold text-lg ${r.oxygenLevel < 92 ? "text-[#ba1a1a]" : "text-[#1a1c1d]"}`}>
                          {r.oxygenLevel}<span className="text-xs text-[#424752] font-normal">%</span>
                        </td>
                        <td className={`px-6 py-4 font-bold text-lg ${r.systolic > 140 ? "text-[#ba1a1a]" : "text-[#1a1c1d]"}`}>
                          {r.systolic}/{r.diastolic} <span className="text-xs text-[#424752] font-normal">mmHg</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full ${getParamColor(r)}`}>
                            {isAlert ? "⚠ Alert" : "✓ Normal"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-[#f4f3f5]/30">
              <p className="text-xs text-[#424752]">Showing {Math.min(20, filtered.length)} of {filtered.length} entries</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
