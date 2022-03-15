import React, { useState, useEffect } from 'react'
import { BiTime } from 'react-icons/bi';
import DettagliOrari from './DettagliOrari';

const DettagliPrevisione = ({giorno}) => {
  const [pulsantePremuto, setPulsantePremuto] = useState(false);
  
  function renderOrari(){
      return(
        <>
        <DettagliOrari ora={giorno.hour[0]}/>
        <DettagliOrari ora={giorno.hour[7]}/>
        <DettagliOrari ora={giorno.hour[12]}/>
        <DettagliOrari ora={giorno.hour[16]}/>
        </>
      )
  }

  return (
    <div className={(giorno.day.avgtemp_c > 20) ? 'dettagliPrevisioneContainer warm' : 'dettagliPrevisioneContainer'} onClick={(ev)=>{
      pulsantePremuto === true ? ev.currentTarget.classList.remove('extended') : ev.currentTarget.classList.add('extended')
        setPulsantePremuto(!pulsantePremuto)
    }}>

      <div className='shadow'>

        <div className='date'>
          <BiTime className='icon time'/> {giorno.date}
        </div>

        <div>
          {giorno.day.condition.text}
        </div>

        <div>
          <img src={giorno.day.condition.icon} alt="" />
        </div>

        <div className='degrees'>
          {giorno.day.avgtemp_c  + '°C'}
        </div>

        <div className='dettagliOrari'>
          {/* {pulsantePremuto === true ?  setTimeout(renderOrari, 500) : null}    Questo non funziona, stampa solo quante volte è stato chiamato il timeout  */}
          {pulsantePremuto === true ?  renderOrari() : null}      
        </div>

      </div>
    </div>
  )
}

export default DettagliPrevisione;