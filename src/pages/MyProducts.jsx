import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All Items');
  const navigate = useNavigate();

  const tabs = ['All Items', 'Electronics', 'Home Decor', 'Apparel', 'Fitness'];

  const products = [
    {
      name: 'Zenith Keyboard',
      price: '$149.00',
      sku: 'ZN-104-BL',
      category: 'Electronics',
      stockStatus: 'In Stock',
      stockCount: 42,
      stockColor: 'bg-green-100 text-green-700',
      dotColor: 'bg-green-600',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLZXMfSChB7bilJmRW63U7FR22YcGkc0RtzTjxSambu1dQArEivVo79Pb9YMiaFOLU-9cQxGbr7tutePjO-rqnhLyKiNI_3y6A8T6EXR-2OlHOU4afn9O0zyiNbIutFGAaDFD28_pRVreP9EEIVBTH46S6-JTBoDhT8TXu_V3xDr8gxPQvdc6D1eQF1VbsJA0T7yzaO5UjrCyp10DKWl3MUJqCvgBMrpMC51BCUNKThMzrnE63Hprxo_jSUdLCB2jYsfUluhF-bUQ'
    },
    {
      name: 'Lumina Vessel',
      price: '$89.00',
      sku: 'LV-VES-02',
      category: 'Home Decor',
      stockStatus: 'Low Stock',
      stockCount: 5,
      stockColor: 'bg-orange-100 text-orange-700',
      dotColor: 'bg-orange-600 animate-pulse',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqRoOcUf5uwVcrONbCSaeqz6nMdKJsRFZkcW41T-OTDv0OEKOByakPLID53iljpxNs5Vwu7vrmvaP1iMesswyF4ycAjO5bUzFpftwhDa11GcCZPLZ41LgFaKlIp-RmooSImAZcfFuIF2aPxeccoftphV7tiNEW5yFLMapKIayYyvxkCPrv0RUQCYtGGJhvDYbdSf9sd1U8nCYclMUkoFCT8g88c8lXPKAbsXn616JGX7bQKSVwrWvSqytU2_YqvFPbuEhZ0y4J8-M'
    },
    {
      name: 'Aura Headphones',
      price: '$299.00',
      sku: 'AR-WL-88',
      category: 'Electronics',
      stockStatus: 'Out of Stock',
      stockCount: 0,
      stockColor: 'bg-red-100 text-red-700',
      dotColor: 'bg-red-600',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7vYUd9eiijwduC5f_AYu5VRTcGlLNyT4Y1zclFXu-SF8jK-osbtA7IxIgPyTdduM3K0YjhG3j2ZIaHuVqKUdyOEmBFgkXWsz1Uq7JoDi7lQ-u3NeCGCm4h5n4cRH6fqLJM39nIImaFApZfnCqtUc_0yL6zZSNhkpHunHsATjmLmVBr_c3jN39G9MjV4VG-sA8WLuYWX_oOdsskj2q8MLoDhDZeCwPSAYMsXA1TjKwIOB88TkUgsqooi-2LdtrZKxGt2Q4M_fW05A'
    },
    {
      name: 'Stellar Watch',
      price: '$450.00',
      sku: 'ST-SW-01',
      category: 'Accessories',
      stockStatus: 'In Stock',
      stockCount: 12,
      stockColor: 'bg-green-100 text-green-700',
      dotColor: 'bg-green-600',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfUAx2Z4xxQOYce6mVrmyxWd7Z38zGAeUvhiTh1iZXrvxYM2Rqy0mY-cCeOrkvMX_58Ahqm1kCqCLnfD3dAa8wd8CVWXwMhTSIc7U7FK8DjCZBT1BpfCpYccLi1cV1fVizEHxVtJCO546N3Wa06rlRjUkp8KjbPRwjAmIF5XB59h15q13Vk-9MFEje9mHJCE7iClvQOJq0HM2YLZ9FAJDt_UTNpE1h2EfXF3pvz1-tLc3bq9PLzDLNBTEud7vDN-tyamHDCPEY4C4'
    }
  ];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All Items' || p.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Top Stats Bar */}
      <div className="px-margin py-md grid grid-cols-2 gap-md">
        <div className="bg-primary-container rounded-xl p-md flex flex-col gap-xs shadow-sm">
          <span className="font-label-md text-label-md text-on-primary-container opacity-80 uppercase tracking-wider">Total Items</span>
          <div className="flex items-end gap-xs">
            <span className="font-headline-md text-headline-md text-on-primary-container">1,284</span>
            <span className="font-label-md text-label-md text-on-primary-container mb-1 opacity-90">+12%</span>
          </div>
        </div>
        <div className="bg-surface-container-high rounded-xl p-md flex flex-col gap-xs shadow-sm">
          <span className="font-label-md text-label-md text-on-surface-variant opacity-80 uppercase tracking-wider">Total Value</span>
          <div className="flex items-end gap-xs">
            <span className="font-headline-md text-headline-md text-on-surface">$42.5k</span>
            <span className="material-symbols-outlined text-primary text-[18px] mb-1">trending_up</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Header */}
      <div className="px-margin flex flex-col gap-md sticky top-0 bg-background/95 backdrop-blur-md z-10 py-sm">
        <div className="flex items-center gap-sm">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
            <input 
              className="w-full bg-surface-container-lowest border-none rounded-xl py-3 pl-10 pr-4 font-body-md text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none shadow-sm" 
              placeholder="Search inventory..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-surface-container-high p-3 rounded-xl text-on-surface-variant hover:bg-surface-container-highest transition-colors">
            <span className="material-symbols-outlined text-[24px]">tune</span>
          </button>
        </div>
        {/* Category Tabs */}
        <div className="flex gap-sm overflow-x-auto pb-xs no-scrollbar">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full font-label-md whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-primary text-on-primary shadow-md shadow-primary/20' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory List */}
      <div className="px-margin mt-md flex flex-col gap-md">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, idx) => (
            <div key={idx} className="bg-surface-container-lowest rounded-xl p-md flex gap-md shadow-sm group active:scale-[0.98] transition-transform">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-surface-container relative flex-shrink-0">
                <img className="w-full h-full object-cover" alt={product.name} src={product.img} />
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div className="flex flex-col gap-xs">
                  <div className="flex justify-between items-start">
                    <span className="font-title-lg text-title-lg text-on-surface truncate">{product.name}</span>
                    <span className="font-title-lg text-title-lg text-primary">{product.price}</span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface-variant">SKU: {product.sku} • {product.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded ${product.stockColor} font-label-md text-[10px] uppercase tracking-wider flex items-center gap-1`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${product.dotColor}`}></span>
                    {product.stockStatus} {product.stockCount > 0 ? `(${product.stockCount})` : ''}
                  </span>
                  <button className="text-primary material-symbols-outlined">more_horiz</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-2xl px-margin text-center">
            <div className="w-32 h-32 mb-lg bg-surface-container rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-outline text-[48px]">inventory_2</span>
            </div>
            <span className="font-headline-md text-headline-md text-on-surface">No products found</span>
            <span className="font-body-md text-body-md text-on-surface-variant mt-sm">Try adjusting your search filters to find what you're looking for.</span>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => navigate('/add-product')}
        className="fixed bottom-24 right-margin w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center z-40 active:scale-90 transition-transform"
      >
        <span className="material-symbols-outlined text-[28px]">add</span>
      </button>
    </div>
  );
}
