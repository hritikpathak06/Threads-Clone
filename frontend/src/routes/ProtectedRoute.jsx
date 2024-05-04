import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {

  const {Component} = props;

  const [isAuthenticated,setIsAuthenticated] = useState(true);

  const {user} = useSelector((state) => state.userData);

  console.log("User: ",user)

  // const getMyProfile = async () => {
  //   try {
  //     const { data } = await axios.get(`/api/v1/user/me`);
  //      if(data.success){
  //       setIsAuthenticated(true);
  //      }

  //   } catch (error) {
  //     console.error("Error fetching user data: ", error);
  //   }
  // };

  // useEffect(() => {
  //   getMyProfile();
  // }, [isAuthenticated]);


    return user ? <Component/> : <h1>Sorry For the data</h1>
}

export default ProtectedRoute

