import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';

const AdminReports = () => {
  const [reportType, setReportType] = useState('shareholders');
  const [dateRange, setDateRange] = useState('month');
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    generateReport();
  }, [reportType, dateRange]);

  const generateReport = async () => {
    let query = supabase;

    switch (reportType) {
      case 'shareholders':
        const { data: shareholders } = await query
          .from('profiles')
          .select(`
            *,
            shares (amount),
            payments (amount)
          `)
          .eq('role', 'shareholder');
        setReportData(shareholders);
        break;

      case 'payments':
        const { data: payments } = await query
          .from('payments')
          .select(`
            *,
            profiles (first_name, last_name)
          `)
          .order('transaction_date', { ascending: false });
        setReportData(payments);
        break;

      // Add more report types as needed
    }
  };

  const exportToCsv = () => {
    // Implement CSV export logic
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Reports</h1>
        <button
          onClick={exportToCsv}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export to CSV
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex gap-4 mb-6">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="rounded-md border-gray-300"
          >
            <option value="shareholders">Shareholders Report</option>
            <option value="payments">Payments Report</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-md border-gray-300"
          >
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>

        {reportData && (
          <div className="overflow-x-auto">
            {/* Render report data based on reportType */}
            {reportType === 'shareholders' && (
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Total Shares</th>
                    <th className="px-6 py-3 text-left">Total Payments</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((item: any) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">{item.first_name} {item.last_name}</td>
                      <td className="px-6 py-4">
                        {item.shares?.reduce((acc: number, share: any) => acc + share.amount, 0) || 0}
                      </td>
                      <td className="px-6 py-4">
                        KES {item.payments?.reduce((acc: number, payment: any) => acc + payment.amount, 0) || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReports;