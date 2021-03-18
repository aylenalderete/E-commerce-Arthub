import React from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import userPic from '../../Images/elcapitan.jpg';
import style from '../AdminUser/adminuser.module.css';

export default function buyUser() {
    return (
        <div className={style.mainContainer}>
            <NavBar renderTop={false} />
            <div className={style.secondContainer}>
                <div className={style.userDesc}>

                    <div className={style.userInfo}>
                        <h1 className={style.name} >Ricky Fort Comprador</h1>

                        <button className={style.logOut}>
                            Cerrar sesion </button>

                    </div>
                    <div className={style.containerPic}>
                        <img className={style.userPic} src={userPic} alt='User Pic' />
                    </div>
                </div>
            </div>

        </div>

    )
}