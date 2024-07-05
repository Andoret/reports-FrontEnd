import React from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import "../assets/styles/login.css"
import img1 from "../assets/images/logo-mentor.png"
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
      
        <div className="text-center contFormLogin">
         
          <div className="row">
            <div className="col mb-3">
            <img src={img1} alt="" width={"30%"} className="mb-2 mt-2"/>
              <h4 className="text-center text-white mt-4">Admin Center</h4>
         
            </div>
          </div>
          <div className="row mb-2 justify-content-center">
            <div className="col-6">
            <TextField id="filled-basic" label="Usuario" variant="standard" type="text" required onChange={handleChange} name='userid' sx={{input:{color:"white"},label:{color:"white"}}}/>
             
            </div>
          </div>
          <div className="row mb-4 justify-content-center">
            <div className="col-6">
            <TextField id="filled-basic" label="Contraseña" variant="standard" type="text" required onChange={handleChange} name='password' sx={{input:{color:"white"},label:{color:"white"}}}/>

            </div>
          </div>
          <div className="row mb-3  text-center d-flex align-items-center justify-content-center">
           <div className="col-8">
             <button className="btn btn-secondary w-100" ><span className="">Ingresar</span></button>
             </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
