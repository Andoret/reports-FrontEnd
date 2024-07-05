import React from "react";
import "../assets/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../assets/images/logo-mentor.png"
import { useContext,useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import {grey} from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';


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

  const theme = createTheme({
    palette: {
      success: {
        main: '#ff0000',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: (themeParam) => `
          input {
            color: ${themeParam.palette.success.main};
          }
        `,
      },
    },
  });
  

  return (
  <div className="indexBody indexCenter" >
    <div>
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
              <h3 className="text-center text-white">Ingresa tu número de caso</h3>
            </div>
          </div>
          <div className="row mb-4 justify-content-center">
            <div className="col-6">
            </div>
              <TextField id="filled-basic" label="Numero de caso" variant="filled" className="textFieldLogin" 
              onChange={handleChange} type="number" theme={theme} sx={{ input: { color: 'white' }, label: {color:'white'} }}   />
           
          </div>
          <div className="row mb-4 justify-content-center">
            <div className="col-12">
             <button className="btn btn-custom " onClick={()=>saveCaseNumber()}><span className="fw-bold text-white">Continuar</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div></div>
  );
}
