import React from 'react'
import { NavBar } from './NavBar'
import Login from './Login'
import Profile from './Profile'
import { Outlet } from 'react-router'


const Body = () => {
  return (
   <>
   
   
   <NavBar/>
   <Outlet/>
   
   
   </>
  )
}

export default Body