import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { api } from '../core/api';

export default function AddProduct() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('electronics');
  const [price, setPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  
  const navigate = useNavigate();
  const { business } = useOutletContext();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!business) {
      alert("No active business selected.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let imageUrl = null;
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const uploadRes = await api.post('/uploads/', formData);
        imageUrl = uploadRes.url;
      }
      
      const payload = {
        name,
        description: description || `Product SKU: ${sku}, Category: ${category}`,
        price: parseFloat(price),
        cost_price: costPrice ? parseFloat(costPrice) : 0,
        stock_quantity: stock ? parseInt(stock, 10) : 0,
        image_url: imageUrl,
      };
      
      await api.post(`/businesses/${business.id}/products/`, payload);
      
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate('/products');
      }, 2000);
    } catch (err) {
      alert(err.message || 'Error creating product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full px-margin py-lg gap-lg">
      {/* Header Section with Contextual Illustration */}
      <div className="relative overflow-hidden rounded-xl bg-primary-container p-lg flex items-center justify-between shadow-md">
        <div className="flex flex-col gap-xs z-10">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-primary-container">Add New Product</h2>
          <p className="font-body-md text-body-md text-on-primary-container/80 max-w-[200px]">Expand your inventory and reach more customers.</p>
        </div>
        <div className="absolute right-[-20px] top-[-10px] opacity-20">
          <span className="material-symbols-outlined text-[120px] text-on-primary-container">inventory_2</span>
        </div>
      </div>

      {/* Form Container */}
      <form className="flex flex-col gap-lg" id="addProductForm" onSubmit={handleSubmit}>
        {/* Image Upload Zone */}
        <div className="flex flex-col gap-sm">
          <label className="font-label-md text-label-md text-on-surface-variant ml-1">Product Showcase</label>
          <div 
            className="relative group cursor-pointer overflow-hidden border-2 border-dashed border-outline-variant bg-surface-container-low rounded-xl h-48 flex flex-col items-center justify-center transition-all hover:bg-surface-container hover:border-primary"
            onClick={() => document.getElementById('fileInput').click()}
          >
            <input accept="image/*" className="hidden" id="fileInput" type="file" onChange={handleImageChange} />
            <div className={`flex flex-col items-center gap-sm pointer-events-none ${imagePreview ? 'opacity-0' : ''}`}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[32px]">add_a_photo</span>
              </div>
              <div className="text-center">
                <p className="font-title-lg text-title-lg text-on-surface">Upload Image</p>
                <p className="font-label-md text-label-md text-on-surface-variant">JPG, PNG up to 5MB</p>
              </div>
            </div>
            {imagePreview && (
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imagePreview})` }}></div>
            )}
          </div>
        </div>

        {/* General Info Card */}
        <div className="bg-surface-container-lowest rounded-xl p-md shadow-sm flex flex-col gap-md">
          <div className="flex flex-col gap-sm">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="prod_name">Product Name*</label>
            <input className="w-full h-12 px-md rounded-lg bg-surface-container-low text-on-surface font-body-md outline-none focus:ring-2 focus:ring-primary/20 border-transparent transition-all" id="prod_name" placeholder="e.g. Wireless Noise Cancelling Headphones" required type="text" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-sm">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="sku">SKU*</label>
              <input className="w-full h-12 px-md rounded-lg bg-surface-container-low text-on-surface font-body-md outline-none focus:ring-2 focus:ring-primary/20 border-transparent transition-all" id="sku" placeholder="PH-10293" required type="text" value={sku} onChange={e => setSku(e.target.value)} />
            </div>
            <div className="flex flex-col gap-sm">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="category">Category</label>
              <div className="relative">
                <select className="w-full h-12 px-md rounded-lg bg-surface-container-low text-on-surface font-body-md outline-none appearance-none focus:ring-2 focus:ring-primary/20" id="category" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="electronics">Electronics</option>
                  <option value="home-decor">Home Decor</option>
                  <option value="accessories">Accessories</option>
                  <option value="apparel">Apparel</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Stock Card */}
        <div className="bg-surface-container-lowest rounded-xl p-md shadow-sm flex flex-col gap-md">
          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-sm">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="price">Price*</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-on-surface-variant font-body-md">{business?.currency || '$'}</span>
                <input className="w-full h-12 pl-12 pr-md rounded-lg bg-surface-container-low text-on-surface font-body-md outline-none focus:ring-2 focus:ring-primary/20 border-transparent transition-all" id="price" placeholder="0.00" required step="0.01" type="number" value={price} onChange={e => setPrice(e.target.value)} />
              </div>
            </div>
            <div className="flex flex-col gap-sm">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="cost_price">Cost Price</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-on-surface-variant font-body-md">{business?.currency || '$'}</span>
                <input className="w-full h-12 pl-12 pr-md rounded-lg bg-surface-container-low text-on-surface font-body-md outline-none focus:ring-2 focus:ring-primary/20 border-transparent transition-all" id="cost_price" placeholder="0.00" step="0.01" type="number" value={costPrice} onChange={e => setCostPrice(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-sm mt-2">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="stock">Initial Stock</label>
            <input className="w-full h-12 px-md rounded-lg bg-surface-container-low text-on-surface font-body-md outline-none focus:ring-2 focus:ring-primary/20 border-transparent transition-all" id="stock" placeholder="0" type="number" value={stock} onChange={e => setStock(e.target.value)} />
          </div>
        </div>

        {/* Description Card */}
        <div className="bg-surface-container-lowest rounded-xl p-md shadow-sm flex flex-col gap-sm">
          <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="description">Product Description</label>
          <textarea className="w-full p-md rounded-lg bg-surface-container-low text-on-surface font-body-md outline-none focus:ring-2 focus:ring-primary/20 border-transparent transition-all resize-none" id="description" placeholder="Describe the key features, materials, and benefits..." rows="4" value={description} onChange={e => setDescription(e.target.value)}></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-md mt-sm">
          <button 
            disabled={isSubmitting}
            className="w-full h-14 bg-primary text-on-primary rounded-xl font-title-lg text-title-lg shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-sm disabled:opacity-80" 
            type="submit"
          >
            {isSubmitting ? (
              <><span className="material-symbols-outlined animate-spin">sync</span> Saving...</>
            ) : (
              <><span className="material-symbols-outlined">save</span> Save Product</>
            )}
          </button>
          <button 
            type="button"
            className="w-full h-14 bg-surface-container-high text-on-surface-variant rounded-xl font-title-lg text-title-lg active:scale-[0.98] transition-transform"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Success Toast */}
      <div className={`fixed bottom-24 left-margin right-margin bg-inverse-surface text-inverse-on-surface p-md rounded-xl shadow-xl flex items-center gap-md transform transition-transform duration-300 pointer-events-none z-50 ${showToast ? 'translate-y-0' : 'translate-y-32'}`}>
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary-fixed">
          <span className="material-symbols-outlined">check_circle</span>
        </div>
        <div className="flex flex-col">
          <p className="font-title-lg text-title-lg">Product Added</p>
          <p className="font-label-md text-label-md opacity-80">Inventory updated successfully.</p>
        </div>
      </div>
    </div>
  );
}
