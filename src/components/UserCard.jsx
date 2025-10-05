import React from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
  console.log(user);
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills } = user;

  console.log("Extracted Skills:", skills);

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-96 rounded-2xl overflow-hidden bg-slate-900 shadow-2xl hover:shadow-xl transition-all duration-300 border border-slate-700 mt-8">
      
      {/* Image with gradient overlay */}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={photoUrl} 
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-purple-950/40 to-transparent"></div>
        
        {/* Name overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-4">
          <h2 className="text-2xl font-bold text-white mb-1">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-sm text-purple-300">
              {age} • {gender}
            </p>
          )}
        </div>
      </div>
      
      {/* Content section */}
      <div className="p-6 space-y-4">

        {/* About */}
        {about && (
          <p className="text-sm text-slate-300 leading-relaxed">
            {about}
          </p>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-purple-500/15 text-purple-300 text-xs font-medium rounded-lg border border-purple-500/30 hover:bg-purple-500/25 hover:border-purple-400/50 transition-all duration-200"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            className="flex-1 py-3 bg-rose-950/40 text-rose-400 rounded-xl font-semibold border border-rose-800/50 hover:bg-rose-900/60 hover:border-rose-700 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-rose-900/20"
            onClick={() => {
              handleSendRequest("ignored", _id);
            }}
          >
            Ignore
          </button>
          <button
            className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-violet-500 hover:scale-105 active:scale-95 shadow-lg shadow-purple-600/40 hover:shadow-purple-500/60 transition-all duration-200"
            onClick={() => {
              handleSendRequest("interested", _id);
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard