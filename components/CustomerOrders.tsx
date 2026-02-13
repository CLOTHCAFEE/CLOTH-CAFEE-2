
import React from 'react';
import { Order, OrderStatus } from '../types';
import { ArrowLeft, Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';

interface CustomerOrdersProps {
  orders: Order[];
  onBack: () => void;
}

const CustomerOrders: React.FC<CustomerOrdersProps> = ({ orders, onBack }) => {
  const getStatusIcon = (status: OrderStatus) => {
    switch(status) {
      case 'Pending': return <Clock size={16} className="text-zinc-500" />;
      case 'Processing': return <Package size={16} className="text-accent" />;
      case 'Shipped': return <Truck size={16} className="text-blue-500" />;
      case 'Delivered': return <CheckCircle size={16} className="text-green-500" />;
      case 'Cancelled': return <XCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  const getStatusBg = (status: OrderStatus) => {
    switch(status) {
      case 'Pending': return 'bg-zinc-500/10 border-zinc-500/20';
      case 'Processing': return 'bg-accent/10 border-accent/20';
      case 'Shipped': return 'bg-blue-500/10 border-blue-500/20';
      case 'Delivered': return 'bg-green-500/10 border-green-500/20';
      case 'Cancelled': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-white/5 border-white/10';
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in max-w-4xl">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-500 hover:text-accent transition-colors uppercase font-bold tracking-widest text-xs mb-12 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Gallery
      </button>

      <div className="mb-12">
        <h1 className="font-heading text-6xl font-bold uppercase italic tracking-tighter leading-none mb-4">
          Order <span className="text-accent">History</span>
        </h1>
        <p className="text-zinc-500 uppercase font-bold tracking-[0.3em] text-[10px]">Track your freshly pressed style drops.</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-white/10 rounded-sm">
          <Package size={48} className="mx-auto text-zinc-800 mb-6" />
          <p className="text-zinc-500 uppercase font-bold tracking-widest text-xs">You haven't ordered anything yet.</p>
          <button 
            onClick={onBack}
            className="mt-6 text-accent underline uppercase font-bold tracking-widest text-[10px]"
          >
            Start Shopping Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-zinc-900/30 border border-white/5 p-6 md:p-8 rounded-sm hover:border-white/10 transition-colors">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* Order Details */}
                <div className="flex gap-6">
                  {/* Fixed: Use Order.items[0] to display primary product image */}
                  <div className="w-20 h-24 flex-shrink-0 border border-white/10 overflow-hidden">
                    <img src={order.items[0]?.product.imageUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-heading font-bold text-accent">#{order.id}</span>
                      <div className={`flex items-center gap-1.5 px-3 py-1 border rounded-full ${getStatusBg(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="text-[9px] font-black uppercase tracking-widest">{order.status}</span>
                      </div>
                    </div>
                    {/* Fixed: Use Order.items[0] for product name and added multi-item indicator */}
                    <h3 className="font-heading text-xl font-bold uppercase tracking-tight italic leading-tight">
                      {order.items[0]?.product.name} {order.items.length > 1 ? `(+${order.items.length - 1} more)` : ''}
                    </h3>
                    {/* Fixed: Updated to access items[0].size and use totalPrice instead of missing price property */}
                    <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      <span>Size: {order.items[0]?.size}</span>
                      <span>Total: ৳{order.totalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Tracking Info */}
                <div className="md:text-right flex flex-col justify-center space-y-1">
                  <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Ordered On</p>
                  <p className="text-xs font-bold text-white uppercase tracking-widest">{order.date}</p>
                  <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest mt-4">Shipping To</p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
                    {order.customerName}<br />
                    {order.city}, {order.address.substring(0, 20)}...
                  </p>
                </div>
              </div>

              {/* Status Timeline Visualization (Mini) */}
              <div className="mt-8 pt-8 border-t border-white/5 flex justify-between relative">
                <div className="absolute top-[35px] left-0 right-0 h-[1px] bg-white/10 -z-10" />
                {['Pending', 'Processing', 'Shipped', 'Delivered'].map((s, idx) => {
                  const isActive = order.status === s || 
                                  (order.status === 'Processing' && idx < 1) ||
                                  (order.status === 'Shipped' && idx < 2) ||
                                  (order.status === 'Delivered' && idx < 3);
                  const isCurrent = order.status === s;

                  return (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <div className={`w-3 h-3 rounded-full border-2 transition-all ${
                        isCurrent ? 'bg-accent border-accent scale-150 shadow-[0_0_10px_rgba(212,163,115,0.5)]' : 
                        isActive ? 'bg-white border-white' : 'bg-black border-zinc-800'
                      }`} />
                      <span className={`text-[8px] font-bold uppercase tracking-widest ${isActive ? 'text-white' : 'text-zinc-700'}`}>
                        {s}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
