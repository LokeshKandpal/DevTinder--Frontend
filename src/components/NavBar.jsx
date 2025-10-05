 import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import  {Link , useNavigate}  from "react-router"
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";

export const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 backdrop-blur-md border-b border-slate-700/50 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="text-3xl font-black bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent hover:from-purple-300 hover:via-violet-300 hover:to-purple-300 transition-all duration-300">
              DevTinder
            </div>
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🔥</span>
          </Link>

          {user && (
            <div className="flex items-center">
              {/* Welcome Message */}
              <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm px-5 py-2.5 rounded-xl border border-slate-600/50 shadow-lg absolute right-24">
                <span className="text-2xl">👋</span>
                <span className="text-slate-300 font-medium">Welcome,</span>
                <span className="text-purple-400 font-bold">{user.firstName}</span>
              </div>

              {/* Profile Dropdown - At extreme right */}
              <div className="dropdown dropdown-end absolute right-6">
                <div
                  tabIndex={0}
                  role="button"
                  className="relative group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700 group-hover:border-purple-500 transition-all duration-300 shadow-lg group-hover:shadow-purple-500/50">
                    <img 
                      alt="User Avatar" 
                      src={user.photoUrL || user.photoUrl}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-purple-900/30 mt-5 w-64 p-2.5 z-50 border border-purple-500/30"
                >
                  {/* User Info */}
                  <div className="px-3 py-2 mb-1.5 bg-gradient-to-br from-purple-600/20 to-violet-600/20 rounded-xl border border-purple-500/30">
                    <p className="text-white font-bold text-sm tracking-wide">{user.firstName} {user.lastName}</p>
                    <p className="text-purple-300 text-xs mt-0.5 font-medium">Account Settings</p>
                  </div>

                  <li className="mb-0.5">
                    <Link
                      to="/profile"
                      className="flex items-center justify-between hover:bg-purple-600/20 rounded-xl p-2.5 text-white transition-all duration-200 group border border-transparent hover:border-purple-500/40"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/30 to-violet-600/30 flex items-center justify-center group-hover:from-purple-500/40 group-hover:to-violet-600/40 transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-sm tracking-wide">My Profile</span>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-500/30 text-emerald-300 text-xs font-bold rounded-md border border-emerald-500/40">NEW</span>
                    </Link>
                  </li>

                  <li className="mb-0.5">
                    <Link
                      to="/connections"
                      className="flex items-center justify-between hover:bg-pink-600/20 rounded-xl p-2.5 text-white transition-all duration-200 group border border-transparent hover:border-pink-500/40"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/30 to-rose-600/30 flex items-center justify-center group-hover:from-pink-500/40 group-hover:to-rose-600/40 transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-sm tracking-wide">Connections</span>
                      </div>
                      <span className="text-lg">💗</span>
                    </Link>
                  </li>

                  <li className="mb-0.5">
                    <Link
                      to="/feed"
                      className="flex items-center justify-between hover:bg-blue-600/20 rounded-xl p-2.5 text-white transition-all duration-200 group border border-transparent hover:border-blue-500/40"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/30 to-cyan-600/30 flex items-center justify-center group-hover:from-blue-500/40 group-hover:to-cyan-600/40 transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v8H7V8z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-sm tracking-wide">Feed</span>
                      </div>
                      <span className="text-lg">🔥</span>
                    </Link>
                  </li>

                  <li className="mb-0.5">
                    <Link
                      to="/requests"
                      className="flex items-center justify-between hover:bg-amber-600/20 rounded-xl p-2.5 text-white transition-all duration-200 group border border-transparent hover:border-amber-500/40"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-600/30 flex items-center justify-center group-hover:from-amber-500/40 group-hover:to-orange-600/40 transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </div>
                        <span className="font-semibold text-sm tracking-wide">Requests</span>
                      </div>
                      <span className="text-lg">👁️</span>
                    </Link>
                  </li>

                  <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-1.5"></div>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 text-rose-300 hover:text-white hover:bg-rose-600/20 w-full p-2.5 rounded-xl transition-all duration-200 font-semibold text-sm group border border-transparent hover:border-rose-500/40 tracking-wide"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500/30 to-red-600/30 flex items-center justify-center group-hover:from-rose-500/40 group-hover:to-red-600/40 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
