import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/agradecimiento.css"; // Asegúrate de importar tu CSS personalizado aquí

export default function Agradecimiento() {
  const nav = useNavigate();

  const handleClick = () => {
    // Navegar a la ruta "/"
    nav("/");
  };

  return (
    <div className="app indexBody d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 d-flex flex-column align-items-center text-center">
            <div className="mb-4">
              <h1>Gracias por su ayuda.</h1>
            </div>
            <button
              className="btn btn-custom fw-bold"
              onClick={handleClick}
            >
              <span>Volver al inicio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
