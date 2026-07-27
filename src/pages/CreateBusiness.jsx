import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { api } from '../core/api';

export default function CreateBusiness() {
  const { setBusiness } = useOutletContext();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState('Retail');
  const [currency, setCurrency] = useState('MWK');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    setLoading(true);
    
    try {
      const res = await api.post('/businesses/', { name, type, currency });
      setBusiness(res); // Update layout state
      navigate('/dashboard');
    } catch (err) {
      alert(err.message || 'Error creating business');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full px-margin py-lg gap-lg">
      <div className="flex flex-col gap-xs">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Create your business</h1>
        <p className="font-body-md text-on-surface-variant">Set up your store to start tracking sales and products.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-md">
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-outline">Business Name</label>
          <input className="bg-surface-container px-md py-4 rounded-xl font-body-md outline-none focus:ring-2 focus:ring-primary" type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sarah's Boutique" />
        </div>
        
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-outline">Business Type</label>
          <select className="bg-surface-container px-md py-4 rounded-xl font-body-md outline-none focus:ring-2 focus:ring-primary" value={type} onChange={e => setType(e.target.value)}>
            <option value="Retail">Retail</option>
            <option value="Wholesale">Wholesale</option>
            <option value="Services">Services</option>
            <option value="Food & Beverage">Food & Beverage</option>
          </select>
        </div>
        
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-outline">Currency</label>
          <select className="bg-surface-container px-md py-4 rounded-xl font-body-md outline-none focus:ring-2 focus:ring-primary" value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="MWK">MWK - Malawian Kwacha</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
        </div>
        
        <div className="mt-lg flex gap-md">
          <button type="submit" disabled={loading} className="flex-1 py-4 bg-primary text-on-primary rounded-xl font-title-lg">
            {loading ? 'Creating...' : 'Create Business'}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="py-4 px-lg bg-surface-variant text-on-surface-variant rounded-xl font-title-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
