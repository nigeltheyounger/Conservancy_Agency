import React from 'react';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form className="space-y-4">
            <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
            <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
            <textarea placeholder="Message" className="w-full p-2 border rounded h-32"></textarea>
            <button className="bg-primary text-white px-6 py-2 rounded">Send Message</button>
          </form>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          {/* Add contact details */}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;