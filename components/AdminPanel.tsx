
import React, { useState, useRef } from 'react';
import { Product, Order, OrderStatus, Category, MembershipRequest, Member } from '../types';
import { 
  Plus, Trash2, Edit2, X, Settings, Layout, LogOut, 
  ShoppingCart, Eye, User, Users, Phone, MapPin, Flame, Link2, Upload, Crown, Copy, Check, MessageSquare, Info, ShoppingBag, FileText, CheckCircle2, XCircle, Building2, LayoutGrid, Image as ImageIcon, Save, Globe, Receipt, Search,
  Banknote, Truck, Instagram, Facebook, Twitter, MessageCircle, Share2
} from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  membershipRequests: MembershipRequest[];
  onApproveMembership: (id: string, approve: boolean) => void;
  members: Member[];
  onRemoveMember: (id: string) => void;
  siteConfig: { 
    heroTitle: string; 
    heroTagline: string;
    heroImageUrl: string;
    promoBannerUrl: string;
    promoBannerTitle: string;
    lookbookImageUrl: string;
    lookbookTitle: string;
    socialLinks: {
      instagram: string;
      facebook: string;
      twitter: string;
      whatsapp: string;
    }
  };
  setSiteConfig: (config: any) => void;
  onExit: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  products, setProducts, 
  categories, setCategories,
  orders, setOrders, 
  membershipRequests,
  onApproveMembership,
  members,
  onRemoveMember,
  siteConfig, setSiteConfig, 
  onExit 
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'membership-requests' | 'active-members' | 'cms' | 'socials'>('products');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // CMS & Social Local State
  const [cmsConfig, setCmsConfig] = useState(siteConfig);

  // Form States for Products
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({ 
    name: '', price: 0, imageUrl: '', category: 'T-Shirts', stock: 0, rewardPoints: 0, isBestSelling: false 
  });

  const productFileRef = useRef<HTMLInputElement>(null);
  const heroFileRef = useRef<HTMLInputElement>(null);
  const promoFileRef = useRef<HTMLInputElement>(null);

  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setProductForm(prev => ({ ...prev, imageUrl: reader.result as string }));
    }
  };

  const handleCMSImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'heroImageUrl' | 'promoBannerUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setCmsConfig(prev => ({ ...prev, [field]: reader.result as string }));
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...editingProduct, ...productForm } as Product : p));
    } else {
      setProducts([...products, { ...productForm, id: 'p' + Date.now().toString() } as Product]);
    }
    closeProductModal();
  };

  const handleSaveSettings = () => {
    setSiteConfig(cmsConfig);
    alert("Website configurations updated successfully!");
  };

  const closeProductModal = () => {
    setEditingProduct(null);
    setIsAddingProduct(false);
    setProductForm({ name: '', price: 0, imageUrl: '', category: 'T-Shirts', stock: 0, rewardPoints: 0, isBestSelling: false });
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status } : o);
    setOrders(updatedOrders);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status });
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.phone.includes(searchTerm)
  );

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch(status) {
      case 'Pending': return 'bg-zinc-800 text-zinc-400 border-zinc-700';
      case 'Processing': return 'bg-accent/20 text-accent border-accent/20';
      case 'Shipped': return 'bg-blue-500/20 text-blue-400 border-blue-500/20';
      case 'Delivered': return 'bg-green-500/20 text-green-400 border-green-500/20';
      case 'Cancelled': return 'bg-red-500/20 text-red-400 border-red-500/20';
      default: return '';
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen bg-brand text-white animate-fade-in relative">
      <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-8">
        <div>
          <h1 className="font-heading text-4xl font-bold uppercase italic tracking-tighter text-white">Admin Control</h1>
          <p className="text-accent text-[10px] uppercase font-bold tracking-[0.3em]">Infrastructure Portal // Cloth Cafe</p>
        </div>
        <button onClick={onExit} className="flex items-center gap-2 bg-zinc-900 px-6 py-3 rounded-sm hover:bg-white hover:text-black transition-all font-heading font-bold uppercase tracking-widest text-xs border border-white/10">
          <LogOut size={16} /> Exit Portal
        </button>
      </div>

      <div className="flex flex-wrap gap-8 mb-12 text-white overflow-x-auto pb-2 scrollbar-hide">
        <button onClick={() => setActiveTab('products')} className={`flex items-center gap-2 font-heading font-bold uppercase tracking-widest text-sm pb-2 border-b-2 transition-all shrink-0 ${activeTab === 'products' ? 'border-accent text-accent' : 'border-transparent text-zinc-500 hover:text-white'}`}><Settings size={18} /> Inventory</button>
        <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-2 font-heading font-bold uppercase tracking-widest text-sm pb-2 border-b-2 transition-all shrink-0 ${activeTab === 'orders' ? 'border-accent text-accent' : 'border-transparent text-zinc-500 hover:text-white'}`}><ShoppingCart size={18} /> Orders</button>
        <button onClick={() => setActiveTab('cms')} className={`flex items-center gap-2 font-heading font-bold uppercase tracking-widest text-sm pb-2 border-b-2 transition-all shrink-0 ${activeTab === 'cms' ? 'border-accent text-accent' : 'border-transparent text-zinc-500 hover:text-white'}`}><LayoutGrid size={18} /> CMS</button>
        <button onClick={() => setActiveTab('socials')} className={`flex items-center gap-2 font-heading font-bold uppercase tracking-widest text-sm pb-2 border-b-2 transition-all shrink-0 ${activeTab === 'socials' ? 'border-accent text-accent' : 'border-transparent text-zinc-500 hover:text-white'}`}><Share2 size={18} /> Socials</button>
        <button onClick={() => setActiveTab('membership-requests')} className={`flex items-center gap-2 font-heading font-bold uppercase tracking-widest text-sm pb-2 border-b-2 transition-all shrink-0 ${activeTab === 'membership-requests' ? 'border-accent text-accent' : 'border-transparent text-zinc-500 hover:text-white'}`}><Crown size={18} /> Membership</button>
        <button onClick={() => setActiveTab('active-members')} className={`flex items-center gap-2 font-heading font-bold uppercase tracking-widest text-sm pb-2 border-b-2 transition-all shrink-0 ${activeTab === 'active-members' ? 'border-accent text-accent' : 'border-transparent text-zinc-500 hover:text-white'}`}><Users size={18} /> Directory</button>
      </div>

      {/* Socials Management Tab */}
      {activeTab === 'socials' && (
        <div className="space-y-12 animate-fade-in max-w-4xl">
           <div className="flex justify-between items-end">
             <div>
                <h2 className="font-heading text-4xl font-bold uppercase italic tracking-tighter">Social <span className="text-accent">Connect</span></h2>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Manage external links and brand presence</p>
             </div>
             <button 
               onClick={handleSaveSettings}
               className="bg-accent text-black font-heading font-bold px-8 py-3 flex items-center gap-2 uppercase text-xs tracking-widest hover:bg-white transition-all shadow-xl"
             >
               <Save size={18} /> Update Links
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                   <Instagram size={20} className="text-pink-500" />
                   <h3 className="font-heading text-xl font-bold uppercase tracking-widest">Instagram</h3>
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-bold uppercase text-zinc-500 tracking-widest">Profile URL</label>
                   <input 
                     value={cmsConfig.socialLinks.instagram} 
                     onChange={e => setCmsConfig({...cmsConfig, socialLinks: {...cmsConfig.socialLinks, instagram: e.target.value}})}
                     className="w-full bg-black border border-white/10 p-4 text-xs font-bold text-white outline-none focus:border-accent" 
                     placeholder="https://instagram.com/your-brand" 
                   />
                </div>
             </div>

             <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                   <Facebook size={20} className="text-blue-500" />
                   <h3 className="font-heading text-xl font-bold uppercase tracking-widest">Facebook</h3>
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-bold uppercase text-zinc-500 tracking-widest">Page URL</label>
                   <input 
                     value={cmsConfig.socialLinks.facebook} 
                     onChange={e => setCmsConfig({...cmsConfig, socialLinks: {...cmsConfig.socialLinks, facebook: e.target.value}})}
                     className="w-full bg-black border border-white/10 p-4 text-xs font-bold text-white outline-none focus:border-accent" 
                     placeholder="https://facebook.com/your-page" 
                   />
                </div>
             </div>

             <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                   <MessageCircle size={20} className="text-green-500" />
                   <h3 className="font-heading text-xl font-bold uppercase tracking-widest">WhatsApp</h3>
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-bold uppercase text-zinc-500 tracking-widest">Direct Link or Phone Number</label>
                   <input 
                     value={cmsConfig.socialLinks.whatsapp} 
                     onChange={e => setCmsConfig({...cmsConfig, socialLinks: {...cmsConfig.socialLinks, whatsapp: e.target.value}})}
                     className="w-full bg-black border border-white/10 p-4 text-xs font-bold text-white outline-none focus:border-accent" 
                     placeholder="e.g. https://wa.me/88017xxxxxxxx" 
                   />
                </div>
             </div>

             <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                   <Twitter size={20} className="text-zinc-400" />
                   <h3 className="font-heading text-xl font-bold uppercase tracking-widest">X / Twitter</h3>
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-bold uppercase text-zinc-500 tracking-widest">Profile URL</label>
                   <input 
                     value={cmsConfig.socialLinks.twitter} 
                     onChange={e => setCmsConfig({...cmsConfig, socialLinks: {...cmsConfig.socialLinks, twitter: e.target.value}})}
                     className="w-full bg-black border border-white/10 p-4 text-xs font-bold text-white outline-none focus:border-accent" 
                     placeholder="https://x.com/your-brand" 
                   />
                </div>
             </div>
          </div>
          
          <div className="bg-accent/5 border border-accent/20 p-8 rounded-sm flex items-center gap-6">
             <Info className="text-accent shrink-0" size={32} />
             <p className="text-xs text-zinc-300 font-bold uppercase tracking-wider leading-relaxed">
                Note: Updating these links will instantly reflect on the Website Footer. 
                Make sure to include the full URL (starting with <span className="text-white">https://</span>).
             </p>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-8 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div>
                <h2 className="font-heading text-3xl font-bold uppercase italic tracking-tight text-white">Order <span className="text-accent">Manager</span></h2>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Verify transactions and manage fulfillment</p>
             </div>
             <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input 
                  type="text" 
                  placeholder="SEARCH ORDER ID, NAME, OR PHONE" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 p-4 pl-12 text-[10px] font-bold text-white uppercase outline-none focus:border-accent"
                />
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  <th className="py-4 px-4">Identifier</th>
                  <th className="py-4 px-4">Customer</th>
                  <th className="py-4 px-4">Payment Info</th>
                  <th className="py-4 px-4">Total Bill</th>
                  <th className="py-4 px-4">Current Status</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr><td colSpan={6} className="py-20 text-center text-zinc-600 font-bold uppercase tracking-widest text-xs">No matching orders found in the pipeline</td></tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr key={order.id} className="border-b border-white/5 text-sm hover:bg-white/5 transition-colors group">
                      <td className="py-6 px-4">
                        <div className="font-heading font-bold text-white uppercase">#{order.id}</div>
                        <div className="text-[8px] text-zinc-600 font-bold uppercase mt-1">{order.date}</div>
                      </td>
                      <td className="py-6 px-4">
                        <div className="text-white font-bold uppercase tracking-tight">{order.customerName}</div>
                        <div className="text-[10px] text-zinc-500 font-bold">{order.phone}</div>
                      </td>
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-accent font-black uppercase text-[10px]">{order.paymentMethod}</span>
                          {order.transactionId && (
                            <span className="bg-white/5 border border-white/10 px-2 py-0.5 text-[9px] font-mono text-zinc-400 rounded-sm">
                              {order.transactionId}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-6 px-4 font-heading font-bold text-white">৳{order.totalPrice.toLocaleString()}</td>
                      <td className="py-6 px-4">
                        <div className={`inline-block px-3 py-1 border text-[9px] font-black uppercase tracking-widest rounded-sm ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </div>
                      </td>
                      <td className="py-6 px-4 text-right">
                        <button 
                          onClick={() => setSelectedOrder(order)} 
                          className="bg-white text-black font-heading font-bold px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-accent transition-all flex items-center gap-2 ml-auto"
                        >
                          <Eye size={14} /> Full Record
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md animate-fade-in">
          <div className="bg-zinc-900 border border-white/10 w-full max-w-5xl p-0 rounded-sm max-h-[90vh] overflow-hidden flex flex-col relative">
            <button onClick={() => setSelectedOrder(null)} className="absolute top-6 right-6 z-10 text-zinc-500 hover:text-white transition-colors bg-black/50 p-2 rounded-full"><X size={24} /></button>
            
            <div className="p-8 border-b border-white/10 bg-gradient-to-r from-black/40 to-transparent">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                 <div className="space-y-1">
                    <div className="flex items-center gap-2 text-accent font-bold text-[10px] tracking-widest uppercase mb-1">
                       <Receipt size={14} /> Official Order Record
                    </div>
                    <h3 className="font-heading text-5xl font-bold uppercase italic tracking-tighter text-white">#{selectedOrder.id}</h3>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">Logged on {selectedOrder.date}</p>
                 </div>
                 <div className="flex items-center gap-3">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Update Workflow:</p>
                    <select 
                      value={selectedOrder.status} 
                      onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value as OrderStatus)}
                      className={`text-[10px] font-black uppercase px-4 py-2 rounded-sm bg-black border border-white/10 outline-none focus:border-accent cursor-pointer ${getStatusBadgeClass(selectedOrder.status)}`}
                    >
                      {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => <option key={s} value={s} className="bg-zinc-900">{s}</option>)}
                    </select>
                 </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
               <div className="lg:col-span-5 space-y-10">
                  <div className="space-y-6">
                     <div className="flex items-center gap-3 text-white border-b border-white/5 pb-2">
                        <User size={18} className="text-accent" />
                        <h4 className="font-heading text-lg font-bold uppercase tracking-widest">Customer Profile</h4>
                     </div>
                     <div className="space-y-4 bg-black/20 p-6 border border-white/5">
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Full Name</p>
                              <p className="text-sm font-bold text-white uppercase">{selectedOrder.customerName}</p>
                           </div>
                           <div>
                              <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Primary Phone</p>
                              <p className="text-sm font-bold text-white tracking-widest">{selectedOrder.phone}</p>
                           </div>
                        </div>
                        {selectedOrder.email && (
                          <div>
                            <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Email Address</p>
                            <p className="text-sm font-bold text-white">{selectedOrder.email}</p>
                          </div>
                        )}
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="flex items-center gap-3 text-white border-b border-white/5 pb-2">
                        <MapPin size={18} className="text-accent" />
                        <h4 className="font-heading text-lg font-bold uppercase tracking-widest">Fulfillment Point</h4>
                     </div>
                     <div className="space-y-4 bg-black/20 p-6 border border-white/5">
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1">District</p>
                              <p className="text-xs font-bold text-white uppercase">{selectedOrder.district}</p>
                           </div>
                           <div>
                              <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Thana</p>
                              <p className="text-xs font-bold text-white uppercase">{selectedOrder.thana}</p>
                           </div>
                        </div>
                        <div>
                           <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Shipping Address</p>
                           <p className="text-xs font-bold text-white uppercase leading-relaxed">{selectedOrder.address}, {selectedOrder.area}</p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="flex items-center gap-3 text-white border-b border-white/5 pb-2">
                        <Banknote size={18} className="text-accent" />
                        <h4 className="font-heading text-lg font-bold uppercase tracking-widest">Payment Verification</h4>
                     </div>
                     <div className={`p-6 border rounded-sm ${selectedOrder.transactionId ? 'bg-accent/5 border-accent/20' : 'bg-black/20 border-white/5'}`}>
                        <div className="flex justify-between items-center mb-4">
                           <span className="text-[10px] font-black uppercase text-accent tracking-[0.2em]">{selectedOrder.paymentMethod}</span>
                           <span className="text-xl font-heading font-bold text-white">৳{selectedOrder.totalPrice.toLocaleString()}</span>
                        </div>
                        {selectedOrder.transactionId ? (
                           <div className="space-y-2">
                              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Match TrxID</p>
                              <div className="bg-black p-3 text-center border border-accent/30 font-mono text-lg font-bold text-accent tracking-[0.1em]">
                                 {selectedOrder.transactionId}
                              </div>
                           </div>
                        ) : (
                           <div className="text-center py-4 bg-black/30 text-[10px] font-bold uppercase tracking-widest text-zinc-500 border border-dashed border-white/10">
                              Cash On Delivery
                           </div>
                        )}
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-7 space-y-10">
                  <div className="space-y-6">
                     <div className="flex items-center gap-3 text-white border-b border-white/5 pb-2">
                        <ShoppingBag size={18} className="text-accent" />
                        <h4 className="font-heading text-lg font-bold uppercase tracking-widest">Order Manifest</h4>
                     </div>
                     <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                        {selectedOrder.items.map((item, idx) => (
                           <div key={idx} className="flex justify-between items-center group bg-black/20 p-4 border border-white/5 rounded-sm">
                              <div className="flex gap-6 items-center">
                                 <img src={item.product.imageUrl} className="w-16 h-20 object-cover border border-white/10 grayscale group-hover:grayscale-0" />
                                 <div>
                                    <p className="text-sm font-bold uppercase text-white tracking-tight">{item.product.name}</p>
                                    <div className="flex items-center gap-4 mt-1">
                                       <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Size: {item.size}</p>
                                       <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Qty: {item.quantity}</p>
                                    </div>
                                 </div>
                              </div>
                              <p className="font-heading text-xl font-bold text-white">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-6 pt-10">
                     <div className="flex items-center gap-3 text-white border-b border-white/5 pb-2">
                        <Building2 size={18} className="text-accent" />
                        <h4 className="font-heading text-lg font-bold uppercase tracking-widest">Quick Disposition</h4>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedOrder.status === 'Pending' ? (
                          <>
                            <button 
                              onClick={() => {
                                handleUpdateOrderStatus(selectedOrder.id, 'Processing');
                                alert("Order marked as Accepted & Processing.");
                              }} 
                              className="bg-accent text-black font-heading font-bold py-5 uppercase tracking-[0.2em] text-sm hover:bg-white transition-all flex items-center justify-center gap-2"
                            >
                               <CheckCircle2 size={18} /> Accept Order
                            </button>
                            <button 
                              onClick={() => {
                                if(confirm("Are you sure you want to cancel this order?")) {
                                  handleUpdateOrderStatus(selectedOrder.id, 'Cancelled');
                                }
                              }} 
                              className="bg-zinc-800 text-red-500 border border-red-500/20 font-heading font-bold py-5 uppercase tracking-[0.2em] text-sm hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                               <XCircle size={18} /> Cancel Order
                            </button>
                          </>
                        ) : (
                           <div className="col-span-2 text-center py-5 bg-white/5 border border-white/10 text-zinc-500 font-heading font-bold uppercase tracking-widest">
                              This order is currently {selectedOrder.status}
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* CMS Tab */}
      {activeTab === 'cms' && (
        <div className="space-y-12 animate-fade-in max-w-5xl">
          <div className="flex justify-between items-end">
             <div>
                <h2 className="font-heading text-4xl font-bold uppercase italic tracking-tighter">Web <span className="text-accent">Architect</span></h2>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Manage cover photos and site configuration</p>
             </div>
             <button 
               onClick={handleSaveSettings}
               className="bg-accent text-black font-heading font-bold px-8 py-3 flex items-center gap-2 uppercase text-xs tracking-widest hover:bg-white transition-all shadow-xl"
             >
               <Save size={18} /> Publish Changes
             </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="space-y-8 bg-zinc-900/30 p-8 border border-white/5 rounded-sm">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                   <Globe size={20} className="text-accent" />
                   <h3 className="font-heading text-xl font-bold uppercase tracking-widest">Cover Photo Settings</h3>
                </div>
                
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest text-white">Cover Image Source</label>
                      <div className="flex gap-4">
                         <div className="flex-1 relative">
                            <input 
                              value={cmsConfig.heroImageUrl} 
                              onChange={e => setCmsConfig({...cmsConfig, heroImageUrl: e.target.value})}
                              className="w-full bg-black border border-white/10 p-4 text-[10px] font-bold text-white uppercase outline-none focus:border-accent" 
                              placeholder="IMAGE URL" 
                            />
                         </div>
                         <button 
                           type="button" 
                           onClick={() => heroFileRef.current?.click()}
                           className="bg-white/5 border border-white/10 px-6 py-4 flex items-center gap-2 text-zinc-400 hover:bg-white hover:text-black transition-all text-[10px] font-bold uppercase tracking-widest"
                         >
                            <Upload size={14} /> Upload
                         </button>
                         <input type="file" ref={heroFileRef} onChange={(e) => handleCMSImageUpload(e, 'heroImageUrl')} className="hidden" accept="image/*" />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest text-white">Hero Title</label>
                      <input 
                        value={cmsConfig.heroTitle} 
                        onChange={e => setCmsConfig({...cmsConfig, heroTitle: e.target.value})}
                        className="w-full bg-black border border-white/10 p-4 text-xs font-bold text-white uppercase outline-none focus:border-accent" 
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest text-white">Tagline</label>
                      <textarea 
                        rows={3}
                        value={cmsConfig.heroTagline} 
                        onChange={e => setCmsConfig({...cmsConfig, heroTagline: e.target.value})}
                        className="w-full bg-black border border-white/10 p-4 text-xs font-bold text-white uppercase outline-none focus:border-accent resize-none" 
                      />
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Live Preview</p>
                <div className="relative aspect-video bg-black overflow-hidden border border-white/10 rounded-sm">
                   <img src={cmsConfig.heroImageUrl} className="w-full h-full object-cover opacity-40" />
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 space-y-2">
                      <p className="text-accent text-[8px] font-bold uppercase tracking-[0.4em]">FRESHLY PRESSED COLLECTION</p>
                      <h3 className="font-heading text-3xl font-bold uppercase italic tracking-tighter leading-none">{cmsConfig.heroTitle}</h3>
                      <p className="text-zinc-400 text-[8px] font-bold uppercase tracking-widest max-w-xs">{cmsConfig.heroTagline}</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="space-y-8 animate-fade-in">
          <div className="flex justify-between items-center">
            <h2 className="font-heading text-2xl font-bold uppercase italic tracking-tight text-white">Active Stock</h2>
            <button 
              onClick={() => setIsAddingProduct(true)}
              className="bg-accent text-black font-heading font-bold px-6 py-3 flex items-center gap-2 uppercase text-xs tracking-widest hover:bg-white transition-colors"
            >
              <Plus size={18} /> Initialize Drop
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className={`bg-zinc-900 border p-6 rounded-sm flex items-center gap-6 group transition-all border-white/5 hover:border-accent/20`}>
                <img src={p.imageUrl} className="w-20 h-28 object-cover border border-white/10" alt={p.name} />
                <div className="flex-1">
                  <h4 className="font-heading font-bold uppercase tracking-tight text-lg text-white">{p.name}</h4>
                  <p className="text-accent font-bold">৳{p.price}</p>
                  <p className={`text-[10px] font-bold uppercase mt-2 ${p.stock < 5 ? 'text-red-500' : 'text-zinc-500'}`}>{p.stock} Units Stock</p>
                  <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingProduct(p); setProductForm(p); setIsAddingProduct(true); }} className="text-zinc-500 hover:text-white"><Edit2 size={12} /></button>
                    <button onClick={() => setProducts(products.filter(item => item.id !== p.id))} className="text-zinc-500 hover:text-red-500"><Trash2 size={12} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isAddingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 w-full max-w-2xl p-8 rounded-sm overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
              <h3 className="font-heading text-3xl font-bold uppercase italic tracking-tighter">Initialize <span className="text-accent">Drop</span></h3>
              <button onClick={closeProductModal} className="text-zinc-500 hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-zinc-500">Product Name</label>
                  <input required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full bg-black border border-white/10 p-4 text-xs uppercase tracking-widest outline-none focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-zinc-500">Price (৳)</label>
                  <input required type="number" value={productForm.price} onChange={e => setProductForm({...productForm, price: parseInt(e.target.value)})} className="w-full bg-black border border-white/10 p-4 text-xs uppercase tracking-widest outline-none focus:border-accent" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase text-zinc-500">Visuals</label>
                <div className="flex flex-col md:flex-row gap-4">
                  <input value={productForm.imageUrl} onChange={e => setProductForm({...productForm, imageUrl: e.target.value})} placeholder="IMAGE URL" className="flex-1 bg-black border border-white/10 p-4 text-[10px] uppercase outline-none focus:border-accent" />
                  <button type="button" onClick={() => productFileRef.current?.click()} className="border border-dashed border-white/20 p-4 text-[10px] font-bold uppercase hover:border-accent hover:text-accent transition-all">Upload File</button>
                  <input type="file" ref={productFileRef} onChange={handleProductImageUpload} className="hidden" accept="image/*" />
                </div>
                {productForm.imageUrl && <img src={productForm.imageUrl} className="w-20 h-24 object-cover border border-white/10" alt="Preview" />}
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-bold uppercase text-zinc-500">Stock</label>
                   <input required type="number" value={productForm.stock} onChange={e => setProductForm({...productForm, stock: parseInt(e.target.value)})} className="w-full bg-black border border-white/10 p-4 text-xs outline-none focus:border-accent" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold uppercase text-zinc-500">Points</label>
                   <input required type="number" value={productForm.rewardPoints} onChange={e => setProductForm({...productForm, rewardPoints: parseInt(e.target.value)})} className="w-full bg-black border border-white/10 p-4 text-xs outline-none focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-zinc-500">Category</label>
                  <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value as any})} className="w-full bg-black border border-white/10 p-4 text-[10px] font-bold uppercase outline-none focus:border-accent">
                    {['T-Shirts', 'Hoodies', 'Jackets', 'Hats'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-accent text-black font-heading font-bold py-5 uppercase tracking-widest text-lg hover:bg-white transition-all shadow-xl">Confirm Registry</button>
            </form>
          </div>
        </div>
      )}

      {/* Membership and Directory Tabs */}
      {activeTab === 'membership-requests' && (
        <div className="space-y-8 animate-fade-in">
          <h2 className="font-heading text-2xl font-bold uppercase italic text-white tracking-tight">Pending Elite Requests</h2>
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
                <thead><tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500"><th className="py-4">Request ID</th><th className="py-4">Customer</th><th className="py-4">Method/TrxID</th><th className="py-4">Status</th><th className="py-4">Action</th></tr></thead>
                <tbody>{membershipRequests.map(req => (<tr key={req.id} className="border-b border-white/5 text-sm hover:bg-white/5"><td className="py-6 font-bold">{req.id}</td><td className="py-6">{req.customerName}</td><td className="py-6 font-mono text-[10px]">{req.paymentMethod} / {req.transactionId}</td><td className="py-6"><span className="text-[9px] font-black uppercase px-2 py-1 bg-zinc-800 rounded-sm">{req.status}</span></td><td className="py-6">{req.status === 'Pending' && <div className="flex gap-2"><button onClick={() => onApproveMembership(req.id, true)} className="bg-green-600 p-2 rounded-sm"><Check size={14} /></button><button onClick={() => onApproveMembership(req.id, false)} className="bg-red-600 p-2 rounded-sm"><X size={14} /></button></div>}</td></tr>))}</tbody>
             </table>
          </div>
        </div>
      )}

      {activeTab === 'active-members' && (
        <div className="space-y-8 animate-fade-in">
          <h2 className="font-heading text-2xl font-bold uppercase italic text-white tracking-tight">Elite Member Directory</h2>
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
                <thead><tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500"><th className="py-4">Member</th><th className="py-4">Elite Code</th><th className="py-4">Joined</th><th className="py-4 text-right">Action</th></tr></thead>
                <tbody>{members.map(member => (<tr key={member.id} className="border-b border-white/5 text-sm hover:bg-white/5"><td className="py-6"><div className="font-bold">{member.name}</div><div className="text-[10px] text-zinc-500">{member.phone}</div></td><td className="py-6 font-heading font-bold text-accent tracking-widest">{member.membershipCode}</td><td className="py-6 text-[10px] uppercase">{member.joinedDate}</td><td className="py-6 text-right"><button onClick={() => onRemoveMember(member.id)} className="text-red-500 font-bold uppercase text-[9px] tracking-widest hover:underline">Revoke</button></td></tr>))}</tbody>
             </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
