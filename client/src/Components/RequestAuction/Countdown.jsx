import React, { useEffect, useState } from "react";
import style from './countdown.module.css'
import { useHistory } from 'react-router-dom'


function Countdown(props) {

  const history = useHistory();

  const [time, setTime] = useState({
    date: ""

  })
  
  if (time.date!==""){
    localStorage.setItem('año', time.date.slice(0, 4));
    localStorage.setItem('mes', time.date.slice(5, 7));
    localStorage.setItem('dia', time.date.slice(8, 10));
  }

  let anho = parseInt(localStorage.getItem('año'))
  let mes = parseInt(localStorage.getItem('mes'))
  let dia = parseInt(localStorage.getItem('dia'))

  const calculateTimeLeft = () => {

    let difference = +new Date(`${mes}/${dia}/${anho}`) - +new Date();
    let timeLeft = {}; 
  

    if (difference > 0) {
      timeLeft = {
        Dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Horas: ('0' + Math.floor((difference / (1000 * 60 * 60)) % 24)).slice(-2),
        Minutos: ('0' + Math.floor((difference / 1000 / 60) % 60)).slice(-2),
        Segundos: ('0' + Math.floor((difference / 1000) % 60)).slice(-2)
      };
    }

    return timeLeft;

  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
 
  useEffect(() => {

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      
    }, 1000);
    
    return () => clearTimeout(timer);

},[timeLeft]);


  function handleChange(e) {
    setTime({
      ...time,
      [e.target.name]: e.target.value
    })
  }

  function clear(){
    localStorage.clear();
    history.go(0);
  }


  return (
    <div>
      {timeLeft ?
        <div className={style.containerG}>
        <div className={style.container}>
          <p>{timeLeft.Dias ? timeLeft.Dias : 0}</p>
          <br/>
          <p className={style.text}>Días</p>
        </div>
        <div className={style.container}>
          <p>{timeLeft.Horas ? timeLeft.Horas : 0}</p>
          <br/>
          <p className={style.text}>Horas</p>
        </div>
        <div className={style.container}>
          <p>{timeLeft.Minutos ? timeLeft.Minutos : 0}</p>
          <br/>
          <p className={style.text}>Minutos</p>
        </div>
        <div className={style.container}>
          <p>{timeLeft.Segundos ? timeLeft.Segundos : 0}</p>
          <br/>
          <p className={style.text}>Segundos</p>
        </div>
      </div>
        : 
        <div>
        {
          !timeLeft ? 
          <span>{() => alert("El ganador es:... " )}</span>
          :
          <div></div>
        }
        </div>
      }

      <input

        value={time.date}
        className={style.date}
        name="date"
        onChange={handleChange}
        type="date"
        required
      />
      <button onClick={clear}>Reset</button>
    </div>
  );
}

export default Countdown;