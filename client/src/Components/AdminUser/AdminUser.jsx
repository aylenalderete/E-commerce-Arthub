import React from "react";
import { useSelector } from 'react-redux';
import NavBar from "../NavBar/NavBar.jsx";
import style from "./adminuser.module.css";
import { Link } from "react-router-dom";
import userPic from '../../Images/elcapitan.jpg';
import CarouselCategories from '../CarouselCategories/carouselCategories';
import Edit from '../../Images/edit.svg'

function AdminUser() {
  const userData = useSelector(state => state.userData);


  return (
    <div className={style.mainContainer}>
      <NavBar renderTop={false} />
      <div className={style.secondContainer}>
        <div className={style.userDesc}>

          <div className={style.userInfo}>
            <h1 className={style.name} >{userData.name}</h1>
            <p className={style.rol}>Rol:{userData.type} </p>

            <button className={style.logOut} >
              Cerrar sesion
        </button>

          </div>
          <div className={style.containerPic}>
            <img className={style.userPic} src={userData.profilepic} alt='User Pic' />
            <button className={style.editBtn}>
              <img className={style.edit} src={Edit} alt="" />
            </button>
          </div>
        </div>
        <div className={style.categories}>
          <h2 className={style.title}>Categorias</h2>
          <CarouselCategories />
          <Link className={style.link} to='/categorias'>Ver todas</Link>
        </div>
        {/*componente estadisticas, boton ver todas */}
      </div>

    </div>
  );
}

export default AdminUser;
