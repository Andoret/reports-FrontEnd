import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

export default function ProtectedRoute({ redirectPath = "/login" }) {
  const { id, role, user } = useContext(UserContext);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(" ",id ," ", role," ", user)
    if (id && role && user) {
      getUser();
    }  else {
      setIsAuthorized(false); 
      setLoading(false);
    }
  }, [id, role, user]);


  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${id}/`);
      console.log(response);
      if (response.data.response.name_user === user && response.data.response.rol_id === parseInt(role)) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    console.log("estado de autorizacion: ",isAuthorized)
    return <div>Loading...</div>; 
   
  }

  if (!isAuthorized) {
    localStorage.clear()
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
