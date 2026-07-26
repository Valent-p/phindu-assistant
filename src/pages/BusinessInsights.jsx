import React from 'react';

export default function BusinessInsights() {
  return (
    <div className="flex flex-col w-full">
      {/* Interactive Header Summary */}
      <section className="px-margin py-md">
        <div className="flex items-end justify-between mb-sm">
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Revenue</span>
            <div className="flex items-center gap-sm">
              <h1 className="font-display-lg text-display-lg text-primary">$128,430</h1>
              <span className="flex items-center text-[12px] font-bold text-secondary bg-secondary-container/20 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                12%
              </span>
            </div>
          </div>
          <button className="bg-surface-container-high p-2 rounded-xl text-primary active:scale-95 transition-transform">
            <span className="material-symbols-outlined">calendar_today</span>
          </button>
        </div>
      </section>

      {/* Sales Performance Sparkline Card */}
      <div className="px-margin mb-lg">
        <div className="bg-surface-container-lowest p-md rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-md">
            <span className="font-title-lg text-title-lg text-on-surface">Sales Performance</span>
            <span className="font-label-md text-label-md text-outline">Last 7 Days</span>
          </div>
          {/* SVG Sparkline Chart */}
          <div className="relative h-32 w-full mb-md">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2"></stop>
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path d="M0,80 Q50,75 80,40 T160,50 T240,20 T320,60 T400,30 V100 H0 Z" fill="url(#chartGradient)"></path>
              <path d="M0,80 Q50,75 80,40 T160,50 T240,20 T320,60 T400,30" fill="none" stroke="#5140b3" strokeLinecap="round" strokeWidth="3"></path>
              {/* Animated Pulse Dot */}
              <circle cx="400" cy="30" fill="#5140b3" r="4">
                <animate attributeName="r" dur="2s" repeatCount="indefinite" values="4;6;4"></animate>
              </circle>
            </svg>
          </div>
          <div className="flex justify-between text-on-surface-variant font-label-md">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      </div>

      {/* AI Insights Carousel (Bento Style) */}
      <section className="mb-lg">
        <div className="px-margin mb-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <h2 className="font-headline-md text-headline-md text-on-surface">Phindu AI Forecast</h2>
        </div>
        <div className="flex overflow-x-auto gap-md px-margin pb-2 no-scrollbar snap-x">
          {/* Card 1 */}
          <div className="min-w-[280px] bg-primary-container p-md rounded-2xl text-on-primary-container snap-center flex flex-col justify-between">
            <div className="mb-lg">
              <div className="flex items-center gap-sm mb-xs">
                <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                <span className="font-label-md uppercase tracking-tight">Inventory Alert</span>
              </div>
              <p className="font-title-lg text-title-lg leading-tight">"Smart Electronics" likely to stock out in 4 days.</p>
            </div>
            <button className="bg-on-primary-container text-primary-container py-2 px-4 rounded-xl font-label-md self-start active:opacity-80">Refill Stock</button>
          </div>
          {/* Card 2 */}
          <div className="min-w-[280px] bg-tertiary-container p-md rounded-2xl text-on-tertiary-container snap-center flex flex-col justify-between">
            <div className="mb-lg">
              <div className="flex items-center gap-sm mb-xs">
                <span className="material-symbols-outlined text-[20px]">campaign</span>
                <span className="font-label-md uppercase tracking-tight">Growth Insight</span>
              </div>
              <p className="font-title-lg text-title-lg leading-tight">Weekend promos could boost 'Home Décor' by 18%.</p>
            </div>
            <button className="bg-on-tertiary-container text-tertiary-container py-2 px-4 rounded-xl font-label-md self-start active:opacity-80">Launch Campaign</button>
          </div>
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="px-margin mb-lg">
        <div className="flex justify-between items-center mb-md">
          <h2 className="font-headline-md text-headline-md text-on-surface">Top Products</h2>
          <button className="text-primary font-label-md">View All</button>
        </div>
        <div className="space-y-sm">
          {/* Product Item */}
          <div className="flex items-center gap-md bg-surface-container-low p-sm rounded-xl">
            <img className="w-16 h-16 rounded-lg object-cover bg-surface-variant" alt="Headphones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwqk5o_M2xOmQTeHoBWmDXC1Whk7I0Eeq6NKJVJp68Kia_Iv_Vc5EfsJDGEZKERNxTsL1O1GioyVDMRHqN4_KRPYnUPyX7jRMrihos2Si4yDAHHTwwpJFMkaVvUV9dNK7BN2nQy6bnQzN08K7wb3sF86XiTlCU7Gdx0KfaK9MOJFuI6Z5JJp14gwoQpBaHTVTni07SXezwTCkaDd66V0WCIKRVg-bVAOdiCpWufQ2EHuS2dVSTPFlzZHFbBXwJ-ZK1OXJlSjXKUIE" />
            <div className="flex-1 min-w-0">
              <h3 className="font-title-lg text-title-lg text-on-surface truncate">Ultra-Link X1 Headphones</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">1,240 units sold</p>
            </div>
            <div className="text-right">
              <span className="font-title-lg text-title-lg text-primary">$49k</span>
              <p className="font-label-md text-secondary">+5.2%</p>
            </div>
          </div>
          {/* Product Item */}
          <div className="flex items-center gap-md bg-surface-container-low p-sm rounded-xl">
            <img className="w-16 h-16 rounded-lg object-cover bg-surface-variant" alt="Watch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvdsJq7K5Ho14eUbAGGsfLhEpryggM6qxNTHnGtuh4KDj8Tj_CPFJ8z9uT0Ue5_JoLbYOvELOj6jN-OMJTnWJBEBms_h1L5tcJ0RgbH-g-jaLiKQgLUOIzC3bBe65PlsIaU1hb2LYoUm1vqMG_XR4w1MWoryUsWrkELD8rEnLQrTQhCzaqNrvoWKDMaRH9ZScQJleGO2mv5gMDz66lvX3VV2PGzTXFn9wxC7HwGwvo18vbKzaPkB8rKR3CeqtcGIHx0QFrjqS9yik" />
            <div className="flex-1 min-w-0">
              <h3 className="font-title-lg text-title-lg text-on-surface truncate">Chronos Pro Watch</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">892 units sold</p>
            </div>
            <div className="text-right">
              <span className="font-title-lg text-title-lg text-primary">$32k</span>
              <p className="font-label-md text-secondary">+12.8%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Profit Margin Analysis */}
      <section className="px-margin">
        <div className="bg-surface-container-highest/50 p-md rounded-2xl">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-md">Margin by Category</h2>
          <div className="space-y-md">
            {/* Category Bar */}
            <div className="space-y-xs">
              <div className="flex justify-between font-label-md text-on-surface-variant uppercase">
                <span>Electronics</span>
                <span className="text-on-surface font-bold">24%</span>
              </div>
              <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '24%' }}></div>
              </div>
            </div>
            {/* Category Bar */}
            <div className="space-y-xs">
              <div className="flex justify-between font-label-md text-on-surface-variant uppercase">
                <span>Apparel</span>
                <span className="text-on-surface font-bold">48%</span>
              </div>
              <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full transition-all duration-1000" style={{ width: '48%' }}></div>
              </div>
            </div>
            {/* Category Bar */}
            <div className="space-y-xs">
              <div className="flex justify-between font-label-md text-on-surface-variant uppercase">
                <span>Home Office</span>
                <span className="text-on-surface font-bold">35%</span>
              </div>
              <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-tertiary rounded-full transition-all duration-1000" style={{ width: '35%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Background Element */}
      <div className="fixed top-1/2 left-0 -z-10 opacity-10 pointer-events-none">
        <svg height="400" viewBox="0 0 200 200" width="400" xmlns="http://www.w3.org/2000/svg">
          <path d="M44.7,-76.4C58.3,-69.2,70.1,-58.5,78.5,-45.6C86.9,-32.7,91.9,-17.6,91.6,-2.4C91.4,12.7,85.9,28,77.5,41.4C69.1,54.7,57.7,66.1,44.3,73.6C30.9,81.1,15.5,84.7,0.3,84.2C-14.8,83.7,-29.6,79.1,-43.3,71.7C-57,64.2,-69.5,53.8,-77.9,40.8C-86.4,27.8,-90.7,12.2,-89.9,-3C-89,-18.2,-83,,-32.5,-73.8,-44.6C-64.6,-56.7,-52.1,-66.6,-38.5,-73.8C-24.9,-81,-12.4,-85.5,1.2,-87.6C14.8,-89.7,29.7,-89.3,44.7,-76.4Z" fill="#5140B3" transform="translate(100 100)"></path>
        </svg>
      </div>
    </div>
  );
}
