import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";

export default function CareTimeline() {
  return (
    <div className="bg-[#faf9fb] text-[#1a1c1d] min-h-screen">
      <TopNav activeTab="timeline" />
      <SideNav activeItem="vitals" />

      <main className="pt-24 pb-12 lg:ml-64 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-[#1a1c1d] tracking-tight mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>Detailed Timeline</h1>
            <p className="text-[#424752]">Complete historical log of patient activity and health events.</p>
          </div>
          <div className="flex items-center gap-3 bg-[#eeedf0] p-1 rounded-xl">
            <button className="px-6 py-2 rounded-lg bg-white shadow-sm text-sm font-semibold text-[#00478d]">Daily Overview</button>
            <button className="px-6 py-2 rounded-lg text-sm font-semibold text-[#424752] hover:text-[#00478d]">Critical Alerts Only</button>
          </div>
        </header>

        <section className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          {/* Timeline */}
          <div className="xl:col-span-8 relative">
            {/* Dashed line */}
            <div className="absolute left-[23px] top-[52px] bottom-0 w-[2px]" style={{ background: "repeating-linear-gradient(to bottom, transparent, transparent 4px, #e3e2e4 4px, #e3e2e4 8px)" }} />

            {/* Day header */}
            <div className="flex items-center gap-4 mb-10 relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#00478d] flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1a1c1d]" style={{ fontFamily: "Manrope, sans-serif" }}>Today, Oct 24th</h2>
                <span className="text-sm text-[#424752]">Last updated 5 minutes ago</span>
              </div>
            </div>

            <div className="space-y-12 ml-6">
              {/* Critical Alert */}
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 w-12 h-12 -ml-6 rounded-full bg-[#ffdad6] flex items-center justify-center border-4 border-[#faf9fb] ring-2 ring-[#ba1a1a]/10">
                  <span className="material-symbols-outlined text-[#ba1a1a]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#c2c6d4]/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-[#ba1a1a]/10 text-[#ba1a1a] text-xs font-bold mb-2 uppercase">Critical Alert</span>
                      <h3 className="text-lg font-bold text-[#1a1c1d]" style={{ fontFamily: "Manrope, sans-serif" }}>Sudden Spike in Systolic Pressure</h3>
                    </div>
                    <span className="text-sm text-[#424752] font-semibold">14:42</span>
                  </div>
                  <p className="text-[#424752] mb-6 leading-relaxed">Blood pressure recorded at 165/95 mmHg. Alert triggered automatically and sent to attending nurse Maria Gonzalez.</p>
                  <div className="flex items-center gap-3 p-4 bg-[#ffdad6]/30 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-[#c2c6d4]" />
                    <span className="text-sm font-medium text-[#93000a]">Nurse Acknowledged • 14:45</span>
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 w-12 h-12 -ml-6 rounded-full bg-[#bcece5] flex items-center justify-center border-4 border-[#faf9fb]">
                  <span className="material-symbols-outlined text-[#3f6c67]">directions_run</span>
                </div>
                <div className="bg-[#f4f3f5] p-6 rounded-2xl">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-[#1a1c1d]" style={{ fontFamily: "Manrope, sans-serif" }}>Daily Walk Completed</h3>
                    <span className="text-sm text-[#424752]">11:15</span>
                  </div>
                  <p className="text-[#424752] text-sm mb-4">Activity duration: 24 minutes • 1,240 steps</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[{ label: "Peak HR", val: "98 BPM" }, { label: "Intensity", val: "Moderate" }].map((s) => (
                      <div key={s.label} className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-[#424752] mb-1">{s.label}</p>
                        <p className="font-bold text-[#396661]">{s.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Medication */}
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 w-12 h-12 -ml-6 rounded-full bg-[#e1dfff] flex items-center justify-center border-4 border-[#faf9fb]">
                  <span className="material-symbols-outlined text-[#414273]">pill</span>
                </div>
                <div className="bg-[#f4f3f5] p-6 rounded-2xl">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-[#1a1c1d]" style={{ fontFamily: "Manrope, sans-serif" }}>Lisinopril Administered</h3>
                    <span className="text-sm text-[#424752]">09:00</span>
                  </div>
                  <p className="text-[#424752] text-sm">Morning dose (20mg) confirmed by patient self-reporting.</p>
                </div>
              </div>

              {/* Yesterday header */}
              <div className="flex items-center gap-4 pt-8 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#e3e2e4] flex items-center justify-center border-4 border-[#faf9fb]">
                  <span className="material-symbols-outlined text-[#424752]">history</span>
                </div>
                <h2 className="text-xl font-bold text-[#424752]" style={{ fontFamily: "Manrope, sans-serif" }}>Yesterday, Oct 23rd</h2>
              </div>

              {/* Vitals */}
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 w-12 h-12 -ml-6 rounded-full bg-[#d6e3ff] flex items-center justify-center border-4 border-[#faf9fb]">
                  <span className="material-symbols-outlined text-[#00478d]">monitoring</span>
                </div>
                <div className="bg-[#f4f3f5] p-6 rounded-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-[#1a1c1d]" style={{ fontFamily: "Manrope, sans-serif" }}>Routine Vitals Check</h3>
                    <span className="text-sm text-[#424752]">18:30</span>
                  </div>
                  <div className="flex flex-wrap gap-8">
                    {[{ label: "SpO2", val: "98%" }, { label: "Temp", val: "98.4°F" }, { label: "Weight", val: "178 lbs" }].map((v) => (
                      <div key={v.label}>
                        <p className="text-xs text-[#424752] uppercase font-bold tracking-tighter mb-1">{v.label}</p>
                        <p className="text-xl font-extrabold text-[#1a1c1d]" style={{ fontFamily: "Manrope, sans-serif" }}>{v.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="xl:col-span-4 space-y-8">
            {/* Activity Snapshot */}
            <div className="bg-gradient-to-br from-[#00478d] to-[#005eb8] p-8 rounded-3xl text-white shadow-xl">
              <h4 className="text-white/70 text-sm font-bold uppercase tracking-wider mb-6">Activity Snapshot</h4>
              <div className="grid grid-cols-2 gap-6">
                {[{ val: "12", label: "Events Today" }, { val: "1", label: "Active Alert" }, { val: "100%", label: "Med Adherence" }, { val: "3", label: "Care Notes" }].map((s) => (
                  <div key={s.label} className="space-y-1">
                    <p className="text-3xl font-extrabold" style={{ fontFamily: "Manrope, sans-serif" }}>{s.val}</p>
                    <p className="text-xs text-white/70 font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Condition Trend */}
            <div className="bg-[#f4f3f5] p-6 rounded-3xl">
              <h4 className="text-[#424752] text-sm font-bold uppercase tracking-wider mb-4">Condition Trend</h4>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-12 bg-[#396661] rounded-full" />
                <div>
                  <p className="text-sm font-bold text-[#1a1c1d]">Consistent Stability</p>
                  <p className="text-xs text-[#424752]">Last 7 days remain within target threshold.</p>
                </div>
              </div>
              <div className="h-24 w-full bg-white rounded-xl flex items-end px-2 pb-2 gap-1 overflow-hidden">
                {[75, 67, 50, 75, 83, 67, 100].map((h, i) => (
                  <div key={i} className={`w-full rounded-t-md ${i === 6 ? "bg-[#00478d]" : i >= 4 ? "bg-[#396661]/40" : "bg-[#396661]/20"}`} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            {/* Upcoming */}
            <div className="bg-white p-6 rounded-3xl shadow-sm">
              <h4 className="text-[#424752] text-sm font-bold uppercase tracking-wider mb-6">Upcoming Schedule</h4>
              <div className="space-y-6">
                {[
                  { time: "18:00", title: "Evening Vitals Check", desc: "Automated blood pressure & heart rate." },
                  { time: "21:00", title: "Melatonin Administration", desc: "Scheduled dose: 5mg" },
                ].map((item) => (
                  <div key={item.time} className="flex gap-4">
                    <p className="text-xs font-bold text-[#424752] w-12 shrink-0">{item.time}</p>
                    <div>
                      <p className="text-sm font-bold text-[#1a1c1d]">{item.title}</p>
                      <p className="text-xs text-[#424752]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 border border-[#c2c6d4] rounded-xl text-sm font-bold text-[#424752] hover:bg-[#f4f3f5] transition-all">View Full Calendar</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
