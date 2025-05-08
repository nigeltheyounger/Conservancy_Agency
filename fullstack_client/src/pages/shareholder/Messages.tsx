import React, { useState } from 'react';
import { useQuery } from 'react-query';

const ShareholderMessages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { data: messages } = useQuery('messages', () => fetchMessages());

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Inbox</h2>
          </div>
          <div className="divide-y">
            {messages?.map((message) => (
              <div 
                key={message.id} 
                className="p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedMessage(message)}
              >
                <h3 className="font-semibold">{message.subject}</h3>
                <p className="text-sm text-gray-600 truncate">{message.preview}</p>
                <span className="text-xs text-gray-500">{message.date}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          {selectedMessage ? (
            <div>
              <h2 className="text-xl font-bold mb-4">{selectedMessage.subject}</h2>
              <p className="text-gray-600">{selectedMessage.content}</p>
            </div>
          ) : (
            <p className="text-center text-gray-500">Select a message to view</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareholderMessages;