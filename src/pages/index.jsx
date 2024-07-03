import React from "react";
import "../assets/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Index() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-50 indexBody">
      <div className="cont-form container vw-50 ">
        <div className="text-center">
          <div className="row">
            <img alt="" className="logoError" />
          </div>
          <div className="row">
            <div className="col">
              <h1 className="text-center">Ingrese su número de caso</h1>
            </div>
          </div>
          <div className="row mb-4 justify-content-center">
            <div className="col-6">
              <input
                type="number"
                required
                className="form-control text-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
