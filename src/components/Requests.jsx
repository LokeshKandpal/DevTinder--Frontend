// import axios from "axios";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "../utils/constants";
// import { addRequests, removeRequest } from "../utils/requestSlice";


//   const Requests = () => {
//             const dispatch = useDispatch();
//             const requests = useSelector((store) => store.request);
//             console.log(requests);

//             const reviewRequest = async (status, _id) => {
//                 try {
//                     const res = await axios.post(
//                         BASE_URL + "/request/review" + "/" + status + "/" + _id,
//                         {},
//                         { withCredentials: true }
//                     );
//                     dispatch(removeRequest(_id));
//                 } catch (error) {
//                     console.log(error);
//                 }
//             };

//             const fetchRequests = async () => {
//                 try {
//                     const requests = await axios.get(BASE_URL + "/user/requests/received", {
//                         withCredentials: true,
//                     });
//                     dispatch(addRequests(requests.data.connectionRequests));
//                     //   console.log(requests.data.connectionRequests);
//                 } catch (error) {
//                     console.log(error);
//                 }
//             };

//             useState(() => {
//                 fetchRequests();
//             }, []);
//             if (!requests) return;
//             if (requests.length == 0)
//                 return (
//                     <>
//                         <h1 className="flex justify-center text-2xl my-10 text-green-300">
//                             No Requests found
//                         </h1>
//                     </>
//                 );

//             return (
//                 <div className=" text-center my-10">
//                     <h1 className="font-bold text-3xl text-pink-400 p-4">
//                         Requests ({requests.length})
//                     </h1>
//                     {requests.map((request) => {
//                         const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

//                         return (
//                             <div
//                                 key={_id}
//                                 className="flex justify-between items-center m-2 p-2  rounded-lg bg-base-300 w-2/3 mx-auto"
//                             >
//                                 <div>
//                                     <img
//                                         alt="photo"
//                                         className="w-14 h-14 rounded-full object-contain"
//                                         src={photoUrl}
//                                     />
//                                 </div>
//                                 <div className="text-left m-4 p-4 ">
//                                     <h2 className="font-bold text-xl">
//                                         {firstName + " " + lastName}
//                                     </h2>
//                                     {age && gender && <p>{age + " " + gender}</p>}
//                                     <p>{about}</p>
//                                 </div>
//                                 <div className="">
//                                     <button
//                                         className="btn btn-secondary mx-2"
//                                         onClick={() => reviewRequest("accepted", request._id)}
//                                     >
//                                         Accept
//                                     </button>
//                                     <button
//                                         className="btn btn-primary mx-2"
//                                         onClick={() => reviewRequest("rejected", request._id)}
//                                     >
//                                         Reject
//                                     </button>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             );
//         };
//  export default Requests




import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
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

  useState(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800">
            <svg className="w-10 h-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-zinc-300 mb-2">No pending requests</h2>
          <p className="text-sm text-zinc-500">New connection requests will appear here</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-3">
            Connection Requests
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg">
              <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <span className="text-sm font-medium text-white">{requests.length}</span>
              <span className="text-sm text-zinc-500">Pending</span>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-3">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

            return (
              <div
                key={_id}
                className="bg-zinc-900 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors duration-200"
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Profile Image */}
                    <img
                      alt={`${firstName} ${lastName}`}
                      className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                      src={photoUrl}
                    />

                    {/* User Info & Actions */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                          <h2 className="text-base font-semibold text-white mb-0.5">
                            {firstName} {lastName}
                          </h2>
                          {age && gender && (
                            <p className="text-xs text-zinc-500">
                              {age} • {gender}
                            </p>
                          )}
                        </div>

                        {/* Action Buttons - Desktop */}
                        <div className="hidden sm:flex gap-2 flex-shrink-0">
                          <button
                            className="px-4 py-1.5 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-500 transition-colors duration-200"
                            onClick={() => reviewRequest("accepted", request._id)}
                          >
                            Accept
                          </button>
                          <button
                            className="px-4 py-1.5 bg-zinc-800 text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-750 transition-colors duration-200"
                            onClick={() => reviewRequest("rejected", request._id)}
                          >
                            Decline
                          </button>
                        </div>
                      </div>

                      {about && (
                        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-3">
                          {about}
                        </p>
                      )}

                      {/* Action Buttons - Mobile */}
                      <div className="flex sm:hidden gap-2">
                        <button
                          className="flex-1 px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-500 transition-colors duration-200"
                          onClick={() => reviewRequest("accepted", request._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="flex-1 px-4 py-2 bg-zinc-800 text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-750 transition-colors duration-200"
                          onClick={() => reviewRequest("rejected", request._id)}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
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