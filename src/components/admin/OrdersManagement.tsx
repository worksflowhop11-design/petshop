import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Clock, CheckCircle, Package } from 'lucide-react';
import { fetchOrders } from '../../services/firestoreService';
import { AdminOrder } from '../../types/admin';

export const OrdersManagement: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#EE1630]">
            Fulfillment
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#061B3A] tracking-tight">
            Customer Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor and track pet food orders placed via public storefront inquiries and cart.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order number or customer..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-[#061B3A] outline-hidden focus:border-[#EE1630]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-6 font-mono font-bold text-[#061B3A]">
                    {ord.orderNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#061B3A]">{ord.customerName}</p>
                    <p className="text-[10px] text-slate-400">{ord.customerEmail}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    {ord.items.map((it, idx) => (
                      <span key={idx} className="block text-slate-600 line-clamp-1">
                        {it.quantity}x {it.productName}
                      </span>
                    ))}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#061B3A]">
                    ${ord.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {new Date(ord.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        ord.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : ord.status === 'processing'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
