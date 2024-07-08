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
import { Box, Modal } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import TextField from "@mui/material/TextField";


const theme = createTheme({
  palette: {
    primary: {
      main: "##5D5D5D",
    },
    text: {
      primary: "#000",
    },
  },
});

export default function Sidebar({ open, toggleDrawer, navigateTo }) {
  const { role, user } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [userInfo,setUserInfo]=useState({
    user_name: "",
    password: "",
    client_id:"",
  })
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const Menu = (
    <Box
      sx={{ width: 250}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}

    >
      <List>
        {[
          { text: "Index", icon: <HomeIcon />, route: "/admin" },
          { text: "Videos", icon: <DashboardIcon />, route: "/dashboard" },
          { text: "Reportes", icon: <AssessmentIcon />, route: "/reports" },
          ...(role === "1"
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

  const hola =()=>{
    console.log("hola")
  }
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((credential) => ({
      ...credential,
      [name]: value,
    }));
    console.log(`Nuevo valor del ${name}: ${value}`); 
  };
  return (
    <ThemeProvider theme={theme}>
      <>
        <div className="col">
          <Button onClick={toggleDrawer(true)}>
            <MenuIcon className="text-white" />
          </Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {Menu}
          </Drawer>
          <Button />
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

        {/* Modal */}
        <Modal open={modalOpen} onClose={handleCloseModal} sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: 'rgba(0, 0, 0, 0.7)', 
          },
          
        }}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#5D5D5D",
               bgcolor: "rgb(19, 20, 20)",
              p: 4,
              width: 400,
              maxWidth: "90%",
              borderRadius:"5px",
            }}
          >
            <div className="text-center">
              <h3 className="text-white">Registrar usuario</h3>
            </div>
            <form onSubmit={hola}></form>
            <div className="row mt-2">
            <TextField
                  label="Usuario"
                  InputProps={{
                    inputProps: { 
                        min: 1 
                    }
                }}
                  variant="standard"
                  className="textFieldLogin text-center"
                  onChange={handleChange}
                  type="text"
                  sx={{
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "white",
                    },
                    "& .MuiInput-underline:hover:before": {
                      borderBottomColor: "white",
                    },
                    input: { color: "white",  textAlign:"center" },
                    label: { color: "white" },
                    
                  }}
                />
            </div>
            <div className="row mt-2">
            <TextField
                  label="Contraseña"
                  InputProps={{
                    inputProps: { 
                        min: 1 
                    }
                }}
                  variant="standard"
                  className="textFieldLogin text-center"
                  onChange={handleChange}
                  type="password"
                  sx={{
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "white",
                    },
                    "& .MuiInput-underline:hover:before": {
                      borderBottomColor: "white",
                    },
                    input: { color: "white",  textAlign:"center" },
                    label: { color: "white" },
                    
                  }}
                />
            </div>
            <div className="row d-flex justify-content-between mt-4">
              <div className="col-6">
            <Button onClick={handleCloseModal}>x</Button>
            </div>
            <div className="col-6">
            <Button type="submit" color="success">Registrar</Button>
            </div>
            </div>
          </Box>
        </Modal>
      </>
    </ThemeProvider>
  );
}
