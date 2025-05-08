import React from 'react';
import { useQuery } from 'react-query';

const AdminShareholders = () => {
  const { data: shareholders } = useQuery('shareholders', () => fetchShareholders());

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shareholders Management</h1>
        <button className="bg-primary text-white px-4 py-2 rounded">
          Add Shareholder
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Shares</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {shareholders?.map((shareholder) => (
              <tr key={shareholder.id}>
                <td className="px-6 py-4">{shareholder.name}</td>
                <td className="px-6 py-4">{shareholder.id}</td>
                <td className="px-6 py-4">{shareholder.shares}</td>
                <td className="px-6 py-4">{shareholder.status}</td>
                <td className="px-6 py-4">
                  {/* Action buttons */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminShareholders;