import React from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';

import axios from 'axios'
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
              <h3 className="text-center">Admin Center</h3>
            </div>
          </div>
          <div className="row mb-2 justify-content-center">
            <div className="col-6">
            <TextField id="filled-basic" label="Filled" variant="filled" />
              <input
                type="text"
                required
                className="form-control text-center"
                placeholder="usuario"
                onChange={handleChange}
                name='userid'
              />
            </div>
          </div>
          <div className="row mb-4 justify-content-center">
            <div className="col-6">
              <input
                type="text"
                required
                className="form-control text-center"
                placeholder="contraseña"
                onChange={handleChange}
                name='password'
              />
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
