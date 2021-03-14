import React from 'react'
import NavBar from '../Components/NavBar'
import style from './adminuser.module.css'

function AdminUser() {
    return (
      <div className={style.mainContainer}>
        <NavBar renderTop={false}></NavBar>
        <div className={style.adminContainer}>
          <img src="" alt="adminprofile"></img>
          <div className={style.div}>My products</div>
          <div className={style.div}>My stats</div>
          <div className={style.div}>LogOut</div>
        </div>
      </div>
    );
}

export default AdminUser
