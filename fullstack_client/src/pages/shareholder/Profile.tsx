import React, { useState } from 'react';
import { useQuery } from 'react-query';

const ShareholderProfile = () => {
  const { data: profile } = useQuery('profile', () => fetchProfile());
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <img 
              src={profile?.avatar || '/default-avatar.png'} 
              alt="Profile" 
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">{profile?.name}</h2>
              <p className="text-gray-600">Shareholder ID: {profile?.shareholderId}</p>
            </div>
          </div>
          <button 
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Personal Information</h3>
            <div className="space-y-2">
              <p><span className="text-gray-600">Email:</span> {profile?.email}</p>
              <p><span className="text-gray-600">Phone:</span> {profile?.phone}</p>
              <p><span className="text-gray-600">Address:</span> {profile?.address}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Account Information</h3>
            <div className="space-y-2">
              <p><span className="text-gray-600">Member Since:</span> {profile?.joinDate}</p>
              <p><span className="text-gray-600">Share Count:</span> {profile?.shareCount}</p>
              <p><span className="text-gray-600">Account Status:</span> {profile?.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareholderProfile;