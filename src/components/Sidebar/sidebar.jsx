import React, { useContext, useState } from "react";
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
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import RegisterModal from "./registerModal";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(19, 20, 20)",
    },
    text: {
      primary: "#000",
    },
  },
});

export default function Sidebar({ open, toggleDrawer, navigateTo }) {
  const { role, user } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const trimmedPathname = location.pathname.startsWith("/")
    ? location.pathname.substring(1)
    : location.pathname;

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
          { text: "Videos", icon: <DashboardIcon />, route: "/dashboard" },
          { text: "Reportes", icon: <AssessmentIcon />, route: "/reports" },
          ...(role == "1"
            ? [
                {
                  text: "Registro",
                  icon: <AppRegistrationIcon />,
                  action: handleOpenModal,
                },
              ]
            : []),
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                if (item.action) item.action();
                else navigateTo(item.route);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <>
        <div className="col d-flex justify-content-start">
          <Button onClick={toggleDrawer(true)}>
            <MenuIcon className="text-white" />
          </Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {Menu}
          </Drawer>
          <Button />

          {location.pathname === "/Admin" ? (
            ""
          ) : (
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                padding: "10px",
                borderRadius: "5px",
                color: "#ffffff",
                "& .MuiBreadcrumbs-separator": {
                  color: "#ffffff",
                },
              }}
            >
              <Link underline="hover" color="inherit" href="/Admin">
                Admin
              </Link>
              <Typography color="text.light">{trimmedPathname}</Typography>
            </Breadcrumbs>
          )}
        </div>
        <div className="col d-flex align-items-center justify-content-end">
          <p className="fw-bold text-white pe-2 m-0 fs-5">{user}</p>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              localStorage.clear();
              navigateTo("/Login");
            }}
          >
            <PowerSettingsNewIcon
              size="small"
              className="text-white fw-bold m-0 p-0 fs-5"
            />
          </Button>
        </div>
        <RegisterModal open={modalOpen} handleClose={handleCloseModal} />
      </>
    </ThemeProvider>
  );
}
