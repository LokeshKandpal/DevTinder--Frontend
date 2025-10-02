// import axios from "axios";
// import { useEffect } from "react";
// import { BASE_URL } from "../utils/constants";
// import { useSelector , useDispatch } from "react-redux";
// import { addConnection , removeConnection } from "../utils/connectionSlice";


// const Connections = () => {
 
//   const connections = useSelector((store) => store.connection);
//   console.log(connections);
//   const dispatch = useDispatch();
  
//   const fetchConnections = async () => {
//     try {
//       dispatch(removeConnection());
//       const connections = await axios.get(BASE_URL + "/user/connections", {
//         withCredentials: true,
//       });
//       dispatch(addConnection(connections.data.data));
//       //   console.log(connections.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   if (!connections) return;
//   if (connections.length === 0)
//     return (
//       <>
//         <h1 className="flex justify-center text-2xl my-10 text-green-300">
//           No conections found
//         </h1>
//       </>
//     );

//   return (
//     <div className=" text-center my-10">
//       <h1 className="font-bold text-3xl text-pink-400">Connections ({connections.length})</h1>
//       {connections.map((connection) => {
//         const {_id, firstName, lastName, photoUrl, age, gender, about } =
//           connection;

//         return (
//           <div key={_id} className="flex items-center m-2 p-2  rounded-lg bg-base-300 w-1/2 mx-auto">
//             <div>
//               <img
//                 alt="photo"
//                 className="w-14 h-14 rounded-full object-contain"
//                 src={photoUrl}
//               />
//             </div>
//             <div className="text-left m-4 p-4 ">
//               <h2 className="font-bold text-xl">
//                 {firstName + " " + lastName}
//               </h2>
//               {age && gender && <p>{age + " " + gender}</p>}
//               <p>{about}</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Connections;


import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addConnection, removeConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchConnections = async () => {
    try {
      dispatch(removeConnection());
      const connections = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(connections.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Filter connections based on search query
  const filteredConnections = connections?.filter((connection) => {
    const fullName = `${connection.firstName} ${connection.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || 
           connection.about?.toLowerCase().includes(query);
  });

  if (!connections) return;
  
  if (connections.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-violet-500/10 rounded-full flex items-center justify-center border-2 border-violet-500/20">
            <svg className="w-12 h-12 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-zinc-200">No Connections Yet</h2>
          <p className="text-zinc-400 max-w-md">Start connecting with people to see them here!</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          {/* Title and Stats Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-5xl font-bold text-white mb-3">
                Connections
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full">
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-violet-300">{connections.length} Connected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search connections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-11 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200"
            />
            <svg 
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-md transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        {searchQuery && (
          <p className="text-sm text-zinc-400 mb-4">
            Found {filteredConnections.length} {filteredConnections.length === 1 ? 'result' : 'results'}
          </p>
        )}

        {/* No results message */}
        {filteredConnections.length === 0 && searchQuery && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto bg-zinc-800/50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-zinc-300 mb-2">No matches found</h3>
            <p className="text-zinc-500">Try searching with a different name</p>
          </div>
        )}

        {/* Connections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredConnections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

            return (
              <div
                key={_id}
                className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 group"
              >
                {/* Image Section */}
                <div className="relative h-40 bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden">
                  <img
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={photoUrl}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="p-4 space-y-2.5">
                  {/* Name */}
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {firstName} {lastName}
                    </h2>
                    {age && gender && (
                      <p className="text-xs text-violet-300 mt-0.5">
                        {age} • {gender}
                      </p>
                    )}
                  </div>

                  {/* About */}
                  {about && (
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {about}
                    </p>
                  )}

                  {/* Action Button */}
                  <button className="w-full py-2 bg-violet-600/10 text-violet-300 rounded-lg font-medium text-sm border border-violet-500/20 hover:bg-violet-600/20 hover:border-violet-400/40 transition-all duration-200">
                    View Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;