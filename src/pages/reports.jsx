import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar/sidebar";

export default function Reports() {
  const nav = useNavigate();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigateTo = (route) => {
    nav(route);
    setOpen(false);
  };

  return (
    <div className="app indexBody d-flex align-items-center justify-content-center">
      <Sidebar
        open={open}
        toggleDrawer={toggleDrawer}
        navigateTo={navigateTo}
      />
    </div>
  );
}
