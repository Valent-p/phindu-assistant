import React, { useState, useRef } from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { clearAuthToken, api } from '../core/api';

export default function UserProfile() {
  const { user, business, setUser, setBusiness } = useOutletContext();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthToken();
    navigate('/login');
  };

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        const uploadRes = await api.post('/uploads/', formData);
        
        // Update user profile with new avatar
        const updatedUser = await api.patch('/users/me', { avatar_url: uploadRes.url });
        setUser(updatedUser);
      } catch (err) {
        alert("Failed to upload avatar");
      } finally {
        setIsUploading(false);
      }
    }
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
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-secondary shadow-xl relative overflow-hidden">
              <img alt="User avatar" className={`w-full h-full rounded-full object-cover border-4 border-surface-container-lowest ${isUploading ? 'opacity-50' : ''}`} src={user?.avatar_url || "https://ui-avatars.com/api/?name=" + user?.username} />
              {isUploading && <div className="absolute inset-0 flex items-center justify-center"><span className="material-symbols-outlined animate-spin text-on-primary">sync</span></div>}
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
            <button onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 p-2 bg-primary text-on-primary rounded-full shadow-lg transition-transform active:scale-95">
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">{user?.first_name ? `${user.first_name} ${user.last_name || ''}` : user?.username}</h1>
            <p className="font-body-md text-on-surface-variant">{business ? `Owner, ${business.name}` : 'No business yet'}</p>
            <div className="mt-sm inline-flex items-center gap-xs px-3 py-1 rounded-full bg-primary-container text-on-primary-container">
              <span className="material-symbols-outlined text-[14px]">{business ? 'verified' : 'new_releases'}</span>
              <span className="font-label-md text-label-md">{business ? 'Pro Plan' : 'Free Plan'}</span>
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
                <label className="font-label-md text-label-md text-outline">First Name</label>
                <input className="bg-surface-container-low px-md py-3 rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary transition-all" type="text" readOnly value={user?.first_name || ''} />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-outline">Last Name</label>
                <input className="bg-surface-container-low px-md py-3 rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary transition-all" type="text" readOnly value={user?.last_name || ''} />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-outline">Email Address</label>
                <input className="bg-surface-container-low px-md py-3 rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary transition-all" type="email" readOnly value={user?.email || ''} />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-outline">Phone Number</label>
                <input className="bg-surface-container-low px-md py-3 rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary transition-all" type="tel" readOnly value={user?.phone_number || ''} />
              </div>
            </div>
          </div>
        </section>

        {/* Business Settings Section */}
        <section className="flex flex-col gap-md">
          <div className="flex justify-between items-center px-1">
            <h2 className="font-title-lg text-title-lg text-on-surface-variant">Business Settings</h2>
            {!business && (
              <Link to="/create-business" className="font-label-md text-primary">Create</Link>
            )}
          </div>
          <div className="bg-surface-container rounded-xl shadow-sm overflow-hidden">
            {business ? (
              <>
                <button className="w-full flex items-center justify-between p-md active:bg-surface-container-highest transition-colors">
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                      <span className="material-symbols-outlined">payments</span>
                    </div>
                    <div className="text-left">
                      <p className="font-title-lg text-on-surface">Currency</p>
                      <p className="font-body-md text-on-surface-variant">{business.currency}</p>
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
                      <p className="font-body-md text-on-surface-variant">{business.type || 'Retail'}</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline">chevron_right</span>
                </button>
              </>
            ) : (
              <div className="p-md text-center">
                <p className="text-on-surface-variant">No business configured yet.</p>
                <Link to="/create-business" className="inline-block mt-3 px-4 py-2 bg-primary text-on-primary rounded-lg">Create Business</Link>
              </div>
            )}
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
