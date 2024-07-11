import React from "react";
import { useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import "../assets/styles/login.css";
import img1 from "../assets/images/logo-mentor.png";
import LoginIcon from '@mui/icons-material/Login';
import { grey } from '@mui/material/colors';
import { UserContext } from "../context/UserContext";

export default function Login() {

  const nav=useNavigate();
  const [error,setError]=useState('');
  const [credentials, setCredentials] = useState({
    user_name: "",
    password: "",
  });
  const { setRole,setUser,setTkn,setId,setClientId} = useContext(UserContext);

  const logIn= async(e)=>{
    e.preventDefault(); 
    if(!credentials.user_name || !credentials.password){
      setError('Usuario o contraseña incorrecto')

    }
    else{ 
        const data={
          name_user:credentials.user_name,
          password:credentials.password
        }
        try{
            const response= await axios.post("http://localhost:3000/authenticate/login/",data)
            const dataResponse=response.data.response
            if(dataResponse.status){
              setUser(dataResponse.user.name_user)
              setRole(dataResponse.user.rol_id)
              setTkn(dataResponse.user.access_Token)
              setId(dataResponse.user.id_user)
              setClientId(dataResponse.user.client_id)
              nav("/admin")
            }
          
        }
        catch(error){
          console.error(error)
          if (error.response && error.response.status ===404){
            setError('Usuario no encontrado');
          }else if (error.response && error.response.status===401){
            setError('Usuario o contraseña incorrecto')
          }
          
          else{
            setError('Error en el servidor, por favor intentalo de nuevo mas tarde');
          }
      }}
      
    
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((credential) => ({
      ...credential,
      [name]: value,
    }));
  };


  return (
    <div className="indexBody indexCenter">
      <div className="cont d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="text-center contFormLogin">
            <div className="row">
              <div className="col mb-3">
                <img src={img1} alt="" width={"30%"} className="mb-2 mt-2" />
                <h4 className="text-center text-white mt-4">Admin Center</h4>
              </div>
            </div>
            <form onSubmit={logIn}>
            <div className="row mb-2 justify-content-center">
              <div className="col-6">
                <TextField
                  label="Usuario"
                  variant="standard"
                  type="text"
                  required
                  onChange={handleChange}
                  name="user_name"
                  sx={{
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "white",
                    },
                    "& .MuiInput-underline:hover:before": {
                      borderBottomColor: "white",
                    },
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                />
              </div>
            </div>
            <div className="row mb-4 justify-content-center">
              <div className="col-6">
                <TextField
                  label="Contraseña"
                  variant="standard"
                  type="password"
                  required
                  onChange={handleChange}
                  name="password"
                  sx={{
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "white",
                    },
                    "& .MuiInput-underline:hover:before": {
                      borderBottomColor: "white",
                    },
                    input: { color: "white" },
                    label: { color: "white" },
                  }}
                />
              </div>
              
            </div>
            {error && <p className='text-danger mt-2 text-center'>{error}</p>}
            <div className="row mb-3  text-center d-flex align-items-center justify-content-center">
              <div className="col-8">
                <Button  type="submit" variant="contained" endIcon={<LoginIcon/>} sx={{bgcolor:grey[600],"&:hover":{bgcolor:"purple"}}} >Ingresar</Button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
