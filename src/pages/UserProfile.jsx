import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <div className="relative px-margin py-lg overflow-hidden">
        {/* Decorative Ambient Background */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--primary)', stopOpacity: 0.2 }}></stop>
                <stop offset="100%" style={{ stopColor: 'var(--secondary)', stopOpacity: 0.1 }}></stop>
              </linearGradient>
            </defs>
            <circle cx="350" cy="50" fill="url(#grad1)" r="100">
              <animate attributeName="opacity" dur="8s" repeatCount="indefinite" values="0.3;0.6;0.3"></animate>
            </circle>
          </svg>
        </div>
        
        <div className="flex flex-col items-center gap-md">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-secondary shadow-xl">
              <img alt="Sarah" className="w-full h-full rounded-full object-cover border-4 border-surface-container-lowest" src="https://lh3.googleusercontent.com/aida/AP1WRLvLHJETUhg5lmzcepHWBJ2ABB1XzttSAFJ6RErfwHqThw66UmKnvo8qdOG1Q-WrD_D3DB9pk-e2ZnuExSlF4Mus0Xlv3wTHAEQ9y1D-iyH0DX3s0FCFZaXrO9iC78lc2rJna7mKXSFgl6uKDUahpYepvlKW-KI4Z9ubgRymFemyq_Z1-7cofd7nGQCLjbmiXoFF81k_bVJmohnxeQsngbxYi_nyMfQgJg42farXLReJucGJGnrsYgzC9A" />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-primary text-on-primary rounded-full shadow-lg transition-transform active:scale-95">
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Sarah</h1>
            <p className="font-body-md text-on-surface-variant">Founder, Sarah's Boutique</p>
            <div className="mt-sm inline-flex items-center gap-xs px-3 py-1 rounded-full bg-primary-container text-on-primary-container">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span className="font-label-md text-label-md">Pro Plan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-margin flex flex-col gap-lg">
        {/* Personal Information Section */}
        <section className="flex flex-col gap-md">
          <h2 className="font-title-lg text-title-lg text-on-surface-variant px-1">Personal Information</h2>
          <div className="bg-surface-container rounded-xl overflow-hidden shadow-sm">
            <div className="p-md flex flex-col gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-outline">Full Name</label>
                <input className="bg-surface-container-low px-md py-3 rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary transition-all" type="text" defaultValue="Sarah Jenkins" />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-outline">Email Address</label>
                <input className="bg-surface-container-low px-md py-3 rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary transition-all" type="email" defaultValue="sarah@boutique.com" />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-outline">Phone Number</label>
                <input className="bg-surface-container-low px-md py-3 rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary transition-all" type="tel" defaultValue="+1 (555) 012-3456" />
              </div>
            </div>
          </div>
        </section>

        {/* Business Settings Section */}
        <section className="flex flex-col gap-md">
          <h2 className="font-title-lg text-title-lg text-on-surface-variant px-1">Business Settings</h2>
          <div className="bg-surface-container rounded-xl shadow-sm overflow-hidden">
            <button className="w-full flex items-center justify-between p-md active:bg-surface-container-highest transition-colors">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <div className="text-left">
                  <p className="font-title-lg text-on-surface">Currency</p>
                  <p className="font-body-md text-on-surface-variant">USD - United States Dollar</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline">chevron_right</span>
            </button>
            <div className="h-[1px] mx-md bg-outline-variant opacity-20"></div>
            <button className="w-full flex items-center justify-between p-md active:bg-surface-container-highest transition-colors">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
                  <span className="material-symbols-outlined">storefront</span>
                </div>
                <div className="text-left">
                  <p className="font-title-lg text-on-surface">Business Category</p>
                  <p className="font-body-md text-on-surface-variant">Fashion &amp; Retail</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline">chevron_right</span>
            </button>
            <div className="h-[1px] mx-md bg-outline-variant opacity-20"></div>
            <button className="w-full flex items-center justify-between p-md active:bg-surface-container-highest transition-colors">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div className="text-left">
                  <p className="font-title-lg text-on-surface">Tax Information</p>
                  <p className="font-body-md text-on-surface-variant">EIN: **-***4421</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline">chevron_right</span>
            </button>
          </div>
        </section>

        {/* Security & Preferences */}
        <section className="flex flex-col gap-md">
          <div className="bg-surface-container rounded-xl shadow-sm">
            {/* Two-Factor Toggle */}
            <div className="flex items-center justify-between p-md">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">security</span>
                </div>
                <p className="font-title-lg text-on-surface">Two-Factor Auth</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={twoFactor} 
                  onChange={() => setTwoFactor(!twoFactor)} 
                />
                <div className="w-11 h-6 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="h-[1px] mx-md bg-outline-variant opacity-20"></div>
            
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-md">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">dark_mode</span>
                </div>
                <p className="font-title-lg text-on-surface">Dark Mode</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isDarkMode}
                  onChange={() => setIsDarkMode(!isDarkMode)} 
                />
                <div className="w-11 h-6 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="h-[1px] mx-md bg-outline-variant opacity-20"></div>
            
            {/* Notifications */}
            <button className="w-full flex items-center justify-between p-md active:bg-surface-container-highest transition-colors">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">notifications_active</span>
                </div>
                <p className="font-title-lg text-on-surface">Notification Prefs</p>
              </div>
              <span className="material-symbols-outlined text-outline">chevron_right</span>
            </button>
          </div>
        </section>

        {/* Support & Legal */}
        <section className="flex flex-col gap-md">
          <div className="bg-surface-container rounded-xl shadow-sm p-md flex flex-col gap-sm">
            <button className="w-full flex items-center gap-md p-sm text-on-surface-variant active:opacity-70 transition-opacity">
              <span className="material-symbols-outlined">help</span>
              <span className="font-body-lg">Help Center</span>
            </button>
            <button className="w-full flex items-center gap-md p-sm text-on-surface-variant active:opacity-70 transition-opacity">
              <span className="material-symbols-outlined">policy</span>
              <span className="font-body-lg">Privacy Policy</span>
            </button>
            <div className="mt-md">
              <button 
                onClick={handleLogout}
                className="w-full py-4 bg-error-container text-on-error-container rounded-xl font-title-lg flex items-center justify-center gap-sm active:scale-[0.98] transition-transform"
              >
                <span className="material-symbols-outlined">logout</span>
                Sign Out
              </button>
            </div>
          </div>
          <p className="text-center font-label-md text-outline py-md">Phindu Assistance v2.4.0</p>
        </section>
      </div>
    </div>
  );
}
