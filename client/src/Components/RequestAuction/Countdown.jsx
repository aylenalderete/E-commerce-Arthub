import React, { useEffect, useState } from "react";
import style from './countdown.module.css'
import { useHistory } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import mailingAuction from "../../Actions/mailingAuction";
import emailInformation from '../../Actions/emailInformation'
import informationEmail from "./informationEmail";


function Countdown(props) {

  const history = useHistory();
  const dispatch = useDispatch()
  const auctionEmailPU = useSelector(state => state.auctionEmailPU)
  const totalPrice = useSelector(state => state.auctionActual)
  const auctionView = useSelector(state => state.auctionView)




  const [time, setTime] = useState({
    date: "",
    hour: "",
    minut: ""

  })

  const userData = useSelector(state => state.userData)

  if (time.date !== "") {
    localStorage.setItem('año', time.date.slice(0, 4));
    localStorage.setItem('mes', time.date.slice(5, 7));
    localStorage.setItem('dia', time.date.slice(8, 10));
    localStorage.setItem('hour', time.hour);
    localStorage.setItem('minut', time.minut);
  }

  let anho = parseInt(localStorage.getItem('año'))
  let mes = parseInt(localStorage.getItem('mes'))
  let dia = parseInt(localStorage.getItem('dia'))
  let hora = parseInt(localStorage.getItem('hour'))
  let minuto = parseInt(localStorage.getItem('minut'))


  const calculateTimeLeft = () => {

    let difference = +new Date(`${mes}/${dia}/${anho} ${hora}:${minuto}`) - +new Date();
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

    if(!timeLeft.Segundos){
      props.setFinished(true)
    }else{
      props.setFinished(false)
    }

    auctionEmailPU === false ? dispatch(emailInformation(true)) : dispatch(emailInformation(false));
    return () => clearTimeout(timer);
  }, [timeLeft]);




  function handleChange(e) {
    setTime({
      ...time,
      [e.target.name]: e.target.value
    })
  }

  function clear() {
    localStorage.clear();
    history.go(0);
  }

  var email = []
  for (var i = 0; i < totalPrice.length; i++) {
    // console.log("acaà")
    if (totalPrice[i].auction_id == auctionView.id_auction) {
        email.push(totalPrice[i].users[0].email)
        var emailWinner = email[email.length-1]
    }
}



  return (
    <div className={style.mainContainer}>
      {auctionEmailPU === true && <informationEmail email={emailWinner} />}

      {timeLeft.Segundos ?
      <div className={style.containerG}>
        <div className={style.container}>
          <p>{timeLeft.Dias ? timeLeft.Dias : 0}</p>
          <p className={style.text}>d</p>
        </div>
        <div className={style.container}>
          <p>{timeLeft.Horas ? timeLeft.Horas : 0}</p>
          <p className={style.text}>h</p>
        </div>
        <div className={style.container}>
          <p>{timeLeft.Minutos ? timeLeft.Minutos : 0}</p>
          <p className={style.text}>m</p>
        </div>
        <div className={style.container}>
          <p>{timeLeft.Segundos ? timeLeft.Segundos : 0}</p>
          <p className={style.text}>s</p>
        </div>
        {/* <input id="appt-time" type="time" name="appt" value={time.appt} onChange={handleChange}
          className={style.date} /> */}
        {userData.type === 'admin' ?
        <div>
          <button onClick={clear} className={style.btn}>Restablecer</button>
        </div>
        :
        <></>
        }
      </div>
      :
      <div>
        <div className={style.ganador} >
          <h2>La mejor oferta pertenece a :  </h2>
          <h1>{props.winner}</h1>
       </div>
       
      <div>
        {userData.type === 'admin'?
        <div>
          <input value={time.date} className={style.date} name="date" onChange={handleChange} type="date" required />

          <input value={time.hour} className={style.hour} min="0" max="23" name="hour" placeholder="Hora"
            onChange={handleChange} type="number" required />

          <input value={time.minut} className={style.hour} min="0" max="59" name="minut" placeholder="Minutos"
            onChange={handleChange} type="number" required />
        </div>
        :
        <></>
        }

      </div>

      </div>
      }



    </div>
  );
}

export default Countdown;
