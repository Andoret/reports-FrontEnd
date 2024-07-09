import React from "react";
import "../assets/styles/survey.css";
import { useNavigate} from "react-router-dom";
import { useState,useContext,useEffect } from "react";
import hEmoji from '../assets/images/happy.png'
import sEmoji from '../assets/images/sad.png'
import { UserContext } from "../context/UserContext";
import axios from 'axios';
export default function Survey() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "¿Seguro que quieres cerrar esta página?";
      event.returnValue = message; // Estándar
      return message; // Para navegadores antiguos
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const{caseNum,clientId}=useContext(UserContext)


  
  const [answers, setAnswers] = useState({
    answer1: '1',
    answer2: '1',
  });

  const nav = useNavigate();

  const survInfo = async () => {
    console.log(answers)
    const data={
      code_case:caseNum,
      response_1:parseInt(answers.answer1),
      response_2:parseInt(answers.answer2),
      client_id:clientId

    }
    try{
      const response= await axios.post("http://localhost:3000/cases/create",data)
    if (response.data.status){
      console.log(response)
      nav("/agradecimiento");
      localStorage.clear()
    }else{
      console.log(response.data)
    }
    }catch(error){
      console.error(error)
    }
    

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [name]: value,
    }));
    console.log(`Nuevo valor del ${name}: ${value}`); // Aquí imprime el valor actual
  };

  

  return (
    <div className="indexBody d-flex align-items-center justify-content-center">
      <div className="contMain pt-4 ps-4 pe-4">
        <h2 className="text-white fw-bolder">Encuesta de Satisfacción</h2>
        <p className="text-white fw-bold fs-5">
          Queremos conocer cómo fue su experiencia con nuestro contenido virtual:
        </p>
        <div className="container contSurvey p-4 mt-2 ">
          <div className="row d-flex align-items-center">
            <div className="col-6 text-start">
              <p className="fw-bolder fs-5 text-white">
                ¿Su consulta o solicitud fue resuelta?
              </p>
            </div>
            <div className="col-6">
              <div className="row">
              <div className="col-6 text-center"> 
                <input
                  type="radio"
                  className="btn-check btn-light"
                  autoComplete="off"
                  value="1"
                  id="yes1"
                  name="answer1"
                  required
                  onChange={handleChange}
                />
                <label
                  className="btn btn-outline-success font-emoji"
                  htmlFor="yes1"
                >
                    <img src={hEmoji} alt="Sí" width={"50px"}  className={`emoji ${answers.answer1 === '0' ? 'grayscale' : ''}`}
                     />
                </label>
                <p className="text-white">Sí</p>
              </div>
              <div className="col-6 text-center">
              <input
                type="radio"
                className="btn-check"
                autoComplete="off"
                value="0"
                id="no1"
                name="answer1"
                required
                onChange={handleChange}
              />
              <label
                className="btn btn-outline-danger font-emoji"
                htmlFor="no1"
              >
               <img src={sEmoji} alt="No" width={"50px"} className={`emoji ${answers.answer1 === '1' ? 'grayscale' : ''}`} />
              </label>
              <p className="text-white">No</p>
              </div>
              </div>
            </div>
          </div>
          
          <div className="row d-flex align-items-center">
            <div className="col-6 text-start">
              <p className="fw-bolder fs-5 text-white">
                ¿El contenido de este video fue claro y entendible?
              </p>
            </div>
            <div className="col-6">
              <div className="row">
              <div className="col-6 text-center">
            <input
                type="radio"
                className="btn-check btn-light"
                autoComplete="off"
                value="1"
                id="yes2"
                name="answer2"
                required
                onChange={handleChange}
              />
              <label
                className="btn btn-outline-success font-emoji "
                htmlFor="yes2"
              >
                <img src={hEmoji} alt="Sí" width={"50px"}  className={`emoji ${answers.answer2 === '0' ? 'grayscale' : ''}`}/>
              </label>
              <p className="text-white">Sí</p>
              </div>
              <div className="col-6 text-center">

              <input
                type="radio"
                className="btn-check"
                autoComplete="off"
                value="0"
                id="no2"
                name="answer2"
                required
                onChange={handleChange}
              />
              <label
                className="btn btn-outline-danger font-emoji"
                htmlFor="no2"
              >
                <img src={sEmoji} alt="No" width={"50px"} className={`emoji ${answers.answer2 === '1' ? 'grayscale' : ''}`}/>
              </label>
              <p className="text-white">No</p>
              </div>
              </div>
            </div>
          </div>
          
          <div className="row mt-1 mb-0">
            <div className="col text-end">
              <button className="btn btn-custom" onClick={survInfo}> <span className="fw-bold text-white">Enviar</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
