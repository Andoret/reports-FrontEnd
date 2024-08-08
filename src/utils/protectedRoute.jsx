import React, { useState, useEffect, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import CircularProgress from "@mui/material/CircularProgress";
import useConfig from "../constants/useConfig";

export default function ProtectedRoute({ redirectPath = "/login" }) {
  const config = useConfig();
  const { id, role, user, access_token } = useContext(UserContext);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (access_token) {
      getUser();
    } else {
      console.log("no esta realizando validacion", access_token)
      setIsAuthorized(false);
      setLoading(false);
    }
  }, [id, role, user,access_token]);

  const getUser = async () => {
    try {
      const response = await axios.post(
        
          'http://localhost:3000/auth/refresh',
          {}, 
          {
              headers: {
                  Authorization: `Bearer ${access_token}`,
              }
          }
      );
      if (response.data.success) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        console.log(response.data)
      }
    } catch (error) {
      console.log("Error");
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
        <CircularProgress
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        />
      </React.Fragment>
    );
  }

  if (!isAuthorized) {
    
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
