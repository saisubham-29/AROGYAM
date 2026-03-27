import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";

export default function CareTeam() {
  return (
    <div className="bg-[#faf9fb] text-[#1a1c1d] min-h-screen">
      <TopNav activeTab="care-team" />
      <SideNav activeItem="care-team" />

      <main className="lg:ml-64 pt-24 px-8 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-extrabold text-[#1a1c1d] mb-2 tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Care Team &amp; Directory</h1>
              <p className="text-[#424752]">Coordinated health professionals and designated family contacts for Eleanor Vance.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e8e8ea] text-[#1a1c1d] font-semibold hover:bg-[#e3e2e4] transition-all">
                <span className="material-symbols-outlined">filter_list</span> Filter
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-br from-[#00478d] to-[#005eb8] text-white font-semibold shadow-lg active:scale-95 transition-all">
                <span className="material-symbols-outlined">person_add</span> Add Member
              </button>
            </div>
          </div>

          {/* Medical Professionals */}
          <h2 className="text-xl font-bold text-[#1a1c1d] flex items-center gap-2 mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
            <span className="w-2 h-6 bg-[#00478d] rounded-full" /> Medical Professionals
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {[
              { name: "Dr. Julian Reed", role: "Cardiology Specialist", badge: "Primary Physician", badgeBg: "bg-[#d6e3ff]", badgeText: "text-[#00468c]" },
              { name: "Sarah Jenkins, NP", role: "Geriatric Care Team", badge: "Lead Nurse", badgeBg: "bg-[#e8e8ea]", badgeText: "text-[#424752]" },
              { name: "Marcus Thorne", role: "Insurance & Logistics", badge: "Case Manager", badgeBg: "bg-[#e1dfff]", badgeText: "text-[#414273]" },
            ].map((person) => (
              <div key={person.name} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-16 h-16 rounded-xl bg-[#eeedf0]" />
                  <span className={`${person.badgeBg} ${person.badgeText} text-xs font-bold px-3 py-1 rounded-full`}>{person.badge}</span>
                </div>
                <h3 className="text-lg font-bold text-[#1a1c1d]" style={{ fontFamily: "Manrope, sans-serif" }}>{person.name}</h3>
                <p className="text-sm text-[#424752] font-medium mb-4">{person.role}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-3 text-sm text-[#424752]">
                    <span className="material-symbols-outlined text-[#00478d] text-lg">mail</span> contact@clinicalserenity.com
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#424752]">
                    <span className="material-symbols-outlined text-[#00478d] text-lg">call</span> +1 (555) 012-3456
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-2.5 bg-[#e8e8ea] hover:bg-[#e3e2e4] text-[#1a1c1d] font-semibold rounded-lg transition-all">
                    <span className="material-symbols-outlined text-sm">chat</span> Message
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 bg-[#00478d] text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all">
                    <span className="material-symbols-outlined text-sm">call</span> Call
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Family Contacts */}
          <h2 className="text-xl font-bold text-[#1a1c1d] flex items-center gap-2 mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
            <span className="w-2 h-6 bg-[#414273] rounded-full" /> Family &amp; Designated Contacts
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {[
              { name: "David Vance", role: "Son", primary: true },
              { name: "Katherine Vance", role: "Daughter-in-law", primary: false },
            ].map((person) => (
              <div key={person.name} className="bg-[#f4f3f5] rounded-xl p-8 flex gap-6 relative">
                {person.primary && (
                  <div className="absolute top-4 right-4 bg-[#396661] text-white font-bold text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> PRIMARY CAREGIVER
                  </div>
                )}
                <div className="w-32 h-32 rounded-2xl bg-[#c2c6d4] shrink-0" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1a1c1d] mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>{person.name}</h3>
                  <p className={`font-semibold text-sm mb-4 ${person.primary ? "text-[#396661]" : "text-[#414273]"}`}>Role: {person.role}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-3 text-[#424752] text-sm">
                      <span className="material-symbols-outlined text-[#00478d]">smartphone</span> +1 (555) 234-5678
                    </div>
                    <div className="flex items-center gap-3 text-[#424752] text-sm">
                      <span className="material-symbols-outlined text-[#00478d]">mail</span> contact@example.com
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="bg-white text-[#00478d] px-6 py-2.5 rounded-xl font-bold shadow-sm hover:shadow-md transition-all">Quick Message</button>
                    <button className="bg-[#00478d] text-white p-2.5 rounded-xl shadow-lg active:scale-95 transition-all">
                      <span className="material-symbols-outlined">call</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Banner */}
          <div className="bg-[#ffdad6] text-[#93000a] p-6 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-[#ba1a1a] w-12 h-12 rounded-full flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-3xl">emergency</span>
              </div>
              <div>
                <h4 className="font-bold text-lg" style={{ fontFamily: "Manrope, sans-serif" }}>Emergency Protocols Active</h4>
                <p className="text-sm opacity-90">In case of critical alerts, the system will automatically call David Vance followed by Dr. Julian Reed.</p>
              </div>
            </div>
            <button className="bg-white text-[#ba1a1a] font-extrabold px-6 py-3 rounded-xl shadow-sm hover:bg-[#ffdad6] border-2 border-transparent hover:border-[#ba1a1a] transition-all">
              Update Protocols
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
