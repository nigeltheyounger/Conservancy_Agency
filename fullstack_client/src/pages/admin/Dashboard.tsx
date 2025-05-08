import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import DashboardCard from '../../components/shared/DashboardCard';
import DataTable from '../../components/shared/DataTable';
import { 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline';

interface Transaction {
  id: string;
  transaction_date: string;
  amount: number;
  status: string;
}

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalShareholders: 0,
    totalShares: 0,
    totalPayments: 0,
    recentTransactions: [] as Transaction[]
  });

  useEffect(() => {
    fetchDashboardMetrics();
  }, []);

  const fetchDashboardMetrics = async () => {
    const [shareholders, shares, payments] = await Promise.all([
      supabase.from('profiles').select('count').eq('role', 'shareholder').single(),
      supabase.from('shares').select('sum(amount)').single(),
      supabase.from('payments').select('*').order('transaction_date', { ascending: false }).limit(5)
    ]) as [
      { data: { count: number } | null },
      { data: { sum: number } | null },
      { data: Transaction[] | null }
    ];

    setMetrics({
      totalShareholders: shareholders.data?.count || 0,
      totalShares: shares.data?.sum || 0,
      totalPayments: payments.data?.length || 0,
      recentTransactions: payments.data || []
    });
  };

  const transactionColumns = [
    { key: 'transaction_date', label: 'Date', render: (value: string) => new Date(value).toLocaleDateString() },
    { key: 'amount', label: 'Amount', render: (value: number) => `KES ${value.toLocaleString()}` },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <button className="btn btn-primary">
            Generate Report
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Shareholders"
          value={metrics.totalShareholders}
          icon={<UserGroupIcon className="h-6 w-6" />}
          trend={5}
        />
        <DashboardCard
          title="Total Shares"
          value={metrics.totalShares}
          icon={<DocumentTextIcon className="h-6 w-6" />}
          trend={8}
        />
        <DashboardCard
          title="Recent Payments"
          value={metrics.totalPayments}
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          trend={12}
        />
      </div>

      <div className="card">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="p-6">
          <DataTable
            columns={transactionColumns}
            data={metrics.recentTransactions}
            onRowClick={(row) => console.log('Transaction clicked:', row)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;