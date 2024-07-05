import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Button, Slide } from "@mui/material";

const VideoListItem = ({ video }) => {
  const [open, setOpen] = React.useState(false);

  const copyURL = (videoName) => {
    const url = `http://localhost:5173/video/${videoName}`;
    const tempText = document.createElement("textarea");
    tempText.value = url;
    document.body.appendChild(tempText);
    tempText.select();
    document.execCommand("copy");
    document.body.removeChild(tempText);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="video-list-item border border-black p-1" onClick={() => copyURL(video.name_video)}>
      <video controls width="300" height="200">
        <source src={video.src} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video
      </video>
      <p className="text-white">{video.name_video}</p>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        TransitionComponent={Slide}
        onClose={handleClose}
        message={`URL del video ${video.name_video} copiada`} 
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </div>
  );
};

export default VideoListItem;
