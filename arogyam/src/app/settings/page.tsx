import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";

export default function Settings() {
  return (
    <div className="bg-[#faf9fb] text-[#1a1c1d] min-h-screen">
      <TopNav activeTab="dashboard" />
      <SideNav activeItem="security" />

      <main className="lg:pl-64 pt-16 min-h-screen">
        <div className="max-w-6xl mx-auto p-8 lg:p-12">
          <header className="mb-12">
            <h1 className="text-4xl font-extrabold text-[#1a1c1d] tracking-tight mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>Settings &amp; Security</h1>
            <p className="text-[#424752] max-w-2xl">Configure monitoring thresholds, manage connected devices, and update security preferences.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main */}
            <section className="lg:col-span-8 space-y-8">
              {/* Account Security */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>Account Security</h2>
                    <p className="text-sm text-[#424752]">Update your credentials and active session settings.</p>
                  </div>
                  <span className="material-symbols-outlined text-[#414273]">verified_user</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#424752] uppercase tracking-wider">Email Address</label>
                    <input className="w-full bg-[#e8e8ea] rounded-lg px-4 py-3 text-sm border-none outline-none" readOnly defaultValue="alex.caregiver@serenity.med" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#424752] uppercase tracking-wider">Two-Factor Auth</label>
                    <div className="flex items-center justify-between bg-[#bcece5]/30 px-4 py-3 rounded-lg border border-[#bcece5]">
                      <span className="text-sm font-medium text-[#3f6c67]">Enabled (SMS)</span>
                      <button className="text-[#00478d] text-xs font-bold hover:underline">Change</button>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                    <button className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-[#c2c6d4] text-[#424752] hover:bg-[#f4f3f5] transition-colors">Change Password</button>
                    <button className="bg-gradient-to-br from-[#00478d] to-[#005eb8] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">Save Changes</button>
                  </div>
                </div>
              </div>

              {/* Notification Thresholds */}
              <div className="bg-[#eeedf0] p-8 rounded-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-[#00478d]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#00478d]">notifications_active</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ fontFamily: "Manrope, sans-serif" }}>Notification Thresholds</h2>
                    <p className="text-sm text-[#424752]">Configure when and how you are alerted for vital changes.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: "favorite", color: "text-[#ba1a1a]", label: "Heart Rate Limits", desc: "Alert when outside 55 - 110 BPM" },
                    { icon: "air", color: "text-[#00478d]", label: "Oxygen Saturation (SpO2)", desc: "Alert when below 92%" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className={`material-symbols-outlined ${item.color} text-3xl`}>{item.icon}</span>
                        <div>
                          <p className="font-bold text-[#1a1c1d]">{item.label}</p>
                          <p className="text-xs text-[#424752]">{item.desc}</p>
                        </div>
                      </div>
                      <button className="text-[#00478d] text-sm font-bold">Edit</button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Devices */}
              <div className="bg-white p-6 rounded-xl border border-[#c2c6d4]/20">
                <h3 className="font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "Manrope, sans-serif" }}>
                  <span className="material-symbols-outlined text-[#00478d]">devices_wearables</span> Device Connections
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#f4f3f5]">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#396661]">watch</span>
                      <div>
                        <p className="text-sm font-bold">Smart Cuff X2</p>
                        <p className="text-[10px] text-[#396661] font-semibold uppercase">Connected</p>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#396661] animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#f4f3f5] opacity-60">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#424752]">monitor_heart</span>
                      <div>
                        <p className="text-sm font-bold">Sleep Sensor S1</p>
                        <p className="text-[10px] text-[#424752] font-semibold uppercase">Disconnected</p>
                      </div>
                    </div>
                    <button className="text-[10px] font-bold text-[#00478d]">Sync</button>
                  </div>
                  <button className="w-full py-3 border-2 border-dashed border-[#c2c6d4] rounded-xl text-xs font-bold text-[#424752] hover:bg-[#f4f3f5] transition-colors">
                    + Pair New Device
                  </button>
                </div>
              </div>

              {/* Security card */}
              <div className="relative overflow-hidden h-48 rounded-xl bg-slate-900 flex items-end p-6">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <div className="relative z-10">
                  <p className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Your data is secured with AES-256 encryption.</p>
                  <p className="text-blue-300 text-xs mt-1">HIPAA Compliant Cloud Architecture</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
