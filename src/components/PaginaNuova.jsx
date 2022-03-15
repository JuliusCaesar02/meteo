import React, { useEffect } from 'react';
import DettagliPrevisione from './DettagliPrevisione';
import { useParams } from 'react-router-dom';
import { BiHome } from 'react-icons/bi';
import { Link } from "react-router-dom";
import { useState } from "react";



const NuovaPagina = () => {
    const params = useParams();
    const [previsioni, setPrevisioni] = useState();

    function previsioniFuture(nomeCitta) {
        let key = 'f656a3e4a7054753873211018220803';
        //http://api.weatherapi.com/v1/current.json?key=f656a3e4a7054753873211018220803&q=London;
        fetch('http://api.weatherapi.com/v1/forecast.json?key='+key +'&q='+nomeCitta+'&days=3' )
        .then(response => {
            if(response.ok) return response.json()
            else throw 'La città non esiste'
        })
        .then(data => {
          console.log(data)
          setPrevisioni(data);
        })
        .catch(err => {
            console.error(err)
        })     
    }

    useEffect(()=>{
        previsioniFuture(params.citta);
    }, [])
    
      
    
    if(!previsioni) {
        return <div className='loading'>loading</div>
    } else return (
        <div className='paginaNuovaContainer'>
            <div className='paginaNuovaHeader'>
                <Link className='link goHome' to="/"><p>go back</p> <BiHome className='icon home'/></Link>  
                {/* Il testo "go back" è incapsulato in un <p> in quanto per far funzionare il text-transform su ::first-letter è necessario che il
                contenitore sia un display block e non posso modificare il display del Link in quanto è già un flex. Avrei potuto mettere manualmente la g maiuscola ma
                mi da fastidio, quindi risolvo in questo modo */}
                <h2>next days in {params.citta}</h2>
            </div>

            <div className='singleCardsContainer'>
                {previsioni.forecast.forecastday.map((element)=> {
                    return (
                        <>    
                        <DettagliPrevisione giorno={element}/>
                        </>
                    )
                })}

            </div>
        </div>

    )


    
        
        
    
}

export default NuovaPagina;