import React from 'react';
import { useQuery } from 'react-query';

const ShareholderShares = () => {
  const { data: shares } = useQuery('shares', () => fetchShareholderShares());

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Shares</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Total Shares</h2>
            <p className="text-3xl font-bold text-primary">{shares?.totalShares}</p>
          </div>
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Share Value</h2>
            <p className="text-3xl font-bold text-primary">KES {shares?.currentValue}</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Share History</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Transaction</th>
                <th className="text-left p-2">Shares</th>
                <th className="text-left p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {shares?.history?.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.date}</td>
                  <td className="p-2">{item.type}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">KES {item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShareholderShares;