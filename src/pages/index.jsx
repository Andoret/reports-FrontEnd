import React, { useContext, useState } from 'react';
import "../assets/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../assets/images/logo-mentor.png";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

export default function Index() {
  const [caseNumber, setCaseNumber] = useState("");
  const [error,setError]=useState('');
  const { setCaseNum } = useContext(UserContext);
  const nav = useNavigate();

  const handleChange = (e) => {
    const { value } = e.target;
    console.log(`Nuevo valor del número de caso: ${value}`); // Aquí imprime el valor actual
    setCaseNumber(value);
  };

  const saveCaseNumber = () => {
    if (!caseNumber){
      setError("Ingresa un numero de caso")
    }
    else{
      setCaseNum(caseNumber);
      nav("/video");
    }
    
  };

  return (
    <div className="indexBody indexCenter">
      <div>
        <div className="cont d-flex justify-content-center align-items-center">
        </div>
        <div className="">
          <div className="container">
            
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
          </div>
        </div>
      </div>
    </div>
  );
}
