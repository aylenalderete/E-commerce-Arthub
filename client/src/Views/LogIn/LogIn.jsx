import React from 'react'
import LogInForm from '../../Components/LogIn/LogInForm.jsx'
import style from './login.module.css'
import NavBar from '../../Components/NavBar/NavBar.jsx'
function LogIn() {
    return (
      
        <div className={style.container}>
          <NavBar renderTop={false} ></NavBar>
          <LogInForm></LogInForm>
        </div>
     
    );
}

export default LogIn
