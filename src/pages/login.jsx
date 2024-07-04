import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import "../assets/styles/login.css"
import img1 from "../../public/mentor.png"
export default function Login() {
const [credentials, setCredentials]=useState({
    userid:'',
    password:''
})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(credential => ({
          ...credential,
          [name]: value,
        }));
        console.log(`Nuevo valor del ${name}: ${value}`); // Aquí imprime el valor actual
      };
  return (
    <div className="indexBody indexCenter" >
  <div className="cont d-flex justify-content-center align-items-center">


      
      <div className="container">
      
        <div className="text-center cont-form">
         
          <div className="row">
            <div className="col">
             <img src={img1} alt="" width={"100px"} />
            </div>
          </div>
          <div className="row mb-2 justify-content-center">
            <div className="col-6">
            <label id="labelAnimation">
                <input
                  type="text"
                  required
                  placeholder=" "
                  onChange={handleChange}
                  name='userid'
                  className="input-new "
                />
                <span className="labelName">Usuario</span>
              </label>
              
            </div>
          </div>
          <div className="row mb-4 justify-content-center">
            <div className="col-6">
              <label id="labelAnimation">
                <input
                  type="text"
                  required
                  placeholder=" "
                  onChange={handleChange}
                  name='password'
                  className="input-new"
                />
                <span className="labelName">Contraseña</span>
              </label>
              
            </div>
          </div>
          <div className="row mb-4 justify-content-center">
            <div className="col-6">
             <button className="btn btn-violet" ><span className="buttonText">Ingresar</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
