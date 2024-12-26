import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";

const  IsAuthUser = ({auth=false}) => {
    const isAuth = useSelector((state)=>state.auth.isAuthenticated)
    console.log(isAuth)

    if(auth){
        return isAuth?<Outlet/>:<Navigate to='/login' />
  }
         return !isAuth?<Outlet/>:<Navigate to='/home' />



}

export default IsAuthUser;