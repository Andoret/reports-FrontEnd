import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar/sidebar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Divider, Snackbar, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "../assets/styles/admin.css";
import axios from "axios";
import Slide from "@mui/material/Slide";
import { UserContext } from "../context/UserContext";

export default function Admin() {
  const { clientId } = useContext(UserContext);
  const urlPost = "http://localhost:3000/video/create";
  const nav = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [name_video, setVideoName] = useState("");
  const [preview, setPreview] = useState("");

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

  const toggleSidebar = (newOpen) => () => {
    setSidebarOpen(newOpen);
  };

  const navigateTo = (route) => {
    nav(route);
    setSidebarOpen(false);
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
    setSidebarOpen(false);
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
    await axios
      .post(urlPost, params, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (respuesta) {
        console.log("Subido con éxito");
        document.getElementById("btnClose").click();
        setSnackOpen(true);
      })
      .catch(function (error) {
        console.log(
          `El video ${name_video} no se subió por el siguiente error: ${error}`
        );
      });
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
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
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
                  sx={{ mt: 2, width: "100%" }}
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
