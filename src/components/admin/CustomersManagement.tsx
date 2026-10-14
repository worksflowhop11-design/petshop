import React, { useState, useEffect } from 'react';
import { Users, Search, Mail, Phone } from 'lucide-react';
import { fetchCustomers } from '../../services/firestoreService';
import { AdminCustomer } from '../../types/admin';

export const CustomersManagement: React.FC = () => {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#EE1630]">
            Accounts
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#061B3A] tracking-tight">
            Registered Pet Parents
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            View customer contact records and order histories.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer name or email..."
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
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4 text-center">Orders</th>
                <th className="py-3.5 px-4">Total Spent</th>
                <th className="py-3.5 px-6">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-6 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FFE082] text-[#061B3A] font-bold text-xs flex items-center justify-center">
                      {c.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-[#061B3A]">{c.name}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 space-y-0.5">
                    <p className="text-slate-600 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{c.email}</span>
                    </p>
                    {c.phone && (
                      <p className="text-slate-400 text-[10px] flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{c.phone}</span>
                      </p>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-[#061B3A]">
                    {c.totalOrders}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700">
                    ${c.totalSpent.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-6 text-slate-500">
                    {c.registeredAt}
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
