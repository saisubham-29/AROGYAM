"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "child", patientId: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const body = mode === "login" ? { email: form.email, password: form.password } : form;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setError(data.error);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("name", data.name);
    if (data.patientId) localStorage.setItem("patientId", data.patientId);
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[620px]">

        {/* Left Panel */}
        <div className="md:w-5/12 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-10 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-white/5 rounded-full" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">favorite</span>
              </div>
              <span className="font-bold text-sm tracking-wide" style={{ fontFamily: "Manrope, sans-serif" }}>Clinical Serenity</span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
              The Empathetic Sentinel for Elder Care.
            </h1>
            <p className="text-blue-200 text-sm leading-relaxed">
              Secure, real-time health monitoring for your loved ones. Role-based access ensures the right people see the right information — always.
            </p>
          </div>

          <div className="relative z-10 space-y-3 mt-10">
            {[["verified_user", "HIPAA-compliant data security"],["monitor_heart", "Real-time vitals monitoring"],["group", "Role-based care team access"]].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-3 text-sm text-blue-100">
                <span className="material-symbols-outlined text-base text-blue-300">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:w-7/12 p-10 flex flex-col justify-center">

          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8 w-fit">
            {(["login", "register"] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); }}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${mode === m ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                {m}
              </button>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-gray-400 text-sm">{mode === "login" ? "Sign in to your care dashboard" : "Join the care team in seconds"}</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Role */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Role</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 text-lg">badge</span>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                  className="w-full border-0 border-b-2 border-gray-200 focus:border-blue-600 focus:ring-0 pl-8 pb-2 pt-1 text-sm text-gray-700 bg-transparent outline-none transition-colors appearance-none cursor-pointer">
                  <option value="child">Child (Read-only)</option>
                  <option value="parent">Parent (View + Emergency)</option>
                  <option value="care_manager">Care Manager (Full Access)</option>
                </select>
              </div>
            </div>

            {/* Full Name - always rendered, fades+slides in/out */}
            <div className="space-y-1 overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: mode === "register" ? "80px" : "0px", opacity: mode === "register" ? 1 : 0 }}>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 text-lg">person</span>
                <input type="text" placeholder="Dr. Sarah Johnson" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required={mode === "register"}
                  className="w-full border-0 border-b-2 border-gray-200 focus:border-blue-600 focus:ring-0 pl-8 pb-2 pt-1 text-sm text-gray-700 bg-transparent outline-none transition-colors" />
              </div>
            </div>

            {/* Patient ID - for parent/child only */}
            <div className="space-y-1 overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: mode === "register" && form.role !== "care_manager" ? "80px" : "0px", opacity: mode === "register" && form.role !== "care_manager" ? 1 : 0 }}>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Patient ID <span className="text-gray-300">(e.g. p001)</span></label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 text-lg">personal_injury</span>
                <input type="text" placeholder="p001" value={form.patientId}
                  onChange={e => setForm({ ...form, patientId: e.target.value })}
                  required={mode === "register" && form.role !== "care_manager"}
                  className="w-full border-0 border-b-2 border-gray-200 focus:border-blue-600 focus:ring-0 pl-8 pb-2 pt-1 text-sm text-gray-700 bg-transparent outline-none transition-colors" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 text-lg">mail</span>
                <input type="email" placeholder="you@hospital.com" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} required
                  className="w-full border-0 border-b-2 border-gray-200 focus:border-blue-600 focus:ring-0 pl-8 pb-2 pt-1 text-sm text-gray-700 bg-transparent outline-none transition-colors" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 text-lg">lock</span>
                <input type="password" placeholder="••••••••" value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })} required
                  className="w-full border-0 border-b-2 border-gray-200 focus:border-blue-600 focus:ring-0 pl-8 pb-2 pt-1 text-sm text-gray-700 bg-transparent outline-none transition-colors" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:scale-[0.98] active:scale-95 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60">
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>{mode === "login" ? "Sign In →" : "Secure Sign Up →"}</>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            {mode === "register" ? "Already have an account? " : "Don't have an account? "}
            <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
              className="text-blue-600 font-semibold hover:underline">
              {mode === "register" ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
