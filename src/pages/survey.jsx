import React from "react";
import "../assets/styles/survey.css";
import { useNavigate} from "react-router-dom";
import { useState,useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from 'axios';
export default function Survey() {
  const [answers, setAnswers] = useState({
    answer1: '',
    answer2: '',
  });

  const nav = useNavigate();

  const survInfo = () => {
    nav("/agradecimiento");
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
    <div className="indexBody text-center">
      <div className="mt-5">
        <h2 className="text-white fw-bolder">Encuesta de Satisfacción</h2>
        <p className="text-white fw-bold fs-5">
          Queremos conocer cómo fue su experiencia con nuestro contenido virtual:
        </p>
        <div className="container contSurvey p-4 mt-5">
          <div className="row">
            <div className="col-6 text-start">
              <p className="fw-bolder fs-5">
                ¿Su consulta o solicitud fue resuelta?
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="radio"
                className="btn-check btn-light"
                autoComplete="off"
                value="true"
                id="yes1"
                name="answer1"
                required
                onChange={handleChange}
              />
              <label
                className="btn btn-outline-success font-emoji"
                htmlFor="yes1"
              >
                😊
              </label>
              <p>Sí</p>
            </div>
            <div className="col-6">
              <input
                type="radio"
                className="btn-check"
                autoComplete="off"
                value="false"
                id="no1"
                name="answer1"
                required
                onChange={handleChange}
              />
              <label
                className="btn btn-outline-danger font-emoji"
                htmlFor="no1"
              >
                ☹
              </label>
              <p>No</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-start">
              <p className="fw-bolder fs-5">
                ¿El contenido de este video fue claro y entendible?
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="radio"
                className="btn-check btn-light"
                autoComplete="off"
                value="true"
                id="yes2"
                name="answer2"
                required
                onChange={handleChange}
              />
              <label
                className="btn btn-outline-success font-emoji"
                htmlFor="yes2"
              >
                😊
              </label>
              <p>Sí</p>
            </div>
            <div className="col-6">
              <input
                type="radio"
                className="btn-check"
                autoComplete="off"
                value="false"
                id="no2"
                name="answer2"
                required
                onChange={handleChange}
              />
              <label
                className="btn btn-outline-danger font-emoji"
                htmlFor="no2"
              >
                ☹
              </label>
              <p>No</p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <button className="btn btn-custom" onClick={survInfo}> <span className="fw-bold">Enviar</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
