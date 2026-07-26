import React, { useState } from 'react';

export default function Transactions() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isVoiceOverlayOpen, setIsVoiceOverlayOpen] = useState(false);

  const filters = ['All', 'Income', 'Expenses', 'Subscriptions'];

  const transactions = [
    { date: 'Today, Oct 24', items: [
      { name: 'Whole Foods Market', category: 'Groceries', time: '10:45 AM', amount: '-$84.20', type: 'expense', icon: 'shopping_cart', color: 'bg-secondary-container/30 text-secondary' },
      { name: 'Salary Deposit', category: 'Income', time: '09:00 AM', amount: '+$3,450.00', type: 'income', icon: 'payments', color: 'bg-tertiary-container/30 text-tertiary' }
    ]},
    { date: 'Yesterday, Oct 23', items: [
      { name: 'Blue Bottle Coffee', category: 'Food & Drink', time: '03:12 PM', amount: '-$6.50', type: 'expense', icon: 'local_cafe', color: 'bg-surface-variant text-on-surface-variant' },
      { name: 'Uber Trip', category: 'Transport', time: '01:45 PM', amount: '-$22.40', type: 'expense', icon: 'directions_car', color: 'bg-secondary-container/30 text-secondary' }
    ]}
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Header & Summary Section */}
      <section className="px-margin pt-4 pb-6 flex flex-col gap-md">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Financial Flow</span>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">History</h2>
          </div>
          <div className="bg-primary-container text-on-primary-container px-4 py-2 rounded-xl flex items-center gap-xs shadow-sm">
            <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
            <span className="font-title-lg text-title-lg">$4,285.50</span>
          </div>
        </div>

        {/* Mini Sparkline visualization */}
        <div className="w-full h-16 bg-surface-container rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex-1 h-full flex items-end gap-1">
            <div className="w-full bg-primary/20 rounded-t-sm transition-all duration-500" style={{ height: '40%' }}></div>
            <div className="w-full bg-primary/20 rounded-t-sm transition-all duration-500" style={{ height: '65%' }}></div>
            <div className="w-full bg-primary/20 rounded-t-sm transition-all duration-500" style={{ height: '45%' }}></div>
            <div className="w-full bg-primary/20 rounded-t-sm transition-all duration-500" style={{ height: '85%' }}></div>
            <div className="w-full bg-primary/20 rounded-t-sm transition-all duration-500" style={{ height: '30%' }}></div>
            <div className="w-full bg-primary/60 rounded-t-sm transition-all duration-500" style={{ height: '95%' }}></div>
            <div className="w-full bg-primary/20 rounded-t-sm transition-all duration-500" style={{ height: '50%' }}></div>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-label-md text-label-md text-on-surface-variant">Weekly Avg.</span>
            <span className="font-title-lg text-title-lg text-primary">+12%</span>
          </div>
        </div>
      </section>

      {/* Filter Chips */}
      <div className="px-margin mb-md overflow-x-auto no-scrollbar flex items-center gap-sm">
        {filters.map(filter => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`filter-chip px-6 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap ${activeFilter === filter ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container text-on-surface-variant'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      {activeFilter === 'Subscriptions' ? (
        <div className="flex flex-col items-center justify-center px-xl py-2xl text-center">
          <div className="w-32 h-32 mb-lg bg-surface-container rounded-full flex items-center justify-center overflow-hidden">
            <img className="w-24 h-24 object-contain opacity-80" alt="Empty state character" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA_nBxvPQ-ferD33tq3FTQmDgFn7ADP-hGJHGnBeTJzVY1fLQoMLw5Ngy8aluTPrOrtj3VqyxllksBLRViwgqXvv1cLFWcvr6MJRkzfM0vJtcmlJa6-o2O3qwYxZBX5mr-PHMcHAQbbB3IHDUMZd-Lhiq5UOX_t0Pry3XKRagTGDL1Dk-_fgTzK2exsGa8Ejnm4vRvMJYfkC_hukzIBScYBf7xnoPoGSFajgdSZg8IOlDHLz2AsOGaB-rZrUyACBiPyeK56tZ5g_Y" />
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">No matches found</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Looks like this category is empty for now. Try clearing your filters or logging a new expense!</p>
        </div>
      ) : (
        <section className="flex flex-col">
          {transactions.map(group => (
            <React.Fragment key={group.date}>
              {/* Date Header */}
              <div className="px-margin py-2 bg-surface-container-low">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase">{group.date}</span>
              </div>
              <div className="flex flex-col bg-surface-container-lowest">
                {group.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-md px-margin py-md border-b border-outline-variant/30 active:bg-surface-container transition-colors">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}>
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-title-lg text-title-lg text-on-surface truncate">{item.name}</p>
                      <p className="font-body-md text-body-md text-on-surface-variant">{item.category} • {item.time}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-title-lg text-title-lg ${item.type === 'expense' ? 'text-error' : 'text-primary'}`}>{item.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </section>
      )}

      {/* Voice FAB */}
      <div className="fixed bottom-24 right-margin z-40">
        <button 
          onClick={() => setIsVoiceOverlayOpen(true)}
          className="group relative w-16 h-16 bg-primary text-on-primary rounded-full shadow-xl flex items-center justify-center transition-all active:scale-90 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 scale-0 group-active:scale-150 transition-transform duration-500 rounded-full"></div>
          <span className="material-symbols-outlined text-[32px] relative z-10">mic</span>
          <div className="absolute inset-0 rounded-full border-4 border-primary/40 animate-ping"></div>
        </button>
      </div>

      {/* Voice Interaction Toast (Overlay) */}
      <div className={`fixed inset-0 bg-inverse-surface/90 backdrop-blur-sm z-[60] flex flex-col items-center justify-center text-center px-xl transition-opacity duration-300 ${isVoiceOverlayOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center gap-lg">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-[0_0_40px_rgba(81,64,179,0.5)]">
            <span className="material-symbols-outlined text-on-primary text-[48px] animate-pulse">mic</span>
          </div>
          <div className="flex flex-col gap-sm">
            <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-inverse-on-surface">Listening...</h4>
            <p className="font-body-lg text-body-lg text-inverse-on-surface/70">"I just spent $15 on lunch at the bistro"</p>
          </div>
          <div className="flex gap-1 h-12 items-end">
            <div className="w-1.5 bg-primary rounded-full animate-bounce h-1/2" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1.5 bg-primary rounded-full animate-bounce h-3/4" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1.5 bg-primary rounded-full animate-bounce h-full" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-1.5 bg-primary rounded-full animate-bounce h-2/3" style={{ animationDelay: '0.4s' }}></div>
            <div className="w-1.5 bg-primary rounded-full animate-bounce h-1/2" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <button 
            onClick={() => setIsVoiceOverlayOpen(false)}
            className="mt-xl font-label-md text-label-md text-on-primary bg-primary/20 px-8 py-3 rounded-full uppercase tracking-widest border border-primary/30"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
