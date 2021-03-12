import React from 'react'
import { Link } from 'react-router-dom';
import style from './logInForm.module.css'

function LogIn() {
    return (
      <div>
        <div>
          <form className={style.form}>
            <input
              className={style.input}
              type="text"
              name="user"
              placeholder="Usuario..."
            ></input>
            <input
              className={style.input}
              type="text"
              name="password"
              placeholder="Contraseña..."
            ></input>
            <button className={style.btn} type="submit">
              Iniciar sesión
            </button>
          </form>
          <div className={style.textContainer}>
            <p className={style.pText}>¿No tienes sesión?</p>
            <Link className={style.link} to="/signup">
              Registrate
            </Link>
          </div>
        </div>
      </div>
    );
}

export default LogIn