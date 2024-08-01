import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Estilos
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/index.css";
import "../assets/styles/dashboard.css";

// Componentes
import Sidebar from "../components/Sidebar/sidebar";
import VideoList from "../components/Videolist/videoList";
import { UserContext } from "../context/UserContext";

// Componentes de MUI
import {
  Button,
  Snackbar,
  Slide,
  Skeleton,
  Select,
  MenuItem,
  Modal,
  Fade,
  Backdrop,
  Box,
  Typography,
  TextField,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { styled } from "@mui/material/styles";
import useConfig from "../constants/useConfig";

export default function Dashboard() {
  const { role } = useContext(UserContext);
  const { clientId } = useContext(UserContext);
  const { access_token } = useContext(UserContext);
  const config = useConfig();
  const urlVideosAdmin = `http://tpbooks5.teleperformance.co/api/video/all`;
  const urlVideos = `http://tpbooks5.teleperformance.co/api/video/clienteid/${clientId}`;
  const urlClients = `http://tpbooks5.teleperformance.co/api/clients/all`;
  const urlPost = "http://tpbooks5.teleperformance.co/api/video/create";
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [clients, setClients] = useState([]);
  const [uploadClientId, setUploadClientId] = useState(
    role == "2" ? `${clientId}` : "0"
  );
  const [selectedClient, setSelectedClient] = useState(
    role == "2" ? `${clientId}` : "0"
  );
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [name_video, setVideoName] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [duplicateError, setDuplicateError] = useState(false);

  useEffect(() => {
    role == 1 ? getVideosAdmin() : getVideos();
    getClients();
  }, []);

  useEffect(() => {
    setFilteredVideos(
      videos.filter(
        (video) =>
          video.name_video.toLowerCase().includes(filter.toLowerCase()) &&
          (selectedClient != 0 ? video.client_id == selectedClient : true)
      )
    );
  }, [filter, videos, selectedClient]);

  const getVideos = async () => {
    try {
      const response = await axios.get(urlVideos, config);
      const updatedVideos = response.data.results.map((video) => ({
        ...video,
        src: `/videos/${clientId}/${video.name_video}.mp4`,
      }));
      setVideos(updatedVideos);
      setLoading(false);
    } catch (error) {
      console.log("Error al obtener los videos:");
      setLoading(false);
      // Manejo de errores: muestra un mensaje al usuario o redirige a una página de error
    }
  };

  const getVideosAdmin = async () => {
    try {
      const response = await axios.get(urlVideosAdmin, config);
      const updatedVideos = response.data.response.map((video) => ({
        ...video,
        src:
          role == 1
            ? `/videos/${video.client_id}/${video.name_video}.mp4`
            : `/videos/${clientId}/${video.name_video}.mp4`,
            // ? `/videos/${video.client_id}/${video.name_video}.mp4`
            // : `/videos/${clientId}/${video.name_video}.mp4`,
      }));
      setVideos(updatedVideos);
      setLoading(false);
    } catch (error) {
      console.log("Error al obtener los videos:");
      setLoading(false);
      // Manejo de errores: muestra un mensaje al usuario o redirige a una página de error
    }
  };

  const getClients = async () => {
    try {
      const response = await axios.get(urlClients, config);
      setClients(response.data.results);
      setLoading(false);
    } catch (error) {
      console.log("Error al obtener los clientes:");
      setLoading(false);
      // Manejo de errores: muestra un mensaje al usuario o redirige a una página de error
    }
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigateTo = (route) => {
    navigate(route);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedClient(value);
  };

  const handleChangeUpload = (e) => {
    setUploadClientId(e.target.value);
  };

  const handleVideoDeleted = () => {
    getVideos();
  };

  const handleUploadClick = () => {
    setModalOpen(true);
    setDuplicateError(false);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFile(null);
    setPreview("");
  };

  const handleCloseSnack = () => {
    setSnackOpen(false);
  };

  const validate = () => {
    if (!file) {
      console.log("Video no cargado");
      // Aquí puedes mostrar un mensaje de error al usuario.
      return;
    } else if (!name_video) {
      console.log("Especifica el nombre del video");
      // Aquí puedes mostrar un mensaje de error al usuario.
      return;
    } else if (!clientId && !uploadClientId) {
      console.log("Fallo al especificar el id del cliente");
      // Aquí puedes mostrar un mensaje de error al usuario.
      return;
    }

    const params = new FormData();
    params.append("name_video", name_video);
    const client_id = role == 1 ? uploadClientId : clientId;
    params.append("client_id", client_id);
    params.append("video", file);

    const duplicados = videos.find((u) => u.name_video === name_video);

    if (duplicados) {
      console.log("Nombre de video no disponible");
      setDuplicateError(true); // Mostrar la alerta de duplicado
      return;
    }

    uploadVideo(params);
  };

  const uploadVideo = async (params) => {
    try {
      const response = await axios.post(urlPost, params, {
        headers: {
          Authorization: access_token ? `Bearer ${access_token}` : "",
          "Content-Type": "multipart/form-data",
        },
      });
      document.getElementById("btnClose").click();
      setSnackOpen(true);
      role == 1 ? getVideosAdmin() : getVideos();
    } catch (error) {
      console.log(
        `El video ${name_video} no se subió`
      );
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="app indexBodyDash p-3">
      <section>
        <div className="row d-flex align-items-center mb-3">
          <Sidebar
            open={open}
            toggleDrawer={toggleDrawer}
            navigateTo={navigateTo}
          />
        </div>
        <div className="col d-flex justify-content-center align-items-center">
          <div className="w-100 d-flex justify-content-center align-items-center">
            <>
              <TextField
                id="standard-basic"
                label="Nombre del video"
                variant="outlined"
                onChange={(e) => setFilter(e.target.value)}
                sx={{
                  width: "50%",
                  marginRight: "15px",
                  input: { color: "white" },
                  label: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiFilledInput-root": {
                    backgroundColor: "#00000020",
                    "&:hover": {
                      backgroundColor: "#00000030",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#00000020",
                    },
                  },
                }}
              />
              {role == "1" ? (
                <Select
                  className="border text-white"
                  name="client_id"
                  onChange={handleChange}
                  autoWidth
                  label="Cliente"
                  value={selectedClient}
                  sx={{
                    color: "#fff", // Color del texto seleccionado
                    width: "20%", // Ancho del Select
                    marginRight: "15px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#fff", // Color del borde
                      },
                      "&:hover fieldset": {
                        borderColor: "#fff", // Color del borde al pasar el mouse
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#fff", // Color del borde cuando está enfocado
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#fff", // Color de la etiqueta
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#fff", // Color de la etiqueta cuando está enfocada
                    },
                    "& .MuiSelect-icon": {
                      color: "#fff", // Color del ícono del Select
                    },
                    "& .MuiInputBase-root": {
                      color: "#fff", // Color del texto no seleccionado
                    },
                    "& .MuiSelect-root": {
                      backgroundColor: "#fff", // Fondo del Select
                    },
                  }}
                >
                  <MenuItem value={0}>Todos los clientes</MenuItem>
                  {clients.map((client) => (
                    <MenuItem key={client.client_id} value={client.client_id}>
                      {client.client_name}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                ""
              )}
            </>
            <Button
              variant="contained"
              onClick={handleUploadClick}
              startIcon={<FileUploadIcon />}
              sx={{
                background: "white",
                color: "black",
                height: "80%",
                maxWidth: "20%",
              }}
            >
              Agregar video
            </Button>
          </div>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalOpen}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalOpen}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Subir Video
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Selecciona un video para subir y ver la vista previa.
              </Typography>
              <input
                accept="video/*"
                style={{ display: "none" }}
                id="file-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" style={{ width: "100%" }}>
                <Button
                  component="span"
                  variant="contained"
                  color="primary"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mt: 2, width: "100%" }}
                >
                  Seleccionar archivo
                </Button>
              </label>
              {file && (
                <div>
                  <TextField
                    required
                    id="outlined-basic"
                    onChange={(e) => setVideoName(e.target.value)}
                    label="Introduce el nombre del video"
                    variant="outlined"
                    sx={{ marginTop: "10px", width: "100%" }}
                  />
                  {duplicateError && (
                    <Alert severity="error" sx={{ mt: 1 }}>
                      Nombre de video duplicado. Por favor, elige otro nombre.
                    </Alert>
                  )}
                  {role == "1" && (
                    <Select
                      labelId="client-select-label"
                      sx={{ marginTop: "5px" }}
                      id="client-select"
                      value={uploadClientId}
                      onChange={(e) => {
                        setUploadClientId(e.target.value);
                      }}
                      fullWidth
                      required
                      margin="normal"
                      label="Selecciona un cliente"
                    >
                      <MenuItem
                        key={0}
                        className="text-dark"
                        value={"0"}
                        disabled
                      >
                        Selecciona un cliente
                      </MenuItem>
                      {clients.map((client) => (
                        <MenuItem
                          key={client.id}
                          className="text-dark"
                          value={client.client_id}
                        >
                          {client.client_name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  <video
                    width="100%"
                    controls
                    src={preview}
                    style={{ marginTop: "10px" }}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={validate}
                    sx={{ mt: 2, width: "100%" }}
                  >
                    Subir Archivo
                  </Button>
                </div>
              )}
              <Button
                id="btnClose"
                variant="contained"
                color="error"
                onClick={handleCloseModal}
                sx={{ mt: 2, width: "100%" }}
              >
                Cerrar
              </Button>
            </Box>
          </Fade>
        </Modal>
        {loading ? (
          <>
            <div
              className="row d-flex justify-content-around mt-5 align-content-center"
              style={{ height: "60vh" }}
            >
              <Skeleton variant="rectangular" width={400} height={200} />
              <Skeleton variant="rectangular" width={400} height={200} />
              <Skeleton variant="rectangular" width={400} height={200} />
            </div>
          </>
        ) : (
          <div className="row p-3 video-list-container">
            <VideoList
              videos={filteredVideos}
              handleVideoDeleted={handleVideoDeleted}
            />
          </div>
        )}
      </section>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={handleCloseSnack}
        message={`Video ${name_video} subido exitosamente`}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </div>
  );
}
