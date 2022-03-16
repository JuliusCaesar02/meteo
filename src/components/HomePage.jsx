import { useEffect, useState, useRef } from "react";
import React from 'react';
import MeteoAttualeCard from './MeteoAttualeCard';
import { Link } from "react-router-dom";
import { BiSearchAlt } from 'react-icons/bi';

function HomePage() {
  const [citta, setCitta] = useState('');
  const [errore, setErrore] = useState(false);
  const [meteoAttuale, setMeteoAttuale] = useState();

    
  var inputRef = useRef(null);
  let key = 'f656a3e4a7054753873211018220803';

  function forecastRender(){
    if(meteoAttuale !== undefined && !errore) return(
      <>
      <MeteoAttualeCard meteoAttuale={meteoAttuale}/>
      <Link className="link" to={'/dettagli/' + citta}>Next days weather</Link>
      </>
    )
    if(errore) return(<div>Errore, città inesistente</div>)
  }

  useEffect(()=>{
    inputRef.current.focus();
  }, [])

  function cercaCitta(nomeCitta) {
    //http://api.weatherapi.com/v1/current.json?key=f656a3e4a7054753873211018220803&q=London;
    fetch('http://api.weatherapi.com/v1/current.json?key='+key +'&q='+nomeCitta)
    .then(response => {
      if(response.ok) return response.json()
      else throw 'La città non esiste'
    })
    .then(data => {
      setErrore(false)
      console.log(data) 
      setMeteoAttuale(data);
    })
    .catch(err => {
      console.error(err)
      setErrore(true)
    })
  }

  
    return (
        //sta cosa della classe del div dice che se la temperatura è superiore di 20 gradi mi cambia lo sfondo
        <div className={(typeof meteoAttuale !== 'undefined') ? ((meteoAttuale.current.temp_c > 20) ? 'App warm' : 'App') : 'App city'}>
          <div className="shadow">
            <h1>weather forecast</h1>
            <div className="inputContainer">
              <input ref={inputRef} className="cittaInput" type="text" name="" id="" onKeyDown={(key)=> {if(key.key === 'Enter' ){cercaCitta(citta);}}} onChange={(ev)=>{
                setCitta(ev.target.value);
              }} />
              <button className="inputBtn" onClick={()=>{
                cercaCitta(citta);
              }}>
                <BiSearchAlt className="icon" />
              </button>
            </div>
            {forecastRender()}
          </div>
        </div>   
    );
}

export default HomePage;