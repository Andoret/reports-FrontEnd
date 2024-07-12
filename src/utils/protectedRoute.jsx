import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProtectedRoute({ redirectPath = "/login" }) {
  const { id, role, user } = useContext(UserContext);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && role && user) {
      getUser();
    } else {
      setIsAuthorized(false); 
      setLoading(false);
    }
  }, [id, role, user]);

  const getUser = async () => {
    try {
      axios.defaults.withCredentials = true;

      const response = await axios.get(`http://localhost:3000/users/${id}/`);
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
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
      </React.Fragment>
    );
  }

  if (!isAuthorized) {
    localStorage.clear();
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
