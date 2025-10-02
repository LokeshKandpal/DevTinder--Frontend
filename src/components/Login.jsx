// import axios from 'axios';
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addUser } from '../utils/userSlice';
// import { BASE_URL } from '../utils/constants';
// import { useNavigate } from 'react-router'; // ✅ correct import

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [isLoginForm, setIsLoginForm] = useState(true); // fixed typo

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Login handler
//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/login",
//         { email, password },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data.user || res.data));

//       // ✅ redirect to Feed after login
//       return navigate("/feed");
//     } catch (err) {
//       setError(err?.response?.data || "Something went wrong");
//       console.error(err);
//     }
//   };

//   // Signup handler
//   const handleSignUp = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/signup",
//         { firstName, lastName, email, password },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data.data || res.data.user || res.data));

//       // ✅ redirect to Profile after signup
//       return navigate("/profile");
//     } catch (err) {
//       setError(err?.response?.data || "Something went wrong");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center p-2" data-theme="dark">
//       <div className="card w-full max-w-sm bg-base-100 shadow-xl rounded-xl">
//         <div className="card-body p-6 pt-4">
//           <div className="text-center mb-3">
//             <h2 className="text-3xl font-bold text-purple-500 mb-2">
//               {isLoginForm ? "Login" : "Signup"}
//             </h2>
//             <p className="text-base-content/60 text-sm">
//               {isLoginForm
//                 ? "Enter your credentials to access your account"
//                 : "Create an account"}
//             </p>
//           </div>

//           <form
//             className="space-y-5"
//             onSubmit={(e) => {
//               e.preventDefault();
//               if (isLoginForm) handleLogin();
//               else handleSignUp();
//             }}
//           >
//             {/* Show first/last name only when signing up */}
//             {!isLoginForm && (
//               <>
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text text-base-content/60 p-2">Firstname</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     placeholder="Enter your first name"
//                     className="input input-bordered w-full bg-base-200 py-3"
//                   />
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text text-base-content/60 p-2">Lastname</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     placeholder="Enter your last name"
//                     className="input input-bordered w-full bg-base-200 py-3"
//                   />
//                 </div>
//               </>
//             )}

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text text-base-content/60 p-2">Email</span>
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="@ Enter your email"
//                 className="input input-bordered w-full bg-base-200 py-3"
//               />
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text text-base-content/60 p-2">Password</span>
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="🔒 Enter your password"
//                 className="input input-bordered w-full bg-base-200 py-3"
//               />
//             </div>

//             <p className="text-red-500">{error}</p>

//             <button
//               type="submit"
//               className="btn bg-purple-600 hover:bg-purple-700 border-purple-600 text-white w-full"
//             >
//               {isLoginForm ? "Login" : "Signup"}
//             </button>
//           </form>

//           <p
//             className="text-center cursor-pointer py-3 text-sm"
//             onClick={() => {
//               setIsLoginForm((v) => !v);
//               setError("");
//             }}
//           >
//             {isLoginForm ? "New user? Signup here" : "Existing user? Login here"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;





import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router'; // ✅ correct import
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true); // fixed typo
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Login handler
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user || res.data));

      // ✅ redirect to Feed after login
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  // Signup handler
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data || res.data.user || res.data));

      // ✅ redirect to Profile after signup
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-2" data-theme="dark">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl rounded-xl">
        <div className="card-body p-6 pt-4">
          <div className="text-center mb-3">
            <h2 className="text-3xl font-bold text-purple-500 mb-2">
              {isLoginForm ? "Login" : "Signup"}
            </h2>
            <p className="text-base-content/60 text-sm">
              {isLoginForm
                ? "Enter your credentials to access your account"
                : "Create an account"}
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (isLoginForm) handleLogin();
              else handleSignUp();
            }}
          >
            {/* Show first/last name only when signing up */}
            {!isLoginForm && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content/60 p-2">Firstname</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="input input-bordered w-full bg-base-200 py-3"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content/60 p-2">Lastname</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="input input-bordered w-full bg-base-200 py-3"
                  />
                </div>
              </>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/60 p-2">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="@ Enter your email"
                className="input input-bordered w-full bg-base-200 py-3"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/60 p-2">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="🔒 Enter your password"
                  className="input input-bordered w-full bg-base-200 py-3 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <p className="text-red-500">{error}</p>

            <button
              type="submit"
              className="btn bg-purple-600 hover:bg-purple-700 border-purple-600 text-white w-full"
            >
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </form>

          <p
            className="text-center cursor-pointer py-3 text-sm"
            onClick={() => {
              setIsLoginForm((v) => !v);
              setError("");
            }}
          >
            {isLoginForm ? "New user? Signup here" : "Existing user? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;