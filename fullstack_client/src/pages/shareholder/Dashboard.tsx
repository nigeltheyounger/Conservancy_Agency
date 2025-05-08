import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../services/supabase';
import Card from '../../components/shared/Card';
import DataTable from '../../components/shared/DataTable';
import { 
  DocumentTextIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

const ShareholderDashboard = () => {
  const { profile } = useAuth();
  const [shares, setShares] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    if (profile?.id) {
      fetchShareholderData();
    }
  }, [profile]);

  const fetchShareholderData = async () => {
    const [sharesResponse, paymentsResponse] = await Promise.all([
      supabase
        .from('shares')
        .select('*')
        .eq('shareholder_id', profile?.id),
      supabase
        .from('payments')
        .select('*')
        .eq('shareholder_id', profile?.id)
        .order('transaction_date', { ascending: false })
        .limit(5)
    ]);

    setShares(sharesResponse.data || []);
    setPayments(paymentsResponse.data || []);
  };

  const shareColumns = [
    { key: 'certificate_number', label: 'Certificate Number' },
    { key: 'amount', label: 'Amount', render: (value: number) => value.toLocaleString() },
    { key: 'purchase_date', label: 'Purchase Date', render: (value: string) => new Date(value).toLocaleDateString() }
  ];

  const paymentColumns = [
    { key: 'amount', label: 'Amount', render: (value: number) => `KES ${value.toLocaleString()}` },
    { key: 'type', label: 'Type' },
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
    },
    { key: 'transaction_date', label: 'Date', render: (value: string) => new Date(value).toLocaleDateString() }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Shareholder Dashboard</h1>
        <div className="flex space-x-4">
          <button className="btn btn-primary">
            Download Statement
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Your Shares">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <DocumentTextIcon className="h-6 w-6 text-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-600">Total Shares</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {shares.reduce((sum, share) => sum + share.amount, 0).toLocaleString()}
            </span>
          </div>
          <DataTable
            columns={shareColumns}
            data={shares}
            onRowClick={(row) => console.log('Share clicked:', row)}
          />
        </Card>

        <Card title="Recent Payments">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-600">Total Payments</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              KES {payments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}
            </span>
          </div>
          <DataTable
            columns={paymentColumns}
            data={payments}
            onRowClick={(row) => console.log('Payment clicked:', row)}
          />
        </Card>
      </div>
    </div>
  );
};

export default ShareholderDashboard;