import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

export default function ProtectedRoute({ redirectPath = "/login" }) {
  const { id, role, user } = useContext(UserContext);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}/`);
        console.log(response);
        if (response.data.response.name_user === user && response.data.response.rol_id === role) {
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

    if (id && role && user) {
      getUser();
    } else {
      setIsAuthorized(false);
      setLoading(false);
    }
  }, [id, role, user]);

  if (loading) {
    return <div>Loading...</div>; // O muestra un spinner de carga
  }

  if (!isAuthorized) {
    localStorage.clear();
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
