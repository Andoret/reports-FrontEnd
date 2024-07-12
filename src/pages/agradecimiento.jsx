import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/agradecimiento.css"; 

export default function Agradecimiento() {

  return (
    <div className="app indexBody d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 d-flex flex-column align-items-center text-center">
            <div className="mb-4">
              <h1 className="fs-1">Gracias por su ayuda.</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
