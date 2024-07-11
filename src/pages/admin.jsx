import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Divider,
  Typography,
  Button,
  Snackbar,
  TextField,
  Modal,
  Backdrop,
  Box,
  Fade,
  Select,
  MenuItem,
  Alert,
  Slide,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { UserContext } from "../context/UserContext";
import Sidebar from "../components/Sidebar/sidebar";
import "../assets/styles/admin.css";
import { styled } from "@mui/material/styles";

export default function Admin() {
  const { role, clientId } = useContext(UserContext);
  const urlVideosAdmin = `http://localhost:3000/video/all`;
  const urlVideos = `http://localhost:3000/video/clienteid/${clientId}`;
  const urlClients = `http://localhost:3000/clients/all`;
  const urlPost = "http://localhost:3000/video/create";
  const nav = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [name_video, setVideoName] = useState("");
  const [preview, setPreview] = useState("");
  const [uploadClientId, setUploadClientId] = useState(
    role === "2" ? clientId : "0"
  );
  const [duplicateError, setDuplicateError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    role === "1" ? getVideosAdmin() : getVideos();
    getClients();
  }, []);

  const getVideos = async () => {
    try {
      const response = await axios.get(urlVideos);
      const updatedVideos = response.data.results.map((video) => ({
        ...video,
        src: `/videos/${clientId}/${video.name_video}.mp4`,
      }));
      setVideos(updatedVideos);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los videos:", error.message);
      setLoading(false);
    }
  };

  const getVideosAdmin = async () => {
    try {
      const response = await axios.get(urlVideosAdmin);
      const updatedVideos = response.data.response.map((video) => ({
        ...video,
        src: `/videos/${video.client_id}/${video.name_video}.mp4`,
      }));
      setVideos(updatedVideos);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los videos:", error.message);
      setLoading(false);
    }
  };

  const getClients = async () => {
    try {
      const response = await axios.get(urlClients);
      setClients(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los clientes:", error.message);
      setLoading(false);
    }
  };

  const toggleSidebar = (newOpen) => () => {
    setSidebarOpen(newOpen);
  };

  const navigateTo = (route) => {
    nav(route);
    setSidebarOpen(false);
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
    setSidebarOpen(false);
  };

  const handleCloseSnack = () => {
    setSnackOpen(false);
  };

  const validate = () => {
    if (!file) {
      console.error("Video no cargado");
      return;
    } else if (!name_video) {
      console.error("Especifica el nombre del video");
      return;
    } else if (!clientId && !uploadClientId) {
      console.error("Fallo al especificar el id del cliente");
      return;
    }

    const params = new FormData();
    params.append("name_video", name_video);
    const client_id = role === "1" ? uploadClientId : clientId;
    params.append("client_id", client_id);
    params.append("video", file);

    const duplicados = videos.find((u) => u.name_video === name_video);

    if (duplicados) {
      console.error("Nombre de video no disponible");
      setDuplicateError(true);
      return;
    }

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
      role === "1" ? getVideosAdmin() : getVideos();
    } catch (error) {
      console.error(
        `El video ${name_video} no se subió por el siguiente error:`,
        error
      );
    }
  };

  return (
    <div className="app indexBody p-3">
      <section>
        <div className="row d-flex align-items-center mb-3">
          <Sidebar
            open={sidebarOpen}
            toggleDrawer={toggleSidebar}
            navigateTo={navigateTo}
          />
        </div>
        <div
          className="row p-3"
          style={{
            minHeight: "calc(100vh - 150px)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="col-sm-12 col-md-4 col-lg-4 mb-4 d-flex justify-content-center AdminCard">
            <Card
              sx={{
                width: "60%",
                maxWidth: "70%",
                alignContent: "center",
                backgroundColor: "rgb(19, 20, 20)",
                boxShadow: "rgba(5, 5, 5, 0.80) 0px 5px 15px",
              }}
              className="Cards"
              onClick={handleUploadClick}
            >
              <CardContent>
                <FileUploadIcon fontSize="large" />
                <Divider sx={{ width: "100%", my: 1 }} />
                <Typography variant="h4" align="center">
                  Subir videos
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 mb-4 d-flex justify-content-center AdminCard">
            <Card
              sx={{
                width: "60%",
                maxWidth: "70%",
                alignContent: "center",
                backgroundColor: "rgb(19, 20, 20)",
                boxShadow: "rgba(5, 5, 5, 0.80) 0px 5px 15px",
              }}
              className="Cards"
              onClick={() => navigateTo("/dashboard")}
            >
              <CardContent>
                <DashboardIcon fontSize="large" />
                <Typography variant="h4" align="center">
                  Videos
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 border-light mb-4 d-flex justify-content-center AdminCard">
            <Card
              sx={{
                width: "60%",
                maxWidth: "70%",
                alignContent: "center",
                backgroundColor: "rgb(19, 20, 20)",
                boxShadow: "rgba(5, 5, 5, 0.80) 0px 5px 15px",
              }}
              className="Cards"
              onClick={() => navigateTo("/reports")}
            >
              <CardContent>
                <AssessmentIcon fontSize="large" />
                <Typography variant="h4" align="center">
                  Reportes
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
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
                  sx={{
                    marginTop: "10px",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                />

                {duplicateError && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    Nombre de video duplicado. Por favor, elige otro nombre.
                  </Alert>
                )}
                {role === "1" && (
                  <Select
                    labelId="client-select-label"
                    sx={{ marginTop: "5px" }}
                    id="client-select"
                    value={uploadClientId}
                    onChange={(e) => setUploadClientId(e.target.value)}
                    fullWidth
                    required
                    label="Selecciona un cliente"
                  >
                    <MenuItem key={0} value={"0"} disabled>
                      Selecciona un cliente
                    </MenuItem>
                    {clients.map((client) => (
                      <MenuItem key={client.client_id} value={client.client_id}>
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
