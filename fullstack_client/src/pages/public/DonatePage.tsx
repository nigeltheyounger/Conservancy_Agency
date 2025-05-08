import React from 'react';

const DonatePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Support Our Conservation Efforts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Why Donate?</h2>
          <p className="text-gray-700">Your contribution helps protect wildlife...</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Donation Options</h2>
          {/* Add donation form or payment options */}
        </div>
      </div>
    </div>
  );
};

export default DonatePage;