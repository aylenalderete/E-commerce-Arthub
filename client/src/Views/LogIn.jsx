import React from 'react'
import LogInForm from '../Components/LogInForm'
import style from './login.module.css'
import NavBar from '../Components/NavBar'
function LogIn() {
    return (
      <div>
        <div className={style.container}>
          <NavBar renderTop={false} ></NavBar>
          <LogInForm></LogInForm>
        </div>
      </div>
    );
}

export default LogIn
