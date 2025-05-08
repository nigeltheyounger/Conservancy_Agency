import React from 'react';
import { useQuery } from 'react-query';

const ShareholderNotifications = () => {
  const { data: notifications } = useQuery('notifications', () => fetchNotifications());

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications?.map((notification) => (
          <div key={notification.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-start gap-4">
              <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-300' : 'bg-primary'}`} />
              <div>
                <h3 className="font-semibold">{notification.title}</h3>
                <p className="text-gray-600">{notification.message}</p>
                <span className="text-sm text-gray-500">{notification.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShareholderNotifications;