import React from "react";
import "../assets/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../assets/images/logo-mentor.png"
import { useContext,useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
export default function Index() {
  const [caseNumber, setCaseNumber]=useState('')
   const { setCaseNum} = useContext(UserContext); 
  const nav=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Nuevo valor del número de caso: ${value}`); // Aquí imprime el valor actual
    setCaseNumber(value);
    
  };
  
  const saveCaseNumber =()=>{
    setCaseNum(caseNumber)
    nav("/video")
  }

  return (
  <div className="indexBody indexCenter" >
  <div className="cont d-flex justify-content-center align-items-center">

    <div className="row text-center">
          <div className="col">
            <img alt="" src={img1} className="logoError" />
          </div>
        </div>
    </div>
    <div className="">
      
      <div className="container">
      
        <div className="text-center cont-form">
         
          <div className="row">
            <div className="col">
              <h3 className="text-center">Ingresa tu número de caso</h3>
            </div>
          </div>
          <div className="row mb-4 justify-content-center">
            <div className="col-6">
              <input
                type="number"
                required
                className="form-control text-center"
                placeholder="numero de caso"
                onChange={handleChange}
                value={caseNumber}
              />
            </div>
          </div>
          <div className="row mb-4 justify-content-center">
            <div className="col-6">
             <button className="btn btn-violet" onClick={()=>saveCaseNumber()}><span className="buttonText">Continuar</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
