
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "../utils/constants";
// import { addRequests, removeRequest } from "../utils/requestSlice";

// const Requests = () => {
//   const dispatch = useDispatch();
//   const requests = useSelector((store) => store.request);

//   const reviewRequest = async (status, _id) => {
//     try {
//       await axios.post(
//         BASE_URL + "/request/review" + "/" + status + "/" + _id,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeRequest(_id));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchRequests = async () => {
//     try {
//       const requests = await axios.get(BASE_URL + "/user/requests/received", {
//         withCredentials: true,
//       });
//       dispatch(addRequests(requests.data.connectionRequests));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   if (!requests || requests.length === 0)
//     return (
//       <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
//         <div className="text-center">
//           <div className="w-20 h-20 mx-auto mb-6 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800">
//             <svg className="w-10 h-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//             </svg>
//           </div>
//           <h2 className="text-xl font-semibold text-zinc-300 mb-2">No pending requests</h2>
//           <p className="text-sm text-zinc-500">New connection requests will appear here</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-zinc-950 pt-20 pb-12 px-4">
//       <div className="max-w-3xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-white mb-3">
//             Connection Requests
//           </h1>
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg">
//               <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//               </svg>
//               <span className="text-sm font-medium text-white">{requests.length}</span>
//               <span className="text-sm text-zinc-500">Pending</span>
//             </div>
//           </div>
//         </div>

//         {/* Requests List */}
//         <div className="space-y-3">
//           {requests.map((request) => {
//             const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

//             return (
//               <div
//                 key={_id}
//                 className="bg-zinc-900 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors duration-200"
//               >
//                 <div className="p-4">
//                   <div className="flex items-start gap-4">
//                     {/* Profile Image */}
//                     <img
//                       alt={`${firstName} ${lastName}`}
//                       className="w-14 h-14 rounded-full object-cover flex-shrink-0"
//                       src={photoUrl}
//                     />

//                     {/* User Info & Actions */}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-start justify-between gap-4 mb-2">
//                         <div className="flex-1 min-w-0">
//                           <h2 className="text-base font-semibold text-white mb-0.5">
//                             {firstName} {lastName}
//                           </h2>
//                           {age && gender && (
//                             <p className="text-xs text-zinc-500">
//                               {age} • {gender}
//                             </p>
//                           )}
//                         </div>

//                         {/* Action Buttons - Desktop */}
//                         <div className="hidden sm:flex gap-2 flex-shrink-0">
//                           <button
//                             className="px-4 py-1.5 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-500 transition-colors duration-200"
//                             onClick={() => reviewRequest("accepted", request._id)}
//                           >
//                             Accept
//                           </button>
//                           <button
//                             className="px-4 py-1.5 bg-zinc-800 text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-750 transition-colors duration-200"
//                             onClick={() => reviewRequest("rejected", request._id)}
//                           >
//                             Decline
//                           </button>
//                         </div>
//                       </div>

//                       {about && (
//                         <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-3">
//                           {about}
//                         </p>
//                       )}

//                       {/* Action Buttons - Mobile */}
//                       <div className="flex sm:hidden gap-2">
//                         <button
//                           className="flex-1 px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-500 transition-colors duration-200"
//                           onClick={() => reviewRequest("accepted", request._id)}
//                         >
//                           Accept
//                         </button>
//                         <button
//                           className="flex-1 px-4 py-2 bg-zinc-800 text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-750 transition-colors duration-200"
//                           onClick={() => reviewRequest("rejected", request._id)}
//                         >
//                           Decline
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Requests;



import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review" + "/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const requests = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(requests.data.connectionRequests));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 flex items-center justify-center px-4 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDk5LDEwMiwyNDEsMC4xKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-white/5 backdrop-blur-2xl rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl">
            <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No pending requests</h2>
          <p className="text-sm text-slate-400">Connection requests will appear here</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 py-20 px-4 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDk5LDEwMiwyNDEsMC4xKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      {/* Blur orbs */}
      <div className="absolute top-40 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-sm mx-auto relative">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-3">Connection Requests</h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white">{requests.length} New</span>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

            return (
              <div
                key={_id}
                className="group relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 overflow-hidden hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/5 group-hover:to-pink-500/10 transition-all duration-500"></div>
                
                {/* Image Section */}
                <div className="relative h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-2xl blur-xl opacity-60"></div>
                    <img
                      src={photoUrl}
                      alt={firstName}
                      className="relative w-20 h-20 rounded-2xl object-cover border-4 border-white/30 shadow-2xl"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative p-5 bg-white/5 backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-white mb-1 text-center">
                    {firstName} {lastName}
                  </h3>
                  
                  {age && gender && (
                    <div className="flex items-center justify-center gap-2 text-sm mb-3">
                      <span className="text-slate-300">{age}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                      <span className="text-slate-300 capitalize">{gender}</span>
                    </div>
                  )}

                  {about && (
                    <p className="text-sm text-slate-300 mb-4 line-clamp-2 leading-relaxed text-center">
                      {about}
                    </p>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => reviewRequest("accepted", request._id)}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => reviewRequest("rejected", request._id)}
                      className="flex-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-2.5 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;