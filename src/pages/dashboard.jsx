import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/index.css";
import Sidebar from "../components/Sidebar/sidebar";
import VideoList from "../components/Videolist/videoList";
import axios from "axios";
import "../assets/styles/dashboard.css";
import { UserContext } from "../context/UserContext";
import { Button, Snackbar, Slide } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export default function Dashboard() {
  const { clientId } = useContext(UserContext);
  const urlVideos = `http://localhost:3000/video/clienteid/${clientId}`;
  const urlPost = "http://localhost:3000/video/create";
  const nav = useNavigate();
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [name_video, setVideoName] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await axios.get(urlVideos);
      console.log(response);
      const updatedVideos = response.data.results.map((video) => ({
        ...video,
        src: `/videos/${clientId}/${video.name_video}.mp4`,
      }));
      setVideos(updatedVideos);
    } catch (error) {
      console.error("Error al obtener los videos:", error.message);
      // Manejo de errores: muestra un mensaje al usuario o redirige a una página de error
    }
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigateTo = (route) => {
    nav(route);
    setOpen(false);
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
        <div className="col d-flex justify-content-end">
          <Button
            variant="contained"
            onClick={handleUploadClick}
            startIcon={<FileUploadIcon />}
            sx={{
              background: "white",
              color: "black",
              marginLeft: "3%",
              marginTop: "15px",
              alignSelf: "rigth"
            }}
          >
            Agregar video
          </Button>
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
                <label htmlFor="file-upload" style={{width: "100%"}}>
                  <Button
                    component="file"
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
                      component="label"
                      variant="contained"
                      color="success"
                      onClick={validate}
                      sx={{ mt: 2, width: "100%"}}
                    >
                      Subir Archivo
                    </Button>
                  </div>
                )}
                <Button
                  id="btnClose"
                  component="label"
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
        </div>
        <div className="row p-3 video-list-container">
          <VideoList videos={videos} handleVideoDeleted={handleVideoDeleted} />
        </div>
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
