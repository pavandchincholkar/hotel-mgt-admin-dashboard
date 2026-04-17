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
import { siteConfig } from "@/config/site"; // 🔥 Connected to siteConfig

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
    { id: "profile", label: "Profile", icon: User, desc: "Personal information & social" },
    { id: "hotel", label: "Hotel", icon: Hotel, desc: "Property details & location" },
    { id: "notifications", label: "Notifications", icon: Bell, desc: "Email & push preferences" },
    { id: "security", label: "Security", icon: Shield, desc: "Password & authentication" },
    { id: "billing", label: "Billing", icon: CreditCard, desc: "Plans & payment methods" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-20 antialiased">
      
      {/* --- LEFT NAVIGATION --- */}
      <div className="lg:col-span-1 space-y-4">
        <div className="px-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mt-1">
            {siteConfig.name} {siteConfig.company}
          </p>
        </div>

        <div className="bg-white/50 backdrop-blur-sm border border-slate-100 rounded-4xl p-3 space-y-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                activeTab === tab.id 
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200" 
                  : "text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm"
              }`}
            >
              <div className={`p-2 rounded-xl ${activeTab === tab.id ? "bg-white/20" : "bg-slate-100"}`}>
                <tab.icon size={18} />
              </div>
              <div className="text-left">
                <p className="text-sm font-black tracking-tight">{tab.label}</p>
                <p className={`text-[9px] font-bold uppercase leading-tight ${activeTab === tab.id ? "text-indigo-100" : "text-slate-400"}`}>
                  {tab.id}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* --- RIGHT CONTENT AREA --- */}
      <div className="lg:col-span-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden min-h-150 flex flex-col transform-gpu"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 blur-[120px] -mr-32 -mt-32 pointer-events-none opacity-60" />

            <div className="flex-1 relative z-10">
              {/* PROFILE TAB */}
              {activeTab === "profile" && (
                <div className="space-y-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="relative group">
                        <div className="h-24 w-24 rounded-3xl bg-linear-to-tr from-indigo-500 to-purple-500 p-1 shadow-2xl">
                          <div className="h-full w-full rounded-[2.2rem] bg-slate-100 border-4 border-white flex items-center justify-center overflow-hidden font-black text-2xl text-indigo-600">
                             {siteConfig.user.initials}
                          </div>
                        </div>
                        <button className="absolute -bottom-1 -right-1 p-2.5 bg-slate-900 text-white rounded-2xl shadow-lg hover:bg-indigo-600 transition-all">
                          <Camera size={14} />
                        </button>
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-slate-900">{siteConfig.user.name}</h2>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{siteConfig.user.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Full Name" value={siteConfig.user.name} icon={<User size={16}/>} />
                    <InputField label="Account Type" value={siteConfig.user.role} icon={<ShieldCheck size={16}/>} />
                    <InputField label="Email Address" value="pc@hotelpro.com" icon={<Mail size={16}/>} />
                    <InputField label="Phone Number" value="+91 98765 43210" icon={<Phone size={16}/>} />
                    <div className="md:col-span-2">
                      <InputField label="Professional Bio" value="System administrator for HotelPro Enterprise." isTextArea />
                    </div>
                  </div>
                </div>
              )}

              {/* HOTEL TAB */}
              {activeTab === "hotel" && (
                <div className="space-y-10">
                  <h2 className="text-2xl font-black text-slate-900">Property Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <div className="space-y-8">
                  <h2 className="text-2xl font-black text-slate-900">Notification Center</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <ToggleItem title="Dashboard Alerts" desc="Real-time popups for new room bookings" enabled />
                    <ToggleItem title="Email Ledger" desc="Receive daily PDF reports of revenue" enabled />
                    <ToggleItem title="Staff Updates" desc="Notify when cleaning tasks are complete" />
                  </div>
                </div>
              )}

              {/* SECURITY TAB */}
              {activeTab === "security" && (
                <div className="space-y-10">
                  <h2 className="text-2xl font-black text-slate-900">Security Vault</h2>
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-4xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="New Password" value="" placeholder="••••••••" icon={<Lock size={16}/>} />
                      <InputField label="Confirm Password" value="" placeholder="••••••••" icon={<ShieldCheck size={16}/>} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-8 bg-indigo-50 border border-indigo-100 rounded-4xl">
                    <div className="flex items-center gap-4">
                      <Smartphone size={28} className="text-indigo-600" />
                      <div>
                        <p className="font-black text-slate-900">Two-Factor Auth</p>
                        <p className="text-xs text-slate-500">Secure your account via mobile</p>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase transition-all hover:bg-indigo-700">Enable</button>
                  </div>
                </div>
              )}

              {/* BILLING TAB */}
              {activeTab === "billing" && (
                <div className="space-y-10">
                  <h2 className="text-2xl font-black text-slate-900">Billing & Subscription</h2>
                  <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-xl shadow-slate-200">
                    <div className="flex justify-between items-start relative z-10">
                      <div>
                        <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">Active Plan</p>
                        <h3 className="text-3xl font-black italic">Enterprise Pro</h3>
                      </div>
                      <p className="text-4xl font-black">$120<span className="text-sm opacity-50">/mo</span></p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-8 border border-slate-100 rounded-4xl bg-white group hover:border-indigo-100 transition-all shadow-sm">
                    <div className="flex items-center gap-5">
                      <div className="h-12 w-16 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 font-black italic">VISA</div>
                      <p className="text-base font-black text-slate-900">•••• •••• •••• 4242</p>
                    </div>
                    <button className="p-3 text-slate-300 hover:text-rose-500 transition-all">
                      <Trash2 size={20}/>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* --- SAVE BAR --- */}
            <div className="mt-12 pt-10 border-t border-slate-100 flex items-center justify-between relative z-10">
              <div className="hidden sm:block">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Version {siteConfig.version}</p>
                <p className="text-xs text-slate-500 font-bold tracking-tight">Auto-sync active</p>
              </div>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className={`flex items-center gap-3 px-12 py-4 rounded-2xl font-black text-sm shadow-2xl transition-all active:scale-95 ${
                  isSaving ? "bg-emerald-500 text-white" : "bg-slate-900 text-white hover:bg-indigo-600 shadow-indigo-100"
                }`}
              >
                {isSaving ? <><CheckCircle2 size={20} /> Saved</> : <><Save size={20} /> Update Settings</>}
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
    <div className="space-y-3 group">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 transition-colors group-focus-within:text-indigo-600">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className={cn(
            "absolute left-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none",
            isTextArea ? "top-5" : "top-1/2 -translate-y-1/2"
          )}>
            {icon}
          </div>
        )}
        {isTextArea ? (
          <textarea 
            defaultValue={value}
            placeholder={placeholder}
            className={`w-full bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-800 focus:ring-8 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-100 outline-none p-5 h-36 resize-none transition-all ${icon ? 'pl-14' : ''}`}
          />
        ) : (
          <input 
            defaultValue={value}
            placeholder={placeholder}
            className={`w-full bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-800 focus:ring-8 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-100 outline-none px-5 py-4 transition-all ${icon ? 'pl-14' : ''}`}
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
      className={`flex items-center justify-between p-6 md:p-8 border-2 transition-all duration-300 cursor-pointer rounded-4xl ${
        isOn ? "bg-white border-indigo-100 shadow-xl shadow-indigo-100/20 scale-[1.01]" : "bg-slate-50 border-transparent opacity-70 hover:opacity-100"
      }`}
    >
      <div className="flex items-center gap-6">
        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-colors ${isOn ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-400"}`}>
          <Bell size={20} />
        </div>
        <div>
          <p className="text-base font-black text-slate-900 tracking-tight">{title}</p>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-tight mt-0.5">{desc}</p>
        </div>
      </div>
      <div className={`h-8 w-14 rounded-full relative p-1 transition-colors duration-300 ${isOn ? "bg-indigo-600" : "bg-slate-300"}`}>
        <motion.div 
          animate={{ x: isOn ? 24 : 0 }}
          className="h-6 w-6 bg-white rounded-full shadow-lg"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </div>
  );
}