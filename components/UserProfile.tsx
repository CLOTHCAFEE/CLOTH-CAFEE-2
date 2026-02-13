
import React, { useState, useRef } from 'react';
import { Order, OrderStatus, MembershipRequest } from '../types';
import { 
  Package, Clock, Truck, CheckCircle, 
  XCircle, User, MapPin, ShoppingBag,
  CreditCard, Sparkles, LayoutGrid, Crown, Copy, Check, MessageSquare, Building2, Phone, Download, FileText, Edit2, X, ChevronRight
} from 'lucide-react';
import html2canvas from 'html2canvas';

interface UserProfileProps {
  orders: Order[];
  userPoints: number;
  membershipRequests?: MembershipRequest[];
  isElite: boolean;
  memberCode?: string | null;
  onBack: () => void;
  onShopNow: () => void;
  onUpdateOrder: (updatedOrder: Order) => void;
  onMembershipClick: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ orders, userPoints, membershipRequests = [], isElite, memberCode, onBack, onShopNow, onUpdateOrder, onMembershipClick }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders'>('dashboard');
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const getStatusIcon = (status: OrderStatus) => {
    switch(status) {
      case 'Pending': return <Clock size={14} />;
      case 'Processing': return <Package size={14} />;
      case 'Shipped': return <Truck size={14} />;
      case 'Delivered': return <CheckCircle size={14} />;
      case 'Cancelled': return <XCircle size={14} />;
      default: return null;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch(status) {
      case 'Pending': return 'text-zinc-500';
      case 'Processing': return 'text-accent';
      case 'Shipped': return 'text-blue-500';
      case 'Delivered': return 'text-green-500';
      case 'Cancelled': return 'text-red-500';
      default: return 'text-white';
    }
  };

  const handleCopyCode = () => {
    if (memberCode) {
      navigator.clipboard.writeText(memberCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrder) {
      onUpdateOrder(editingOrder);
      setEditingOrder(null);
      alert("Order records updated successfully.");
    }
  };

  const downloadInvoice = async (order: Order) => {
    setIsDownloading(order.id);
    setInvoiceOrder(order);
    
    setTimeout(async () => {
      if (invoiceRef.current) {
        try {
          const canvas = await html2canvas(invoiceRef.current, {
            backgroundColor: '#000000',
            scale: 2,
            logging: false,
            useCORS: true
          });
          const image = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = image;
          link.download = `ClothCafe_Invoice_${order.id}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error("Invoice Error:", error);
          alert("Error generating image.");
        } finally {
          setIsDownloading(null);
          setInvoiceOrder(null);
        }
      }
    }, 100);
  };

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in max-w-7xl relative">
      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="bg-zinc-900 border border-white/10 w-full max-w-2xl p-8 rounded-sm relative">
            <button onClick={() => setEditingOrder(null)} className="absolute top-6 right-6 text-zinc-500 hover:text-white">
              <X size={24} />
            </button>
            <div className="mb-8">
              <h3 className="font-heading text-4xl font-bold uppercase italic tracking-tighter text-white">Edit <span className="text-accent">Shipping Details</span></h3>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Order Identifier: #{editingOrder.id}</p>
            </div>
            <form onSubmit={handleSaveEdit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Full Name</label>
                  <input required value={editingOrder.customerName} onChange={e => setEditingOrder({...editingOrder, customerName: e.target.value})} className="w-full bg-black border border-white/10 p-4 text-xs text-white uppercase outline-none focus:border-accent transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Contact Phone</label>
                  <input required value={editingOrder.phone} onChange={e => setEditingOrder({...editingOrder, phone: e.target.value})} className="w-full bg-black border border-white/10 p-4 text-xs text-white uppercase outline-none focus:border-accent transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">District</label>
                  <input required value={editingOrder.district} onChange={e => setEditingOrder({...editingOrder, district: e.target.value})} className="w-full bg-black border border-white/10 p-4 text-xs text-white uppercase outline-none focus:border-accent transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Thana</label>
                  <input required value={editingOrder.thana} onChange={e => setEditingOrder({...editingOrder, thana: e.target.value})} className="w-full bg-black border border-white/10 p-4 text-xs text-white uppercase outline-none focus:border-accent transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Full Shipping Address</label>
                <textarea required rows={2} value={editingOrder.address} onChange={e => setEditingOrder({...editingOrder, address: e.target.value})} className="w-full bg-black border border-white/10 p-4 text-xs text-white uppercase outline-none focus:border-accent resize-none transition-all" />
              </div>
              <button type="submit" className="w-full bg-white text-black font-heading font-bold py-5 uppercase tracking-widest text-lg hover:bg-accent transition-all">
                Update Order Info
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Hidden Invoice Template */}
      <div className="fixed -left-[9999px] top-0 overflow-hidden">
        {invoiceOrder && (
          <div ref={invoiceRef} className="w-[800px] p-12 bg-black text-white font-sans border-8 border-accent/20">
            <div className="flex justify-between items-start mb-16 border-b-2 border-accent/30 pb-10">
              <div>
                <h1 className="font-heading text-6xl font-bold tracking-tighter text-white mb-2 italic uppercase">CLOTH CAFE</h1>
                <p className="text-accent tracking-[0.4em] font-bold text-xs uppercase">Official Order Record // 2025</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-heading font-bold text-white uppercase italic">#{invoiceOrder.id}</p>
                <p className="text-[10px] text-zinc-400 font-bold mt-2 uppercase">{invoiceOrder.date}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-20 mb-16">
              <div className="space-y-4">
                <h3 className="text-accent font-black uppercase tracking-[0.2em] text-[10px] border-b border-white/10 pb-2">Customer Info</h3>
                <p className="text-xl font-bold text-white uppercase">{invoiceOrder.customerName}</p>
                <p className="text-sm text-zinc-400">{invoiceOrder.phone}</p>
              </div>
              <div className="space-y-4 text-right">
                <h3 className="text-accent font-black uppercase tracking-[0.2em] text-[10px] border-b border-white/10 pb-2">Shipping Point</h3>
                <p className="text-sm text-zinc-300 uppercase">{invoiceOrder.address}, {invoiceOrder.thana}, {invoiceOrder.district}</p>
              </div>
            </div>
            <table className="w-full mb-16">
              <thead>
                <tr className="border-b-2 border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-left">
                  <th className="py-4">Item</th>
                  <th className="py-4 text-center">Qty</th>
                  <th className="py-4 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoiceOrder.items.map((item, idx) => (
                  <tr key={idx} className="text-sm font-bold uppercase">
                    <td className="py-6">{item.product.name} ({item.size})</td>
                    <td className="py-6 text-center">{item.quantity}</td>
                    <td className="py-6 text-right">৳{item.product.price * item.quantity}.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <div className="w-72 bg-white/5 p-8 rounded-sm">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-black uppercase text-white">Grand Total</span>
                  <span className="text-3xl font-heading font-bold text-accent">৳{invoiceOrder.totalPrice}.00</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <div className="lg:w-80 space-y-8">
           <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-sm">
              <div className="flex flex-col items-center text-center space-y-4">
                 <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center relative shadow-[0_0_40px_rgba(212,163,115,0.1)]">
                    <User size={48} className="text-black" />
                    {isElite && (
                      <div className="absolute -bottom-1 -right-1 bg-accent border-4 border-brand p-1.5 rounded-full shadow-2xl">
                        <Crown size={14} className="text-black" />
                      </div>
                    )}
                 </div>
                 <div>
                    <h2 className="font-heading text-2xl font-bold uppercase italic tracking-tighter">Profile Hub</h2>
                    <p className={`text-[10px] font-black uppercase tracking-[0.3em] mt-1 ${isElite ? 'text-accent' : 'text-zinc-500'}`}>
                      {isElite ? 'Elite Member' : 'Standard Visitor'}
                    </p>
                 </div>
              </div>
              <div className="mt-12 space-y-2">
                 <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center justify-between p-4 rounded-sm transition-all text-xs font-bold uppercase tracking-widest ${activeTab === 'dashboard' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}>
                   <span className="flex items-center gap-3"><LayoutGrid size={16} /> Dashboard</span>
                 </button>
                 <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center justify-between p-4 rounded-sm transition-all text-xs font-bold uppercase tracking-widest ${activeTab === 'orders' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}>
                   <span className="flex items-center gap-3"><ShoppingBag size={16} /> Order History</span>
                 </button>
              </div>
           </div>

           <div className="bg-accent/5 border border-accent/10 p-6 rounded-sm">
              <div className="flex items-center gap-2 mb-2 text-accent">
                 <Sparkles size={14} />
                 <p className="text-[10px] font-bold uppercase tracking-widest">Rewards Score</p>
              </div>
              <div className="flex justify-between items-end">
                 <span className="font-heading text-4xl font-bold">{userPoints.toLocaleString()}</span>
                 <span className="text-[10px] font-bold text-zinc-500 uppercase">Points</span>
              </div>
           </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-[600px]">
          {activeTab === 'dashboard' && (
            <div className="space-y-12 animate-fade-in">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-sm group hover:border-accent/30 transition-all">
                     <Package size={24} className="text-accent mb-4 group-hover:scale-110 transition-transform" />
                     <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Total Drops Secured</p>
                     <h3 className="font-heading text-4xl font-bold mt-2">{orders.length}</h3>
                  </div>
                  <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-sm group hover:border-accent/30 transition-all">
                     <CreditCard size={24} className="text-accent mb-4 group-hover:scale-110 transition-transform" />
                     <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Lifetime Spending</p>
                     <h3 className="font-heading text-4xl font-bold mt-2">৳{orders.reduce((acc, o) => acc + o.totalPrice, 0).toLocaleString()}</h3>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <h3 className="font-heading text-2xl font-bold uppercase italic tracking-tight">Recent Activity</h3>
                    <button onClick={() => setActiveTab('orders')} className="text-[10px] font-bold uppercase text-accent hover:underline flex items-center gap-1">View Archive <ChevronRight size={12} /></button>
                  </div>
                  {orders.length === 0 ? (
                    <div className="py-20 text-center bg-zinc-900/10 rounded-sm border border-dashed border-white/10">
                       <p className="text-zinc-600 uppercase text-[10px] font-bold tracking-[0.3em]">No order history available.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                       {orders.slice(0, 3).map(order => (
                         <div key={order.id} className="bg-zinc-900/40 border border-white/5 p-6 flex items-center justify-between group hover:border-accent/20 transition-all cursor-pointer" onClick={() => setActiveTab('orders')}>
                            <div className="flex items-center gap-6">
                               <img src={order.items[0].product.imageUrl} className="w-12 h-16 object-cover border border-white/10 grayscale group-hover:grayscale-0 transition-all" />
                               <div>
                                  <p className="text-[9px] font-bold text-accent tracking-widest uppercase">#{order.id}</p>
                                  <h4 className="font-heading text-lg font-bold uppercase italic">{order.items[0].product.name}</h4>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="font-heading text-xl font-bold text-white">৳{order.totalPrice.toLocaleString()}</p>
                               <span className={`text-[8px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>{order.status}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}
               </div>
            </div>
          )}

          {activeTab === 'orders' && (
             <div className="space-y-8 animate-fade-in">
                <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
                   <h3 className="font-heading text-4xl font-bold uppercase italic tracking-tighter leading-none">Drop <span className="text-accent">Archive</span></h3>
                   <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-[0.2em]">{orders.length} Records Found</p>
                </div>
                
                {orders.length === 0 ? (
                   <div className="py-32 text-center bg-zinc-900/10 rounded-sm border border-white/5">
                      <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">No drop history found.</p>
                      <button onClick={onShopNow} className="mt-6 text-accent font-bold uppercase text-[10px] underline underline-offset-4 tracking-widest">Start Brewing Style</button>
                   </div>
                ) : (
                   <div className="space-y-12">
                      {orders.map(order => (
                         <div key={order.id} className="bg-zinc-900/30 border border-white/5 rounded-sm overflow-hidden hover:border-white/10 transition-all">
                            <div className="p-8 border-b border-white/5 bg-white/5 flex flex-col md:flex-row justify-between items-start gap-8">
                               <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                     <span className="text-accent font-bold text-[10px] tracking-widest uppercase">#{order.id}</span>
                                     <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded-sm text-zinc-400 font-black uppercase">{order.date}</span>
                                  </div>
                                  <h4 className="font-heading text-3xl font-bold uppercase italic tracking-tight">Order Details</h4>
                               </div>
                               <div className="flex-1 w-full flex flex-col md:flex-row md:items-center justify-end gap-4">
                                  {/* Edit Button - Only Pending or Processing */}
                                  {(order.status === 'Pending' || order.status === 'Processing') && (
                                    <button 
                                      onClick={() => setEditingOrder(order)}
                                      className="flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-2 rounded-sm font-heading font-bold uppercase tracking-widest text-xs hover:border-white transition-all"
                                    >
                                       <Edit2 size={14} /> Update Shipping
                                    </button>
                                  )}

                                  {/* Invoice Button - Only Delivered */}
                                  {order.status === 'Delivered' && (
                                    <button 
                                      onClick={() => downloadInvoice(order)}
                                      disabled={isDownloading === order.id}
                                      className="flex items-center justify-center gap-2 bg-white text-black px-6 py-2 rounded-sm font-heading font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all disabled:opacity-50"
                                    >
                                       {isDownloading === order.id ? (
                                         <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                       ) : (
                                         <Download size={14} />
                                       )}
                                       Download Invoice
                                    </button>
                                  )}
                                  
                                  <div className={`inline-flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-white/5 rounded-sm border border-white/5 ${getStatusColor(order.status)}`}>
                                     {getStatusIcon(order.status)} {order.status}
                                  </div>
                               </div>
                            </div>
                            
                            {/* Fulfillment Timeline */}
                            <div className="p-8 border-b border-white/5 bg-black/10">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <Building2 size={18} className="text-accent" />
                                        <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Real-time Fulfillment Timeline</p>
                                    </div>
                                    <div className="flex justify-between gap-1 relative w-full px-4">
                                        <div className="absolute top-[10px] left-8 right-8 h-[1px] bg-white/10 -z-0" />
                                        {['Pending', 'Processing', 'Shipped', 'Delivered'].map((s, idx) => {
                                            const statusOrder = ['Pending', 'Processing', 'Shipped', 'Delivered'];
                                            const currentIdx = statusOrder.indexOf(order.status);
                                            const isDone = idx <= currentIdx && order.status !== 'Cancelled';
                                            const isCurrent = idx === currentIdx;
                                            
                                            return (
                                                <div key={s} className="flex flex-col items-center gap-2 relative z-10">
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                                                        isDone 
                                                          ? `bg-accent border-accent text-black ${isCurrent ? 'animate-pulse scale-125' : ''}` 
                                                          : 'bg-brand border-white/10 text-zinc-700'
                                                    }`}>
                                                        {isDone ? <Check size={10} strokeWidth={4} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                                                    </div>
                                                    <span className={`text-[8px] font-black uppercase tracking-tighter ${isDone ? 'text-accent' : 'text-zinc-700'}`}>{s}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 bg-black/20">
                               <div className="space-y-8">
                                  <div className="flex items-start gap-4">
                                     <div className="bg-accent/10 p-3 rounded-sm"><MapPin size={20} className="text-accent" /></div>
                                     <div>
                                        <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Shipment Destination</p>
                                        <p className="text-sm text-white uppercase font-bold tracking-tight mt-1 leading-relaxed">
                                           {order.customerName}<br />
                                           {order.address}, {order.thana}<br />
                                           {order.area}, {order.district}
                                        </p>
                                     </div>
                                  </div>
                                  <div className="flex items-start gap-4">
                                     <div className="bg-accent/10 p-3 rounded-sm"><Phone size={20} className="text-accent" /></div>
                                     <div>
                                        <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Contact Record</p>
                                        <p className="text-sm text-white font-bold tracking-widest mt-1">{order.phone}</p>
                                        {order.altPhone && <p className="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-widest">ALT: {order.altPhone}</p>}
                                     </div>
                                  </div>
                               </div>

                               <div className="space-y-6">
                                  <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest border-b border-white/5 pb-2">Manifest Items</p>
                                  <div className="space-y-4">
                                     {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center group">
                                           <div className="flex gap-4 items-center">
                                              <div className="w-12 h-16 bg-zinc-900 border border-white/5 overflow-hidden">
                                                <img src={item.product.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                              </div>
                                              <div>
                                                 <p className="text-[10px] font-black uppercase text-white leading-none">{item.product.name}</p>
                                                 <p className="text-[8px] font-bold text-zinc-500 uppercase mt-1 tracking-widest">Size: {item.size} / Quantity: {item.quantity}</p>
                                              </div>
                                           </div>
                                           <p className="font-heading text-lg font-bold text-accent">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                     ))}
                                  </div>
                                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                                     <div>
                                        <p className="text-[9px] font-bold uppercase text-zinc-600 tracking-widest leading-none">Paid via {order.paymentMethod}</p>
                                        <p className="text-[14px] font-heading font-bold text-accent mt-2 uppercase tracking-tighter">Fulfillment Total: ৳{order.totalPrice.toLocaleString()}.00</p>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                )}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
