import React, { useEffect } from 'react';
import { NavBar } from './NavBar';
import { Outlet, useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import AIAssistant from './AIAssistant';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);

return (
    <>
      {user && <NavBar />}
      <Outlet />
      <AIAssistant />
    </>
  );
};

export default Body;
