import React, { useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstname] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [skills, setSkills] = useState(user.skills || []);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("");
        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit", 
                { firstName, lastName, photoUrl, age, gender, about, skills },
                { withCredentials: true }
            );
            dispatch(addUser(res.data.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (error) {
            setError(error.response.data);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-16 pb-8 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-1">
                            Edit Profile
                        </h1>
                        <p className="text-slate-400 text-xs">Update your profile information and see the changes in real-time</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-5 justify-center items-start">
                        {/* Edit Form */}
                        <div className="w-full lg:w-[380px]">
                            <div className="bg-slate-900 rounded-xl shadow-2xl border border-slate-800 p-5">
                                
                                {/* Form Fields */}
                                <div className="space-y-3">
                                    {/* First Name */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstname(e.target.value)}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all"
                                            placeholder="Enter first name"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all"
                                            placeholder="Enter last name"
                                        />
                                    </div>

                                    {/* Age & Gender Row */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                                Age
                                            </label>
                                            <input
                                                type="text"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all"
                                                placeholder="Age"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                                Gender
                                            </label>
                                            <div className="dropdown w-full">
                                                <div 
                                                    tabIndex={0} 
                                                    role="button" 
                                                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm text-left hover:border-purple-500 transition-all cursor-pointer flex justify-between items-center"
                                                >
                                                    <span className={gender ? "text-white" : "text-slate-500"}>
                                                        {gender || "Select"}
                                                    </span>
                                                    <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                                <ul
                                                    tabIndex={0}
                                                    className="dropdown-content menu bg-slate-800 border border-slate-700 rounded-lg z-10 w-full p-1 shadow-xl mt-1"
                                                >
                                                    <li><button onClick={() => setGender("male")} className="text-white text-sm hover:bg-slate-700 rounded py-1.5">male</button></li>
                                                    <li><button onClick={() => setGender("female")} className="text-white text-sm hover:bg-slate-700 rounded py-1.5">female</button></li>
                                                    <li><button onClick={() => setGender("others")} className="text-white text-sm hover:bg-slate-700 rounded py-1.5">others</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Photo URL */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                                            Photo URL
                                        </label>
                                        <input
                                            type="text"
                                            value={photoUrl}
                                            onChange={(e) => setPhotoUrl(e.target.value)}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all"
                                            placeholder="https://example.com/photo.jpg"
                                        />
                                    </div>

                                    {/* Skills */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                                            Skills
                                        </label>
                                        <input
                                            type="text"
                                            value={skills}
                                            onChange={(e) => setSkills(e.target.value.split(","))}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all"
                                            placeholder="React, Node.js, MongoDB"
                                        />
                                        <p className="text-xs text-slate-500 mt-0.5">Separate with commas</p>
                                    </div>

                                    {/* About */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                                            About
                                        </label>
                                        <textarea
                                            value={about}
                                            onChange={(e) => setAbout(e.target.value)}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all resize-none h-16"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="mt-3 p-2 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                                        <p className="text-rose-400 text-xs text-center">{error}</p>
                                    </div>
                                )}

                                {/* Save Button */}
                                <button 
                                    onClick={saveProfile}
                                    className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-sm font-semibold rounded-lg hover:from-purple-500 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                                >
                                    Save Profile
                                </button>
                            </div>
                        </div>

                        {/* Preview Card */}
                        <div className="w-full lg:w-auto flex justify-center">
                            <div>
                                <div className="text-center mb-2">
                                    <h3 className="text-sm font-semibold text-slate-300">Live Preview</h3>
                                    <p className="text-xs text-slate-500">See how your profile looks</p>
                                </div>
                                <UserCard user={{ firstName, lastName, photoUrl, about, age, gender, skills }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Toast */}
            {showToast && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
                    <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-4 rounded-xl shadow-2xl border border-emerald-500/30 flex items-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-semibold">Profile saved successfully!</span>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
            `}</style>
        </>
    );
};

export default EditProfile;
