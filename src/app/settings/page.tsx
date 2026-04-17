"use client";

import { useState } from "react";
import { 
  User, Hotel, Bell, Shield, CreditCard, 
  Save, Camera, Globe, Mail, Phone, 
  CheckCircle2, MapPin, Lock, Smartphone, 
  Trash2, ShieldCheck, Clock, Coins
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

// --- TYPES ---
interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
  desc: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  const tabs: Tab[] = [
    { id: "profile", label: "Profile", icon: User, desc: "Personal information" },
    { id: "hotel", label: "Hotel", icon: Hotel, desc: "Property details" },
    { id: "notifications", label: "Notifications", icon: Bell, desc: "Alert preferences" },
    { id: "security", label: "Security", icon: Shield, desc: "Password & 2FA" },
    { id: "billing", label: "Billing", icon: CreditCard, desc: "Payment methods" },
  ];

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 md:gap-8 pb-20 antialiased">
      
      {/* --- RESPONSIVE NAVIGATION --- */}
      <div className="lg:col-span-1 space-y-4 md:space-y-6">
        <div className="px-2">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mt-1">
            {siteConfig.name} {siteConfig.company}
          </p>
        </div>

        {/* Mobile: Horizontal scroll, Desktop: Vertical list */}
        <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar bg-white/50 backdrop-blur-sm border border-slate-100 rounded-3xl lg:rounded-4xl p-2 md:p-3 gap-2 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "shrink-0 flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 rounded-2xl transition-all duration-300",
                activeTab === tab.id 
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200" 
                  : "text-slate-500 hover:bg-white hover:text-slate-900"
              )}
            >
              <div className={cn(
                "p-1.5 md:p-2 rounded-xl transition-colors",
                activeTab === tab.id ? "bg-white/20" : "bg-slate-100"
              )}>
                <tab.icon size={16} className="md:w-4.5 md:h-4.5" />
              </div>
              <div className="text-left">
                <p className="text-xs md:text-sm font-black tracking-tight">{tab.label}</p>
                <p className={cn(
                  "text-[8px] md:text-[9px] font-bold uppercase leading-tight",
                  activeTab === tab.id ? "text-indigo-100" : "text-slate-400"
                )}>
                  {tab.id}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="lg:col-span-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white border border-slate-100 rounded-4xl sm:rounded-[3rem] p-6 md:p-12 shadow-sm relative overflow-hidden min-h-125 flex flex-col transform-gpu"
          >
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-50/50 blur-[80px] sm:blur-[120px] -mr-16 -mt-16 sm:-mr-32 sm:-mt-32 pointer-events-none" />

            <div className="flex-1 relative z-10">
              {/* PROFILE TAB */}
              {activeTab === "profile" && (
                <div className="space-y-8 md:space-y-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                      <div className="relative group">
                        <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-4xl bg-linear-to-tr from-indigo-500 to-purple-500 p-1 shadow-2xl">
                          <div className="h-full w-full rounded-[1.8rem] bg-slate-100 border-2 sm:border-4 border-white flex items-center justify-center overflow-hidden font-black text-xl sm:text-2xl text-indigo-600 uppercase">
                             {siteConfig.user.initials}
                          </div>
                        </div>
                        <button className="absolute -bottom-1 -right-1 p-2 sm:p-2.5 bg-slate-900 text-white rounded-xl sm:rounded-2xl shadow-lg hover:bg-indigo-600">
                          <Camera size={12} className="sm:w-3.5 sm:h-3.5" />
                        </button>
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900">{siteConfig.user.name}</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{siteConfig.user.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <InputField label="Full Name" value={siteConfig.user.name} icon={<User size={16}/>} />
                    <InputField label="Account Type" value={siteConfig.user.role} icon={<ShieldCheck size={16}/>} />
                    <InputField label="Email" value="pc@hotelpro.com" icon={<Mail size={16}/>} />
                    <InputField label="Phone" value="+91 98765 43210" icon={<Phone size={16}/>} />
                    <div className="md:col-span-2">
                      <InputField label="Professional Bio" value="System administrator for HotelPro Enterprise." isTextArea />
                    </div>
                  </div>
                </div>
              )}

              {/* HOTEL TAB */}
              {activeTab === "hotel" && (
                <div className="space-y-8 md:space-y-10">
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">Property Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <InputField label="Hotel Name" value={siteConfig.name} icon={<Hotel size={16}/>} />
                    <InputField label="Company Brand" value={siteConfig.company} icon={<Globe size={16}/>} />
                    <div className="md:col-span-2">
                      <InputField label="Address" value="Tuljapur, Maharashtra" icon={<MapPin size={16}/>} isTextArea />
                    </div>
                    <InputField label="Currency" value="INR (₹)" icon={<Coins size={16}/>} />
                    <InputField label="Timezone" value="(GMT+05:30)" icon={<Clock size={16}/>} />
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === "notifications" && (
                <div className="space-y-6 md:space-y-8">
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">Notification Center</h2>
                  <div className="grid grid-cols-1 gap-3 md:gap-4">
                    <ToggleItem title="Dashboard Alerts" desc="Real-time popups for bookings" enabled />
                    <ToggleItem title="Email Ledger" desc="Daily PDF revenue reports" enabled />
                    <ToggleItem title="Staff Updates" desc="Cleaning task notifications" />
                  </div>
                </div>
              )}

              {/* SECURITY TAB */}
              {activeTab === "security" && (
                <div className="space-y-8 md:space-y-10">
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">Security Vault</h2>
                  <div className="p-6 md:p-8 bg-slate-50 border border-slate-100 rounded-3xl md:rounded-4xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="New Password" value="" placeholder="••••••••" icon={<Lock size={16}/>} />
                      <InputField label="Confirm" value="" placeholder="••••••••" icon={<ShieldCheck size={16}/>} />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 bg-indigo-50 border border-indigo-100 rounded-3xl md:rounded-4xl">
                    <div className="flex items-center gap-4 text-center sm:text-left">
                      <Smartphone size={24} className="text-indigo-600 shrink-0" />
                      <div>
                        <p className="font-black text-slate-900 text-sm sm:text-base">Two-Factor Auth</p>
                        <p className="text-[10px] sm:text-xs text-slate-500 font-bold">Secure via mobile</p>
                      </div>
                    </div>
                    <button className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-indigo-700">Enable</button>
                  </div>
                </div>
              )}

              {/* BILLING TAB */}
              {activeTab === "billing" && (
                <div className="space-y-8 md:space-y-10">
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">Subscription</h2>
                  <div className="bg-slate-900 rounded-4xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 relative z-10">
                      <div>
                        <p className="text-indigo-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Active Plan</p>
                        <h3 className="text-2xl md:text-3xl font-black italic">Enterprise Pro</h3>
                      </div>
                      <p className="text-3xl md:text-4xl font-black">$120<span className="text-sm opacity-50">/mo</span></p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-6 sm:p-8 border border-slate-100 rounded-4xl bg-white shadow-sm">
                    <div className="flex items-center gap-3 sm:gap-5">
                      <div className="h-10 w-14 bg-slate-50 rounded-lg flex items-center justify-center text-slate-900 font-black italic text-[10px]">VISA</div>
                      <p className="text-sm sm:text-base font-black text-slate-900 truncate max-w-37.5 sm:max-w-none">•••• •••• •••• 4242</p>
                    </div>
                    <button className="p-2 text-slate-300 hover:text-rose-500 transition-all">
                      <Trash2 size={18}/>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* --- SAVE BAR --- */}
            <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="text-center sm:text-left order-2 sm:order-1">
                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Version {siteConfig.version}</p>
                <p className="text-xs text-slate-500 font-bold tracking-tight">Cloud sync active</p>
              </div>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className={cn(
                  "w-full sm:w-auto flex items-center justify-center gap-3 px-8 md:px-12 py-3.5 md:py-4 rounded-2xl font-black text-xs md:text-sm shadow-2xl transition-all active:scale-95 order-1 sm:order-2",
                  isSaving ? "bg-emerald-500 text-white" : "bg-slate-900 text-white hover:bg-indigo-600 shadow-indigo-100"
                )}
              >
                {isSaving ? <><CheckCircle2 size={18} /> Saved</> : <><Save size={18} /> Update All</>}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

interface InputFieldProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  isTextArea?: boolean;
  placeholder?: string;
}

function InputField({ label, value, icon, isTextArea, placeholder }: InputFieldProps) {
  return (
    <div className="space-y-2 md:space-y-3 group w-full">
      <label className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 transition-colors group-focus-within:text-indigo-600">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className={cn(
            "absolute left-4 md:left-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none",
            isTextArea ? "top-4 md:top-5" : "top-1/2 -translate-y-1/2"
          )}>
            {icon}
          </div>
        )}
        {isTextArea ? (
          <textarea 
            defaultValue={value}
            placeholder={placeholder}
            className={cn(
              "w-full bg-slate-50 border-2 border-transparent rounded-2xl text-xs md:text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-100 outline-none p-4 md:p-5 h-28 md:h-36 resize-none transition-all",
              icon ? 'pl-11 md:pl-14' : ''
            )}
          />
        ) : (
          <input 
            defaultValue={value}
            placeholder={placeholder}
            className={cn(
              "w-full bg-slate-50 border-2 border-transparent rounded-2xl text-xs md:text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-100 outline-none px-4 md:px-5 py-3.5 md:py-4 transition-all",
              icon ? 'pl-11 md:pl-14' : ''
            )}
          />
        )}
      </div>
    </div>
  );
}

function ToggleItem({ title, desc, enabled }: { title: string, desc: string, enabled?: boolean }) {
  const [isOn, setIsOn] = useState(enabled || false);
  return (
    <div 
      onClick={() => setIsOn(!isOn)}
      className={cn(
        "flex items-center justify-between p-5 md:p-8 border-2 transition-all duration-300 cursor-pointer rounded-3xl md:rounded-4xl",
        isOn ? "bg-white border-indigo-100 shadow-xl shadow-indigo-100/20 scale-[1.01]" : "bg-slate-50 border-transparent opacity-70 hover:opacity-100"
      )}
    >
      <div className="flex items-center gap-4 md:gap-6">
        <div className={cn(
          "h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-colors shrink-0",
          isOn ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-400"
        )}>
          <Bell size={18} className="md:w-5 md:h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm md:text-base font-black text-slate-900 tracking-tight truncate">{title}</p>
          <p className="text-[9px] md:text-xs text-slate-500 font-bold uppercase tracking-tight mt-0.5 truncate">{desc}</p>
        </div>
      </div>
      <div className={cn(
        "h-6 w-11 md:h-8 md:w-14 rounded-full relative p-1 transition-colors duration-300 shrink-0",
        isOn ? "bg-indigo-600" : "bg-slate-300"
      )}>
        <motion.div 
          animate={{ x: isOn ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 18 : 24) : 0 }}
          className="h-4 w-4 md:h-6 md:w-6 bg-white rounded-full shadow-lg"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </div>
  );
}