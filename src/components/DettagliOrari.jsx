import React from 'react'
import './DettagliOrari.css'

const DettagliOrari = ({ora}) => {
    let date
    return(
    <div className='orariFlex'>
        <div className='orario'>{date = new Date (ora.time_epoch * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</div>
        <img src={ora.condition.icon} alt="" />
        <div className='testiUlteriori'>
            <div>{ora.condition.text}</div>
            <div>{ora.temp_c +'°C'}</div> 
        </div>
    </div>
    
    )
}
export default DettagliOrari;