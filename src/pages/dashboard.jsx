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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { styled } from "@mui/material/styles";

export default function Dashboard() {
  const { role } = useContext(UserContext);
  const { clientId } = useContext(UserContext);
  const urlVideos = `http://localhost:3000/video/clienteid/${clientId}`;
  const urlClients = `http://localhost:3000/clients/all`;
  const urlPost = "http://localhost:3000/video/create";
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(
    clientId ? `${clientId}` : "0"
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

  useEffect(() => {
    getVideos();
    getClients();
  }, []);

  useEffect(() => {
    setFilteredVideos(
      videos.filter((video) =>
        video.name_video.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, videos]);

  const getVideos = async () => {
    try {
      const response = await axios.get(urlVideos);
      console.log(response);
      const updatedVideos = response.data.results.map((video) => ({
        ...video,
        src: `/videos/${clientId}/${video.name_video}.mp4`,
      }));
      setVideos(updatedVideos);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los videos:", error.message);
      setLoading(false);
      // Manejo de errores: muestra un mensaje al usuario o redirige a una página de error
    }
  };

  const getClients = async () => {
    try {
      const response = await axios.get(urlClients);
      setClients(response.data.results);
      console.log(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los clientes:", error.message);
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

  const handleVideoDeleted = () => {
    getVideos();
  };

  const handleUploadClick = () => {
    setModalOpen(true);
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

  // Validación y subida del video
  const validate = () => {
    if (!file) {
      console.log("Video no cargado");
      return;
    } else if (!name_video) {
      console.log("Especifica el nombre del video");
      return;
    }
    const params = new FormData();
    params.append("name_video", name_video);
    params.append("client_id", clientId);
    params.append("video", file);

    uploadVideo(params);
  };

  const uploadVideo = async (params) => {
    try {
      const response = await axios.post(urlPost, params, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Subido con éxito");
      document.getElementById("btnClose").click();
      setSnackOpen(true);
      getVideos(); // Actualizar lista de videos después de subir uno nuevo
    } catch (error) {
      console.error(
        `El video ${name_video} no se subió por el siguiente error:`,
        error
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
            {console.log("Rol: ", role)}
            {role === "1" ? (
              <>
                <TextField
                  id="standard-basic"
                  className="me-3"
                  label="Buscar video 1"
                  variant="outlined"
                  onChange={(e) => setFilter(e.target.value)}
                  sx={{
                    width: "50%",
                    input: { color: "white", textAlign: "center" },
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
                  <MenuItem value={0} disabled>
                    Seleccione un cliente
                  </MenuItem>
                  {clients.map((client) => (
                    <MenuItem key={client.client_id} value={client.client_id}>
                      {client.client_name}
                    </MenuItem>
                  ))}
                </Select>
              </>
            ) : (
              <TextField
                id="standard-basic"
                label="Buscar video 2"
                variant="outlined"
                onChange={(e) => setFilter(e.target.value)}
                sx={{
                  width: "50%",
                  input: { color: "white", textAlign: "center" },
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
            )}

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
                    onChange={(e) => {
                      setVideoName(e.target.value);
                    }}
                    label="Introduce el nombre del video"
                    variant="outlined"
                    sx={{ marginTop: "10px", width: "100%" }}
                  />
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
