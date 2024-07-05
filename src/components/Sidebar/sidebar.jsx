import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MenuIcon from '@mui/icons-material/Menu';

export default function Sidebar({ open, toggleDrawer, navigateTo }) {
  const Menu = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          { text: "Index", icon: <HomeIcon />, route: "/admin" },
          { text: "Subir videos", icon: <FileUploadIcon />, route: "/upload" },
          { text: "Videos", icon: <DashboardIcon />, route: "/dashboard" },
          { text: "Reportes", icon: <AssessmentIcon />, route: "/reports" },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigateTo(item.route)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        <span> <MenuIcon className="text-white"/> </span>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {Menu}
      </Drawer>
    </>
  );
}
