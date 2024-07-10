import React, { useState, useRef,useEffect,useContext} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/video.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import img1 from "../assets/images/logo-mentor.png";
import { UserContext } from "../context/UserContext";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: 'none',
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  p: 4,
  borderRadius: "5px",
  bgcolor: "rgb(19, 20, 20)"
};


export default function Video() {
  const {video} = useParams()
  const {id} = useParams()
  const nav = useNavigate();
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [caseNumber, setCaseNumber] = useState("");
  const [error,setError]=useState('');
  const { setCaseNum,setClientId} = useContext(UserContext);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "¿Seguro que quieres cerrar esta página?";
      event.returnValue = message; // Estándar
      return message; // Para navegadores antiguos
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      handleOpen()
      window.removeEventListener("beforeunload", handleBeforeUnload);
      
    };
    
  }, []);



  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

console.log(video)

  const handlePlay = () => {
    setVideoEnded(false);
  };

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    if (caseNumber) {
      setOpen(false);
    } else {
      setError("Ingresa un número de caso");
    }
  };
  const handleOpen = () => setOpen(true);


  const handleChange = (e) => {
    const { value } = e.target;
    console.log(`Nuevo valor del número de caso: ${value}`); 
    setCaseNumber(value);
  };

  const saveCaseNumber = () => {
    if (!caseNumber){
      setError("Ingresa un numero de caso")
    }
    else{
      setCaseNum(caseNumber);
      handleClose()
      console.log(open)
    }
    
  };
  const checkVideo=() =>{
    if (videoEnded){
      setClientId(id)
      nav("/survey")
    } 
  }
  return (
    <div className="app indexBody d-flex align-items-center justify-content-center">
      <Modal
        open={open}
        disableEnforceFocus
        disableAutoFocus
        disablePortal
        disableEscapeKeyDown
        onClose={(e, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleClose();
          }
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: 'rgba(0, 0, 0, 0.8)', 
          },
        }}
      >
        <Box sx={style}>
        <div className="text-center cont-form ">
            <div className="col mt-2 mb-2">
              <img alt="MentoryPro logo" src={img1} className="logoError" />
            </div>
              <div className="row">
                
                <div className="col mb-2">
                  <h4 className="text-center text-white">
                    Ingresa tu número de caso
                  </h4>
                </div>
              </div>
              <div className="row mb-4 justify-content-center">
                <div className="col-8">
                <TextField
                  label="Número de caso"
                  InputProps={{
                    inputProps: { 
                        min: 1 
                    }
                }}
                  variant="standard"
                  className="textFieldLogin text-center"
                  onChange={handleChange}
                  type="number"
                  sx={{
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "white",
                    },
                    "& .MuiInput-underline:hover:before": {
                      borderBottomColor: "white",
                    },
                    input: { color: "white",  textAlign:"center" },
                    label: { color: "white" },
                    "& input[type=number]::-webkit-inner-spin-button": {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                  }}
                /></div>
              </div>
              <div className="row mb-4 justify-content-center ">
            {error && <p className='text-danger mt-2 text-center'>{error}</p>}
                
                <div >
                  <button
                    className="btn btn-custom"
                    onClick={saveCaseNumber}
                  >
                    <span className="fw-bold text-white">Continuar</span>
                  </button>
                </div>
              </div>
            </div>
        </Box>
      </Modal>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 video-field d-flex flex-column justify-content-center">
            <div className="ratio ratio-16x9">
              <video
                ref={videoRef}
                className="embed-responsive-item"
                src={`/videos/${id}/${video}.mp4`}
                controls
                allowFullScreen
                controlsList="nodownload"
                onEnded={handleVideoEnd}
                onPlay={handlePlay}
              />
            </div>
            <button
              className={`btn-continue fw-bold ${videoEnded ? "active" : ""}`}
              disabled={!videoEnded}
              onClick={() => checkVideo()}
            >
              <span>Continuar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
