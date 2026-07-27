import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { api } from '../core/api';

export default function MyProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All Items');
  const navigate = useNavigate();
  const { business } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ['All Items', 'Electronics', 'Home Decor', 'Apparel', 'Fitness'];

  useEffect(() => {
    async function fetchProducts() {
      if (!business) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.get(`/businesses/${business.id}/products/`);
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [business]);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return <div className="p-margin animate-pulse text-on-surface-variant">Loading products...</div>;
  }
  
  if (!business) {
    return <div className="p-margin text-on-surface-variant">Please create a business profile first.</div>;
  }

  // Calculate stats
  const totalValue = products.reduce((acc, p) => acc + (p.price * (p.stock_quantity || 0)), 0);

  return (
    <div className="flex flex-col w-full">
      {/* Top Stats Bar */}
      <div className="px-margin py-md grid grid-cols-2 gap-md">
        <div className="bg-primary-container rounded-xl p-md flex flex-col gap-xs shadow-sm">
          <span className="font-label-md text-label-md text-on-primary-container opacity-80 uppercase tracking-wider">Total Items</span>
          <div className="flex items-end gap-xs">
            <span className="font-headline-md text-headline-md text-on-primary-container">{products.length}</span>
          </div>
        </div>
        <div className="bg-surface-container-high rounded-xl p-md flex flex-col gap-xs shadow-sm">
          <span className="font-label-md text-label-md text-on-surface-variant opacity-80 uppercase tracking-wider">Total Value</span>
          <div className="flex items-end gap-xs">
            <span className="font-headline-md text-headline-md text-on-surface">{business.currency} {totalValue.toLocaleString()}</span>
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
            <div key={product.id} className="bg-surface-container-lowest rounded-xl p-md flex gap-md shadow-sm group active:scale-[0.98] transition-transform">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-surface-container relative flex-shrink-0 flex items-center justify-center">
                {product.image_url ? (
                  <img className="w-full h-full object-cover" alt={product.name} src={product.image_url} />
                ) : (
                  <span className="material-symbols-outlined text-outline text-[32px]">image</span>
                )}
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div className="flex flex-col gap-xs">
                  <div className="flex justify-between items-start">
                    <span className="font-title-lg text-title-lg text-on-surface truncate">{product.name}</span>
                    <span className="font-title-lg text-title-lg text-primary">{business.currency} {product.price.toLocaleString()}</span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface-variant">Cost: {business.currency} {product.cost_price?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded bg-surface-variant text-on-surface-variant font-label-md text-[10px] uppercase tracking-wider flex items-center gap-1`}>
                    Stock: {product.stock_quantity ?? 'N/A'} {product.unit || ''}
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
