import React from 'react';

const VisitPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Plan Your Visit</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Accommodation</h2>
          <p className="text-gray-700">Experience luxury in the heart of nature...</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Activities</h2>
          <p className="text-gray-700">Explore our range of activities...</p>
        </div>
      </div>
    </div>
  );
};

export default VisitPage;