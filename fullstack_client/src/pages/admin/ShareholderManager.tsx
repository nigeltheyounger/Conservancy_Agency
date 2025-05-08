import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';

const ShareholderManager = () => {
  const [shareholders, setShareholders] = useState<any[]>([]);
  const [selectedShareholder, setSelectedShareholder] = useState<any>(null);

  useEffect(() => {
    fetchShareholders();
  }, []);

  const fetchShareholders = async () => {
    const { data } = await supabase
      .from('profiles')
      .select(`
        *,
        shares (
          amount,
          certificate_number
        ),
        payments (
          amount,
          status,
          transaction_date
        )
      `)
      .eq('role', 'shareholder');
    setShareholders(data || []);
  };

  const updateShareholderStatus = async (id: string, status: string) => {
    await supabase
      .from('profiles')
      .update({ status })
      .eq('id', id);
    fetchShareholders();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Shareholder Management</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shareholders.map(shareholder => (
              <tr key={shareholder.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200">
                      <img 
                        src={shareholder.profile_image_url || "https://via.placeholder.com/40"} 
                        alt="" 
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {shareholder.first_name} {shareholder.last_name}
                      </div>
                      <div className="text-sm text-gray-500">{shareholder.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {shareholder.shares?.reduce((acc: number, share: any) => acc + share.amount, 0) || 0}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${shareholder.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {shareholder.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button 
                    onClick={() => setSelectedShareholder(shareholder)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => updateShareholderStatus(
                      shareholder.id, 
                      shareholder.status === 'active' ? 'suspended' : 'active'
                    )}
                    className={`${
                      shareholder.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                    }`}
                  >
                    {shareholder.status === 'active' ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shareholder Detail Modal */}
      {selectedShareholder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-semibold mb-4">Shareholder Details</h2>
            {/* Add detailed shareholder information here */}
            <button 
              onClick={() => setSelectedShareholder(null)}
              className="mt-4 bg-gray-200 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareholderManager;