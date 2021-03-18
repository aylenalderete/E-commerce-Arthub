import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import style from './logInForm.module.css'
import signInUsers from '../../Actions/signInUsers'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'


function LogIn() {
  const userData = useSelector(state => state.userData)
   const authenticated = useSelector((state) => state.authenticated);

  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState();
  const [redirect, setRedirect] = useState(false);


const set = (userName) => {
  return ({ target: { value } }) => {
    setInput((oldValues) => ({ ...oldValues, [userName]: value }));
    setError('')
  };
};

const submitHandler = async (event) => {
  event.preventDefault();
  console
    .log(input)

    await axios.post("http://localhost:3001/users/signin/algo", input)
    .then(result => {
      if (result.data.auth) {
        localStorage.setItem('token', result.data.token)
        setRedirect(true);
        dispatch(signInUsers(result.data));
      }
      else setError(result.data)
    });
  
  
 
  
 
 
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
          required
          className={style.input}
          type="text"
          name="user"
          value={input.username}
          placeholder="usuario..."
          onChange={set("username")}
        ></input>
        <input
          required
          className={style.input}
          type="text"
          name="password"
          value={input.password}
          placeholder="contraseña..."
          onChange={set("password")}
        ></input>
        <div>{error && input.username || input.password ? <span className={style.link}>{error}</span> : null}</div>

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
    </div>
  </div>
);
}

export default LogIn
