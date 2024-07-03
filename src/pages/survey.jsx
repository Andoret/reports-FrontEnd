import React from 'react'
import "../assets/styles/survey.css"
export default function Survey() {
  return (
    <div className='indexBody text-center'>
      <div className='mt-5'>
      <h2 className='text-white fw-bolder'>Encuesta de Satisfacción </h2>
        <p className='text-white fw-bold fs-5'>Queremos conocer cómo fue su experiencia con nuestro contenido virtual:</p>
        <div className="container contSurvey p-4">
          <div className="row">
            <div className="col-6 text-start">
              <p className='fw-bolder'>¿Su consulta o solicitud fue resuelta?</p>
            </div>
            
          </div>
          <div className="row">
            <div className="col-6">
   
              <input type="radio" className="btn-check" autoComplete="off" value="☹" id="bad" name="emojis" />
                <label className="btn btn-outline-danger fs-5" htmlFor="bad">☹</label>
              <p>si</p>
          
              </div>
             <div className="col-6">
            <input type="radio" className="btn-check btn-light" autoComplete="off" value="😊" id="awesome" name="emojis" />
              <label className="btn btn-outline-success fs-5" htmlFor="awesome">😊</label>
              <p>no</p>
              </div>
    
             
            </div>
          <div className="row">
            <div className="col-6 text-start">
            <p className='fw-bolder'>¿El contenido de este video fue claro y entendible?</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
   
              <input type="radio" className="btn-check" autoComplete="off" value="☹" id="bad" name="emojis" />
                <label className="btn btn-outline-danger fs-5" htmlFor="bad">☹</label>
              <p>si</p>
          
              </div>
             <div className="col-6">
            <input type="radio" className="btn-check btn-light" autoComplete="off" value="😊" id="awesome" name="emojis" />
              <label className="btn btn-outline-success fs-5" htmlFor="awesome">😊</label>
              <p>no</p>
              </div>
    
             
            </div>
          </div>
         
     
        </div>
    </div>
  )
}
