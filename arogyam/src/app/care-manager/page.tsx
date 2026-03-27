"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";

type Patient = { _id: string; name: string; room: string; pid: string; initials: string };
type Alert = { _id: string; patientName: string; type: string; message: string; createdAt: string };
type HealthRecord = { _id: string; patientName: string; heartRate: number; oxygenLevel: number; systolic: number; diastolic: number; createdAt: string };

export default function CareManager() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selected, setSelected] = useState<Patient | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [form, setForm] = useState({ heartRate: "", oxygenLevel: "", bp: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function authHeader() {
    return { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" };
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) return router.push("/");
    if (role !== "care_manager") return router.push("/dashboard");
    loadPatients(token);
    loadAlerts(token);
  }, []);

  async function loadPatients(token: string) {
    const res = await fetch("/api/patients", { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) {
      const data = await res.json();
      setPatients(data);
      if (data.length > 0) { setSelected(data[0]); loadRecords(token, data[0].pid); }
    }
  }

  async function loadAlerts(token: string) {
    const res = await fetch("/api/alerts", { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setAlerts(await res.json());
  }

  async function loadRecords(token: string, patientId: string) {
    const res = await fetch(`/api/patient/${patientId}`, { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setRecords(await res.json());
  }

  function selectPatient(p: Patient) {
    setSelected(p);
    loadRecords(localStorage.getItem("token")!, p.pid);
  }

  async function submitHealth(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setLoading(true); setMsg("");
    const [systolic, diastolic] = form.bp.split("/").map(Number);
    const res = await fetch("/api/health", {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify({ patientId: selected.pid, patientName: selected.name, heartRate: Number(form.heartRate), oxygenLevel: Number(form.oxygenLevel), systolic, diastolic }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setMsg(`✓ Saved! ${data.alertsGenerated} alert(s) generated.`);
      setForm({ heartRate: "", oxygenLevel: "", bp: "" });
      loadAlerts(localStorage.getItem("token")!);
      loadRecords(localStorage.getItem("token")!, selected.pid);
    } else setMsg(data.error);
  }

  async function resolveAlert(id: string) {
    await fetch("/api/alerts", { method: "PATCH", headers: authHeader(), body: JSON.stringify({ id }) });
    loadAlerts(localStorage.getItem("token")!);
  }

  const latest = records[0];

  return (
    <div className="bg-[#faf9fb] text-[#1a1c1d] min-h-screen">
      <TopNav activeTab="dashboard" />
      <SideNav activeItem="vitals" patientName={selected?.name} patientStatus="Stable - Last checked 5m ago" />

      <main className="pt-24 lg:pl-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* Alerts */}
          <section className="mb-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-xl" style={{ fontFamily: "Manrope, sans-serif" }}>Active Critical Alerts</h2>
              {alerts.length > 0 && <span className="px-3 py-1 bg-[#ffdad6] text-[#93000a] rounded-full text-xs font-bold uppercase tracking-wider">{alerts.length} Active</span>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alerts.slice(0, 4).map(a => (
                <div key={a._id} className={`p-4 rounded-xl flex items-start gap-4 ${a.type === "critical" ? "bg-[#ffdad6]" : a.type === "warning" ? "bg-[#d6e3ff]" : "bg-orange-100"}`}>
                  <div className="p-2 rounded-lg bg-black/10">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{a.patientName} — <span className="capitalize">{a.type}</span></h4>
                    <p className="text-sm opacity-80">{a.message}</p>
                    <p className="text-xs opacity-50 mt-1">{new Date(a.createdAt).toLocaleString()}</p>
                  </div>
                  <button onClick={() => resolveAlert(a._id)} className="text-xs font-bold text-green-700 hover:underline shrink-0">Resolve</button>
                </div>
              ))}
              {alerts.length === 0 && <p className="text-slate-400 text-sm col-span-2">No active alerts ✓</p>}
            </div>
          </section>

          <div className="grid grid-cols-12 gap-6 items-start">
            {/* Patient List */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-[#f4f3f5] rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>Patient Directory</h3>
                <div className="space-y-3">
                  {patients.map(p => (
                    <div key={p._id} onClick={() => selectPatient(p)}
                      className={`p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all ${selected?._id === p._id ? "bg-white border-l-4 border-[#00478d] shadow-sm" : "hover:bg-[#eeedf0]"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-[#00478d] flex items-center justify-center text-white font-bold text-sm ${selected?._id !== p._id ? "opacity-50" : ""}`}>{p.initials}</div>
                        <div>
                          <h4 className="text-sm font-bold">{p.name}</h4>
                          <p className="text-[10px] text-[#424752] uppercase font-semibold">Room {p.room} • {p.pid}</p>
                        </div>
                      </div>
                      <span className={`material-symbols-outlined ${selected?._id === p._id ? "text-[#00478d]" : "text-[#c2c6d4]"}`}>chevron_right</span>
                    </div>
                  ))}
                  {patients.length === 0 && <p className="text-slate-400 text-sm">No patients. <a href="/api/seed" className="text-blue-600 underline">Seed data</a></p>}
                </div>
              </div>
            </div>

            {/* Patient Detail */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {selected && (
                <>
                  <div className="flex flex-col md:flex-row md:items-center justify-between bg-[#e3e2e4]/30 p-6 rounded-xl gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#00478d] flex items-center justify-center text-white font-bold text-2xl">{selected.initials}</div>
                      <div>
                        <h1 className="text-2xl font-bold" style={{ fontFamily: "Manrope, sans-serif" }}>{selected.name}</h1>
                        <p className="text-[#424752] text-sm">Room {selected.room} • {selected.pid}</p>
                      </div>
                    </div>
                  </div>

                  {/* Vital Entry Form */}
                  <div className="bg-white rounded-2xl p-8 border border-[#c2c6d4]/20">
                    <h3 className="font-bold text-xl mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>New Vital Sign Entry</h3>
                    {msg && <p className={`text-sm mb-4 ${msg.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>{msg}</p>}
                    <form onSubmit={submitHealth} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#424752]">Heart Rate (BPM)</label>
                        <input className="w-full bg-[#e8e8ea] rounded-lg py-4 px-4 text-2xl font-bold text-[#00478d] outline-none focus:ring-2 focus:ring-[#00478d]"
                          placeholder="72" type="number" value={form.heartRate} onChange={e => setForm({ ...form, heartRate: e.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#424752]">Oxygen (SpO2 %)</label>
                        <input className="w-full bg-[#e8e8ea] rounded-lg py-4 px-4 text-2xl font-bold text-[#396661] outline-none focus:ring-2 focus:ring-[#396661]"
                          placeholder="98" type="number" value={form.oxygenLevel} onChange={e => setForm({ ...form, oxygenLevel: e.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#424752]">Blood Pressure</label>
                        <input className="w-full bg-[#e8e8ea] rounded-lg py-4 px-4 text-2xl font-bold text-[#414273] outline-none focus:ring-2 focus:ring-[#414273]"
                          placeholder="120/80" type="text" value={form.bp} onChange={e => setForm({ ...form, bp: e.target.value })} required />
                      </div>
                      <div className="md:col-span-3 pt-4">
                        <button type="submit" disabled={loading}
                          className="bg-gradient-to-r from-[#00478d] to-[#005eb8] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 disabled:opacity-60">
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
                          {loading ? "Saving..." : "Record Health Data"}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#f4f3f5] p-6 rounded-2xl flex flex-col h-64">
                      <div className="flex items-center justify-between mb-6">
                        <div><h4 className="font-bold">Heart Rate Trend</h4><p className="text-[10px] text-[#424752]">Last {records.length} Records</p></div>
                        <span className="text-[#00478d] text-xl font-extrabold">{latest?.heartRate ?? "—"} <span className="text-xs">BPM</span></span>
                      </div>
                      <div className="flex-1 flex items-end justify-between gap-1 pb-2">
                        {(records.length > 0 ? records.slice(0, 12).reverse() : Array(12).fill(null)).map((r, i) => {
                          const hr = r?.heartRate ?? 70;
                          const pct = Math.min(100, Math.max(10, ((hr - 40) / 80) * 100));
                          return <div key={i} className={`w-full rounded-t-lg ${(hr < 50 || hr > 110) ? "bg-[#ba1a1a]" : "bg-[#00478d]/30"}`} style={{ height: `${pct}%` }} title={r ? `${hr} bpm` : ""} />;
                        })}
                      </div>
                    </div>

                    <div className="bg-[#f4f3f5] p-6 rounded-2xl flex flex-col h-64">
                      <div className="flex items-center justify-between mb-6">
                        <div><h4 className="font-bold">Oxygen Saturation</h4><p className="text-[10px] text-[#424752]">Stable Range: 95–100%</p></div>
                        <span className="material-symbols-outlined text-[#396661]">verified_user</span>
                      </div>
                      <div className="flex-1 flex flex-col justify-center items-center">
                        <div className="w-32 h-32 rounded-full border-8 border-[#bcece5] flex items-center justify-center">
                          <span className="text-3xl font-extrabold">{latest?.oxygenLevel ?? "—"}%</span>
                        </div>
                        <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#396661]">
                          {latest ? (latest.oxygenLevel >= 95 ? "Optimal" : "Below Normal") : "No Data"}
                        </p>
                      </div>
                    </div>

                    {/* Observation Logs */}
                    <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-[#c2c6d4]/20">
                      <h4 className="font-bold text-lg mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>Detailed Observation Logs</h4>
                      {records.length === 0 && <p className="text-slate-400 text-sm">No records yet for this patient.</p>}
                      {records.slice(0, 5).map((r, i) => {
                        const isAlert = r.heartRate < 50 || r.heartRate > 110 || r.oxygenLevel < 92 || r.systolic > 140;
                        return (
                          <div key={r._id} className={`flex items-center justify-between py-4 ${i < records.length - 1 ? "border-b border-[#eeedf0]" : ""}`}>
                            <div className="flex items-center gap-4">
                              <div className={`w-2 h-2 rounded-full ${isAlert ? "bg-[#ba1a1a]" : "bg-[#396661]"}`} />
                              <div>
                                <p className="text-sm font-bold">{isAlert ? "⚠ Abnormal Vitals" : "Routine Vital Check"}</p>
                                <p className="text-[10px] text-[#424752]">{new Date(r.createdAt).toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="flex gap-6 text-sm font-semibold">
                              <div className={`text-center ${(r.heartRate < 50 || r.heartRate > 110) ? "text-[#ba1a1a]" : ""}`}><span className="block text-[10px] text-[#424752] font-normal">HR</span>{r.heartRate}</div>
                              <div className={`text-center ${r.oxygenLevel < 92 ? "text-[#ba1a1a]" : ""}`}><span className="block text-[10px] text-[#424752] font-normal">SpO2</span>{r.oxygenLevel}%</div>
                              <div className={`text-center ${r.systolic > 140 ? "text-[#ba1a1a]" : ""}`}><span className="block text-[10px] text-[#424752] font-normal">BP</span>{r.systolic}/{r.diastolic}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <button className="fixed bottom-8 right-8 w-16 h-16 bg-[#00478d] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
        <span className="material-symbols-outlined text-3xl">person_add</span>
        <span className="absolute right-full mr-4 bg-[#1a1c1d] text-white px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Add New Patient</span>
      </button>
    </div>
  );
}
