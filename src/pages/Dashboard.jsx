import React from 'react';

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full">
      {/* Dynamic Welcome Header */}
      <div className="px-margin py-md flex justify-between items-end">
        <div className="flex flex-col">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Good Morning</span>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background">Welcome back, Sarah</h1>
        </div>
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border-2 border-background"></div>
          <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
        </div>
      </div>

      {/* Primary Balance Card */}
      <div className="px-margin mb-lg">
        <div className="relative overflow-hidden bg-primary p-lg rounded-[24px] shadow-xl shadow-primary/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-tertiary/20 rounded-full -ml-12 -mb-12 blur-xl"></div>
          <div className="relative z-10 flex flex-col gap-xs">
            <div className="flex items-center gap-sm">
              <span className="font-label-md text-label-md text-on-primary/80 uppercase">Total Net Balance</span>
              <span className="material-symbols-outlined text-[16px] text-on-primary/60">visibility</span>
            </div>
            <div className="flex items-baseline gap-xs">
              <span className="font-display-lg text-display-lg text-on-primary">MWK 128,400</span>
              <span className="font-title-lg text-title-lg text-on-primary/70">.50</span>
            </div>
            <div className="mt-md flex items-center gap-sm bg-white/15 w-fit px-sm py-1 rounded-full backdrop-blur-md">
              <span className="material-symbols-outlined text-[14px] text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
              <span className="font-label-md text-label-md text-on-primary">+12.4% this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="px-margin mb-xl">
        <div className="grid grid-cols-3 gap-md">
          <button className="flex flex-col items-center gap-sm group">
            <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container group-active:scale-95 transition-transform shadow-sm">
              <span className="material-symbols-outlined text-[28px]">mic</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant text-center">Record</span>
          </button>
          <button className="flex flex-col items-center gap-sm group">
            <div className="w-14 h-14 rounded-2xl bg-tertiary-container flex items-center justify-center text-on-tertiary-container group-active:scale-95 transition-transform shadow-sm">
              <span className="material-symbols-outlined text-[28px]">add_shopping_cart</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant text-center">Add Sale</span>
          </button>
          <button className="flex flex-col items-center gap-sm group">
            <div className="w-14 h-14 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary group-active:scale-95 transition-transform shadow-sm">
              <span className="material-symbols-outlined text-[28px]">currency_exchange</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant text-center">Forex</span>
          </button>
        </div>
      </div>

      {/* Business Insights Carousel */}
      <div className="mb-xl">
        <div className="px-margin flex justify-between items-center mb-md">
          <h2 className="font-title-lg text-title-lg text-on-background">Business Insights</h2>
          <span className="font-label-md text-label-md text-primary">View Report</span>
        </div>
        <div className="flex overflow-x-auto pb-md hide-scrollbar snap-x snap-mandatory">
          <div className="flex gap-md px-margin">
            {/* Sales Card */}
            <div className="snap-center shrink-0 w-[240px] p-md rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col gap-sm">
              <div className="flex justify-between items-start">
                <div className="p-xs bg-primary/10 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-[20px]">payments</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label-md text-label-md text-secondary">Target: 85%</span>
                  <div className="w-16 h-1 bg-surface-variant rounded-full mt-1">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-xs">
                <span className="font-label-md text-label-md text-on-surface-variant">Monthly Sales</span>
                <span className="font-headline-md text-headline-md text-on-background">MWK 128,400</span>
              </div>
            </div>

            {/* Profit Card */}
            <div className="snap-center shrink-0 w-[240px] p-md rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col gap-sm">
              <div className="flex justify-between items-start">
                <div className="p-xs bg-tertiary/10 rounded-lg">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">insights</span>
                </div>
                <svg className="w-12 h-12 -rotate-90">
                  <circle className="text-surface-variant" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
                  <circle className="text-tertiary" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125" strokeDashoffset="35" strokeWidth="4"></circle>
                </svg>
              </div>
              <div className="flex flex-col mt-xs">
                <span className="font-label-md text-label-md text-on-surface-variant">Profit Margin</span>
                <span className="font-headline-md text-headline-md text-on-background">32.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forex Overview Widget */}
      <div className="px-margin mb-lg">
        <div className="bg-surface-container-low rounded-2xl p-md border border-outline-variant/20">
          <div className="flex justify-between items-center mb-md">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">language</span>
              <h3 className="font-title-lg text-title-lg text-on-background">Live Forex</h3>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant bg-surface-variant px-sm py-0.5 rounded-full">Live Updates</span>
          </div>
          <div className="space-y-md">
            {/* USD/EUR */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-md">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-surface shadow-sm flex items-center justify-center font-bold text-[10px] border border-outline-variant">USD</div>
                  <div className="w-8 h-8 rounded-full bg-surface shadow-sm flex items-center justify-center font-bold text-[10px] border border-outline-variant">EUR</div>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-background">USD/EUR</p>
                  <p className="font-label-md text-[10px] text-on-surface-variant">Global Market</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-title-lg text-title-lg text-on-background">0.9241</p>
                <p className="font-label-md text-label-md text-error">-0.04%</p>
              </div>
            </div>

            {/* USD/ZAR */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-md">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-surface shadow-sm flex items-center justify-center font-bold text-[10px] border border-outline-variant">USD</div>
                  <div className="w-8 h-8 rounded-full bg-surface shadow-sm flex items-center justify-center font-bold text-[10px] border border-outline-variant">ZAR</div>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-background">USD/ZAR</p>
                  <p className="font-label-md text-[10px] text-on-surface-variant">Regional Rate</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-title-lg text-title-lg text-on-background">18.423</p>
                <p className="font-label-md text-label-md text-secondary">+1.12%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Empty State / "Moment of Delight" */}
      <div className="px-margin mt-md">
        <div className="flex items-center gap-md p-md bg-gradient-to-r from-primary-container/20 to-transparent rounded-xl">
          <div className="relative w-12 h-12 flex-shrink-0">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
            <div className="relative bg-primary rounded-full w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[24px]">auto_awesome</span>
            </div>
          </div>
          <div>
            <p className="font-title-lg text-title-lg text-on-primary-container">Smart Tip</p>
            <p className="font-body-md text-body-md text-on-surface-variant">Based on your sales, Tuesday is your peak performance day. Prepare stock!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
