import React, { useState, useEffect } from 'react';

export default function Reports() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('Last 30 Days');

  const tabs = ['Last 30 Days', 'Quarterly', 'Year to Date', 'Custom'];

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Interactive Header & Date Filter */}
      <div className="px-margin mb-lg flex flex-col gap-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Performance Overview</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Analytics Dashboard</h2>
          </div>
          <button 
            onClick={toggleTheme}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all active:scale-95 ${isDark ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-primary'}`}
          >
            <span className="material-symbols-outlined">{isDark ? 'light_mode' : 'dark_mode'}</span>
          </button>
        </div>
        <div className="flex gap-sm overflow-x-auto pb-2 -mx-margin px-margin no-scrollbar">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-md py-2 rounded-full font-label-md whitespace-nowrap flex items-center gap-1 ${activeTab === tab ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}
            >
              {tab === 'Custom' && <span className="material-symbols-outlined text-[16px]">calendar_today</span>}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Bento Grid */}
      <div className="px-margin grid grid-cols-2 gap-gutter mb-lg">
        <div className="bg-primary-container/10 p-md rounded-2xl flex flex-col gap-xs">
          <div className="flex items-center gap-xs text-primary">
            <span className="material-symbols-outlined text-[18px]">trending_up</span>
            <span className="font-label-md text-label-md">Avg. Margin</span>
          </div>
          <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">32.4%</span>
          <span className="font-label-md text-label-md text-primary">+2.1% vs prev.</span>
        </div>
        <div className="bg-tertiary-container/10 p-md rounded-2xl flex flex-col gap-xs">
          <div className="flex items-center gap-xs text-tertiary">
            <span className="material-symbols-outlined text-[18px]">account_balance</span>
            <span className="font-label-md text-label-md">Break-even</span>
          </div>
          <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">$14.2k</span>
          <span className="font-label-md text-label-md text-on-surface-variant">82% Achieved</span>
        </div>
      </div>

      {/* Profit Margin Analysis (SVG Chart) */}
      <div className="px-margin mb-lg">
        <div className="bg-surface-container-lowest p-lg rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-md">
            <h3 className="font-title-lg text-title-lg text-on-surface">Profit Margin Trend</h3>
            <span className="material-symbols-outlined text-on-surface-variant">info</span>
          </div>
          <div className="h-48 w-full relative">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
              <defs>
                <linearGradient id="marginGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#5140b3" stopOpacity="0.2"></stop>
                  <stop offset="100%" stopColor="#5140b3" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path d="M0,120 Q50,110 100,80 T200,60 T300,90 T400,40 L400,150 L0,150 Z" fill="url(#marginGradient)"></path>
              <path d="M0,120 Q50,110 100,80 T200,60 T300,90 T400,40" fill="none" stroke="#5140b3" strokeLinecap="round" strokeWidth="3"></path>
              <circle cx="400" cy="40" fill="#5140b3" r="4"></circle>
            </svg>
            <div className="absolute top-4 right-0 bg-primary text-on-primary px-sm py-xs rounded-lg text-[10px] font-bold">Current: 32.4%</div>
          </div>
          <div className="flex justify-between mt-sm">
            <span className="font-label-md text-on-surface-variant">Week 1</span>
            <span className="font-label-md text-on-surface-variant">Week 2</span>
            <span className="font-label-md text-on-surface-variant">Week 3</span>
            <span className="font-label-md text-on-surface-variant">Week 4</span>
          </div>
        </div>
      </div>

      {/* Sales Forecasting & Break-even Hybrid */}
      <div className="px-margin mb-lg">
        <div className="bg-surface-container-low p-lg rounded-3xl">
          <h3 className="font-title-lg text-title-lg text-on-surface mb-md">Sales Forecast</h3>
          <div className="flex items-end gap-2 h-32 mb-md">
            <div className="flex-1 bg-primary/20 rounded-t-lg transition-all duration-700 animate-bar" style={{ height: '40%' }}></div>
            <div className="flex-1 bg-primary/20 rounded-t-lg transition-all duration-700 animate-bar" style={{ height: '60%' }}></div>
            <div className="flex-1 bg-primary/20 rounded-t-lg transition-all duration-700 animate-bar" style={{ height: '55%' }}></div>
            <div className="flex-1 bg-primary rounded-t-lg relative group transition-all duration-700 animate-bar" style={{ height: '85%' }}>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded">Expected</div>
            </div>
            <div className="flex-1 bg-tertiary-container/40 border-2 border-dashed border-tertiary rounded-t-lg transition-all duration-700 animate-bar" style={{ height: '95%' }}></div>
          </div>
          <div className="flex items-center gap-md p-md bg-surface-container-highest rounded-xl">
            <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">rocket_launch</span>
            </div>
            <div className="flex flex-col">
              <span className="font-body-md text-body-md text-on-surface">Break-even target: <span className="font-bold">$18,500</span></span>
              <span className="font-label-md text-label-md text-on-surface-variant">Forecast suggests hit by Oct 24th</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Products with Sparklines */}
      <div className="px-margin mb-xl">
        <div className="flex items-center justify-between mb-md">
          <h3 className="font-title-lg text-title-lg text-on-surface">Top Sellers</h3>
          <button className="text-primary font-label-md">View All</button>
        </div>
        <div className="flex flex-col gap-sm">
          {/* Item 1 */}
          <div className="flex items-center gap-md p-md bg-surface-container-lowest rounded-2xl shadow-sm">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img className="w-full h-full object-cover" alt="Keyboard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy7DitWZ09yoDDaApi2M1Tdoscy6TjqcKvGQv0dhiRCTrB5OeatbD8FZCFSC8qZ6sGLKRyp7wlb37BXXW_CzdPGrYSAWjtV03x2Mb4Ci4nHbol3NMxUQxEMDmTnHrLE06r0sqQj1PKHydjZGLl5JQPLE94XoIDIjrtMi4M0gLSUutBx2vQpQx2AZf-2W2N7YMxEOk29YS7mn7eAJwgd0cHpZTC5LQ30XiK4b4PZrg6pDphiqkdLuAKdWboNSnAWN7ATTgdQSwWiAo" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-title-lg text-body-lg text-on-surface truncate">Zenith Keyboard</p>
              <p className="font-label-md text-label-md text-on-surface-variant">124 sold this month</p>
            </div>
            <div className="w-16 h-8">
              <svg className="w-full h-full" viewBox="0 0 100 40">
                <path d="M0,35 Q20,30 40,10 T70,15 T100,5" fill="none" stroke="#5140b3" strokeLinecap="round" strokeWidth="2"></path>
              </svg>
            </div>
          </div>
          {/* Item 2 */}
          <div className="flex items-center gap-md p-md bg-surface-container-lowest rounded-2xl shadow-sm">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img className="w-full h-full object-cover" alt="Vessel" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjyXvIvtqZqRGjsYC_bBPR4kbZUapyW2N0jLbfu7QIZCERM3cJmCrwcew22YJA5eyYRCH0hCm4qEcHfzJrUzinou6qkVQYqjHdieAYLOoVCr3QgeV2GBsuAzyLLVGmOEmqeS1XgcMciJABxQ9dGy1M54t8UQ5YvH-95wNfsFt0qNaS5xXXZNLKuDzqvD4-cDozQ_cIK0GamF7TDwtyyHmwTjwZtPx-HhkF3se7cQ_pB6cxBQSv7qNg5R6wIRjsXA1aP3fsd2HOP2A" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-title-lg text-body-lg text-on-surface truncate">Lumina Vessel</p>
              <p className="font-label-md text-label-md text-on-surface-variant">98 sold this month</p>
            </div>
            <div className="w-16 h-8">
              <svg className="w-full h-full" viewBox="0 0 100 40">
                <path d="M0,38 Q20,35 40,30 T70,10 T100,12" fill="none" stroke="#763792" strokeLinecap="round" strokeWidth="2"></path>
              </svg>
            </div>
          </div>
          {/* Item 3 */}
          <div className="flex items-center gap-md p-md bg-surface-container-lowest rounded-2xl shadow-sm">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img className="w-full h-full object-cover" alt="Headphones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUaazrRNDL2tAoUmzO9zefJkPC1Q66u6xidxhM9Bazr544REOOa6i3nsMHnFzLovjJmKBIVwKAMBlJ4SYW2QJP1fvUQAkZ66Zodz_6v0TGft_qgv3RI53jFutJI2V_h4FatOxVc_lhffxll1ki5UWCkp_KxLIRp3DuzTBtN_4nNVGy1ZZfkoduHHnb0b9n4UNdrcrqzVhgRHGB9Hjika76B90bXM_zzPJts52mtW3WRAyVT4AftKf3OlCZDEHd0C7j8SmIjUOoYcA" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-title-lg text-body-lg text-on-surface truncate">Aura Headphones</p>
              <p className="font-label-md text-label-md text-on-surface-variant">82 sold this month</p>
            </div>
            <div className="w-16 h-8">
              <svg className="w-full h-full" viewBox="0 0 100 40">
                <path d="M0,20 Q20,25 40,22 T70,30 T100,10" fill="none" stroke="#005fac" strokeLinecap="round" strokeWidth="2"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Abstract Footer Insight */}
      <div className="px-margin mb-xl">
        <div className="relative overflow-hidden bg-primary p-lg rounded-3xl text-on-primary">
          <div className="relative z-10 flex flex-col gap-xs">
            <h4 className="font-headline-md text-headline-md">Smart Insight</h4>
            <p className="font-body-md text-body-md opacity-90">Your inventory turnover is 15% higher than industry average. Consider increasing stock for 'Top Sellers' to avoid potential stockouts in Q4.</p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-on-primary/10 rounded-full blur-2xl"></div>
          <div className="absolute right-4 top-4 opacity-20">
            <span className="material-symbols-outlined text-[64px]">lightbulb</span>
          </div>
        </div>
      </div>
    </div>
  );
}
