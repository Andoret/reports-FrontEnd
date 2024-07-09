import React, { useState, useEffect } from "react";
import { Box, Modal, Button, TextField, FormControl, InputLabel, MenuItem, Select, Snackbar, Alert } from "@mui/material";
import axios from 'axios';

const UserModal = ({ open, handleClose }) => {
  const [clientsData, setClientsData] = useState([]);
  const [userInfo, setUserInfo] = useState({
    user_name: "",
    password: "",
    client_id: "",
    rol_id: 2
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    getClients();
    if (!open) {
      setUserInfo({
        user_name: "",
        password: "",
        client_id: "",
        rol_id: 2
      });
    }
  }, [open]);

  const getClients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/clients/all");
      setClientsData(response.data.results);
      console.log(clientsData)
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saverUser = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name_user: userInfo.user_name,
        password: userInfo.password,
        client_id: userInfo.client_id,
        rol_id: userInfo.rol_id,
      };
      console.log(data

      )
      const response = await axios.post("http://localhost:3000/users/register/",data);
      if (response.data.success) {
        setSnackbarMessage("Usuario registrado exitosamente");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        handleClose(); 
      }
    } catch (error) {
      setSnackbarMessage("Error al registrar el usuario");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "rgb(19, 20, 20)",
              p: 4,
              width: 400,
              maxWidth: "90%",
              borderRadius: "5px",
            }}>
           <div className="text-center ">
              <h3 className="text-white">Registrar usuario</h3>
            </div>
            <form onSubmit={saverUser}>
              <div className="row mt-2">
                <TextField
                  name="user_name"
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
                    input: { color: "white", textAlign: "center" },
                    label: { color: "white" },
                  }}
                />
              </div>
              <div className="row mt-2">
                <TextField
                  name="password"
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
                    input: { color: "white", textAlign: "center" },
                    label: { color: "white" },
                  }}
                />
              </div>
              <div className="row mt-2">
                <FormControl sx={{ m: 1, minWidth: 80, color: "#FFFFFF" }}>
                  <InputLabel sx={{ color: "white" }}>Cliente</InputLabel>
                  <Select
                    name="client_id"
                    onChange={handleChange}
                    autoWidth
                    label="Cliente"
                    sx={{ color: "white" }}
                    value={userInfo.client_id? userInfo.client_id:0}
                  >
                    <MenuItem value={0} disabled>
                      <em>None</em>
                    </MenuItem>
                    {clientsData.map((client) => (
                      <MenuItem value={client.client_id} key={client.client_id}>
                        {client.client_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="row mt-4 d-flex justify-content-between">
                <div className="col-4 m-2">
                  <Button onClick={handleClose} color="error">Cancelar</Button>
                </div>
                <div className="col-5 m-2">
                  <Button type="submit" color="success">Registrar</Button>
                </div>
              </div>
            </form>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '30%', bgcolor:"rgb(19, 20, 20)",color:"white",borderRadius:"5px" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserModal;
