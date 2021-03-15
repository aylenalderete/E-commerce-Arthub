import React from 'react'
import { Link } from 'react-router-dom';
import style from './logInForm.module.css'

function LogIn() {
    return (
      <div className={style.mainContainer}>
        <div className={style.alignForm}>
          <form className={style.form}>
            <input
              className={style.input}
              type="text"
              name="user"
              placeholder="usuario..."
            ></input>
            <input
              className={style.input}
              type="text"
              name="password"
              placeholder="contraseña..."
            ></input>
            <Link to="/perfilAdmin">
              <button className={style.btn} type="submit">
                iniciar sesión
              </button>
            </Link>
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
