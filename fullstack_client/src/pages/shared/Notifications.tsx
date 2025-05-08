import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetchNotifications();
    setupRealtimeSubscription();
  }, []);

  const fetchNotifications = async () => {
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });
    setNotifications(data || []);
  };

  const setupRealtimeSubscription = () => {
    const subscription = supabase
      .channel('notifications')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, 
        payload => {
          fetchNotifications();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Notifications</h2>
      <div className="space-y-4">
        {notifications.map(notification => (
          <div 
            key={notification.id}
            className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-102 hover:shadow-xl"
          >
            <div className="flex items-start">
              <div className={`p-2 rounded-full ${
                notification.type === 'meeting' ? 'bg-blue-100' :
                notification.type === 'payment' ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {/* Add appropriate icon based on notification type */}
                </svg>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                <p className="mt-1 text-gray-600">{notification.message}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span>{new Date(notification.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;