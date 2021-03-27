import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import style from './logInForm.module.css'
import signInUsers from '../../Actions/signInUsers'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import FacebookLogin from "react-facebook-login";

function LogIn() {
  const userData = useSelector(state => state.userData)
   const authenticated = useSelector((state) => state.authenticated);

  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState();
  const [redirect, setRedirect] = useState(false);
  const [errorreq, setErrorreq] = useState({
    username : '',
    password : ''
  })

const set = (userName) => {
  
  return ({ target: { value } }) => {
    setErrorreq({
      username: "",
      password: "",
    });
    setInput((oldValues) => ({ ...oldValues, [userName]: value }));
    setError('')
  };
};

const responseFacebook = async(response) => {
  console.log(response)
  await axios
    .post(`http://localhost:3001/users/login/facebook`, response)
    .then((result) => {
      if (result.data.auth) {
        localStorage.setItem("token", result.data.token);
        setRedirect(true);
        dispatch(signInUsers(result.data));
      } else setError(result.data);
    });
};

const submitHandler = async (event) => {
  event.preventDefault();
  console
    .log(input)

    if (input.username && input.password) {
      await axios
        .post("http://localhost:3001/users/signin/algo", input)
        .then((result) => {
          if (result.data.auth) {
            localStorage.setItem("token", result.data.token);
            setRedirect(true);
            dispatch(signInUsers(result.data));
          } else setError(result.data);
        });
    }
    else{
      var errors = { username: "", password: "" };
      if(!input.username){
        errors.username = "El campo usuario es requerido";
        // setErrorreq({...errorreq,
        //   username: 'El campo usuario es requerido'
        // })
      }
      if(!input.password){
        errors.password = "La contraseña es requerida";
        // setErrorreq({...errorreq,
        //   password: 'La contraseña es requerida'
        // })
      }
      setErrorreq({
        username: errors.username,
        password: errors.password
      });
    }
    ;
  
  
 
  
 
 
}
const dispatch = useDispatch()
if(redirect){
  return <Redirect to="coleccion"></Redirect>;
}    
return (
  <div className={style.mainContainer}>
    <div className={style.alignForm}>
      <form onSubmit={submitHandler} className={style.form}>
        <input
          className={style.input}
          type="text"
          name="user"
          value={input.username}
          placeholder="usuario..."
          onChange={set("username")}
        ></input>
        <div>
          {errorreq.username ? (
            <span className={style.link}>{errorreq.username}</span>
          ) : null}
        </div>
        <input
          className={style.input}
          type="password"
          name="password"
          value={input.password}
          placeholder="contraseña..."
          onChange={set("password")}
        ></input>
        {errorreq.password ? (
          <span className={style.link}>{errorreq.password}</span>
        ) : null}
        <div>
          {(error && input.username) || input.password ? (
            <span className={style.link}>{error}</span>
          ) : null}
        </div>

        <button className={style.btn} type="submit">
          iniciar sesión
        </button>
      </form>
      <div className={style.textContainer}>
        <p className={style.pText}>¿Aún no tienes cuenta?</p>
        <Link className={style.link} to="/registrarse">
          Registrate
        </Link>
      </div>
      <div>
        <FacebookLogin
          appId="271851164442149"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
          icon='fa-facebook'
          cssClass={style.btn}
        />
      </div>
    </div>
  </div>
);
}

export default LogIn
