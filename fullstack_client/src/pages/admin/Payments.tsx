import React from 'react';
import { useQuery } from 'react-query';

const AdminPayments = () => {
  const { data: payments } = useQuery('payments', () => fetchPayments());

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payment Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600">Total Revenue</h3>
          <p className="text-3xl font-bold text-primary">KES {payments?.totalRevenue}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600">Pending Payments</h3>
          <p className="text-3xl font-bold text-primary">{payments?.pendingCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600">This Month</h3>
          <p className="text-3xl font-bold text-primary">KES {payments?.monthlyRevenue}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          {/* Transactions table */}
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;