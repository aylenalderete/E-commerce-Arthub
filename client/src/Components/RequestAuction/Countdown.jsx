import React, { useEffect, useState } from "react";
import style from './countdown.module.css'


function Countdown(props) {

  const [time, setTime] = useState({
    date: ""

  })
  console.log("año " + time.date.slice(0, 4))
  console.log("mes " + time.date.slice(5, 7))
  console.log("dia " + time.date.slice(8, 10))
  console.log(props.competitor)
  const calculateTimeLeft = () => {

    let difference = +new Date(`${time.date.slice(5, 7)} 04 2021`) - +new Date();
    //let difference = +new Date(`${time.date.slice(5, 7)}/${time.date.slice(8, 10)}/${time.date.slice(0, 4)}`) - +new Date();
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
  const [year, setYear] = useState();


  useEffect(() => {
  
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
        setYear(new Date().getFullYear());
      }, 1000);

      // Clear timeout if the component is unmounted
      return () => clearTimeout(timer);
   



  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    // if (!timeLeft[interval]) {
    //   return;
    // }

    timerComponents.push(
      <span>
        {timeLeft[interval]}
      </span>
    );
  });

  function handleChange(e) {
    setTime({
      ...time,
      [e.target.name]: e.target.value
    })
  }


  return (
    <div>
      {timerComponents.length ?
        <div className={style.containerG}>
          <div className={style.container}>
            <p>{timerComponents[0] ? timerComponents[0] : 0}</p>
            <br/>
            <p className={style.text}>Días</p>
          </div>
          <div className={style.container}>
            <p>{timerComponents[1] ? timerComponents[1] : 0}</p>
            <br/>
            <p className={style.text}>Horas</p>
          </div>
          <div className={style.container}>
            <p>{timerComponents[2] ? timerComponents[2] : 0}</p>
            <br/>
            <p className={style.text}>Minutos</p>
          </div>
          <div className={style.container}>
            <p>{timerComponents[3] ? timerComponents[3] : 0}</p>
            <br/>
            <p className={style.text}>Segundos</p>
          </div>
        </div>
        : 
        <div>
        {
          !timerComponents ?
          <span>{() => alert("El ganador es: " + props.competitor)}</span>
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
        placeholder="Fecha de nacimiento"
        type="date"
        required
      />
    </div>
  );
}

export default Countdown;
