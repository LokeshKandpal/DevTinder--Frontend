import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const UserProfileView = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(BASE_URL + "/user/" + userId, {
          withCredentials: true,
        });
        setUser(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data || "Error fetching user profile");
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white">User not found</div>
      </div>
    );
  }

  const { firstName, lastName, age, gender, about, photoUrl, skills } = user;

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">User Profile</h1>
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors"
          >
            Back to Connections
          </button>
        </div>

        <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
          {/* Profile Header with Image */}
          <div className="relative h-80 overflow-hidden">
            <img 
              src={photoUrl} 
              alt={`${firstName} ${lastName}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>
            
            {/* Name overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-lg text-violet-300">
                  {age} • {gender}
                </p>
              )}
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-8 space-y-6">
            {/* About Section */}
            {about && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white">About</h3>
                <p className="text-zinc-300 leading-relaxed">
                  {about}
                </p>
              </div>
            )}

            {/* Skills Section */}
            {skills && skills.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-violet-500/15 text-violet-300 text-sm font-medium rounded-lg border border-violet-500/30"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
