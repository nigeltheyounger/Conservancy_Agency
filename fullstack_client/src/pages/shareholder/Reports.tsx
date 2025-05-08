import React from 'react';
import { useQuery } from 'react-query';

const ShareholderReports = () => {
  const { data: reports } = useQuery('reports', () => fetchReports());

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Annual Reports</h2>
            <ul className="space-y-2">
              {reports?.annual?.map((report) => (
                <li key={report.id} className="flex items-center gap-2">
                  <span className="text-primary">📄</span>
                  <a href={report.url} className="hover:text-primary">
                    {report.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Financial Reports</h2>
            <ul className="space-y-2">
              {reports?.financial?.map((report) => (
                <li key={report.id} className="flex items-center gap-2">
                  <span className="text-primary">📊</span>
                  <a href={report.url} className="hover:text-primary">
                    {report.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Meeting Minutes</h2>
            <ul className="space-y-2">
              {reports?.minutes?.map((report) => (
                <li key={report.id} className="flex items-center gap-2">
                  <span className="text-primary">📝</span>
                  <a href={report.url} className="hover:text-primary">
                    {report.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareholderReports;