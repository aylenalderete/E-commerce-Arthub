import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import style from "./adminuser.module.css";
import { Link } from "react-router-dom";
import userPic from '../../Images/elcapitan.jpg';
import CarouselCategories from '../CarouselCategories/carouselCategories'

function AdminUser() {
 
  
  return (
    <div className={style.mainContainer}>
      <NavBar renderTop={false} />
      <div className={style.secondContainer}>
        <div className={style.userDesc}>

          <div className={style.userInfo}>
            <h1 className={style.name} >Ricky Fort</h1>
            <p className={style.rol}>Rol: El comandante</p>

            <button className={style.logOut} >
              Cerrar sesion
        </button>

          </div>
          <div className={style.containerPic}>
            <img className={style.userPic} src={userPic} alt='User Pic' />
          </div>
        </div>
        <div  className={style.categories}>
          <h2 className={style.title}>Categorias</h2>
        <CarouselCategories/>
        <Link className={style.link} to='/categorias'>Ver todas</Link>
        </div>
        {/*componente estadisticas, boton ver todas */}
      </div>

    </div>
  );
}

export default AdminUser;
