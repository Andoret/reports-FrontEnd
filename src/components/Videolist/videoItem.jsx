import React from "react";
import Snackbar from "@mui/material/Snackbar";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Slide,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../assets/styles/videoItem.css";
import axios from "axios";

const VideoListItem = ({ video, handleVideoDeleted }) => {
  const urlDelete = "http://localhost:3000/video/delete";
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const copyURL = (videoName) => {
    if (!openDelete) { // Evitar copiar URL si el modal de eliminación está abierto
      const url = `http://localhost:5173/video/${video.client_id}/${videoName}`;
      const tempText = document.createElement("textarea");
      tempText.value = url;
      document.body.appendChild(tempText);
      tempText.select();
      document.execCommand("copy");
      document.body.removeChild(tempText);
      setSnackbarMessage(`URL del video ${video.name_video} copiada`)
      setOpen(true);
    }
  };

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

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleClose = () => {
    setOpen(false);
  };

  const deleteVideo = () => {
    const id = video.id;
    axios
      .delete(`${urlDelete}/${id}`)
      .then((response) => {
        setSnackbarMessage(`Video ${video.name_video} eliminado exitosamente`);
        setOpenDelete(false);
        handleVideoDeleted(); 
      })
      .catch((error) => {
        console.error("Error al eliminar el video:", error);
        setSnackbarMessage(`Error al intentar eliminar el video ${video.name_video}`);
        setOpenDelete(false);
      })
      .finally(() => {
        setOpen(true);
      });
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    handleOpenDelete();
  };

  return (
    <div
      className="video-list-item border border-black ps-1 pe-1 pb-0"
      onClick={() => copyURL(video.name_video)}
    >
      <div className="row">
        <video controls width="100%" height="auto">
          <source src={video.src} type="video/mp4" />
          Tu navegador no soporta la etiqueta de video
        </video>
      </div>
      <div className="row d-flex justify-content-center align-items-center w-100 pt-2 mt-2 pb-0 mb-0 ms-0">
        <div className="col-10">
          <p className="text-white ms-2 fs-5">{video.name_video}</p>
        </div>
        <div className="col-2">
          <Tooltip title="Eliminar">
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        TransitionComponent={Slide}
        onClose={handleClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />

      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Eliminar video
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`¿Está seguro que desea eliminar el video ${video.name_video}?`}
          </Typography>
          <Button sx={{width: "49%", marginRight: "1%", mt: 2}} variant="contained" color="success" onClick={deleteVideo}>
            Eliminar
          </Button>
          <Button sx={{width: "49%", marginLeft: "1%", mt: 2}} variant="contained" color="error" onClick={handleCloseDelete}>
            Cancelar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default VideoListItem;
