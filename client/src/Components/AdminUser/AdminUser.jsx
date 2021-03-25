import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from "../NavBar/NavBar.jsx";
import style from "./adminuser.module.css";
import { Link, useHistory } from "react-router-dom";
import userPic from '../../Images/elcapitan.jpg';
import CarouselCategories from '../CarouselCategories/carouselCategories';
import Edit from '../../Images/edit.svg';
import Add from '../../Images/add-file.svg';
import noProfPic  from '../Assets/profPic.jpg';
import ProductsAdmin from '../ProductsAdmin/productsAdmin';
function AdminUser() {

  const userData = useSelector(state => state.userData);
  let history = useHistory()

  return (
    <div className={style.mainContainer}>
      <NavBar renderTop={false} />
      <div className={style.secondContainer}>
        <div className={style.userDesc}>

          <div className={style.userInfo}>
            <h1 className={style.name} >{userData.name}</h1>
            <p className={style.rol}>Rol:{userData.type} </p>

            <button className={style.editProfile} onClick={() => history.push(`/editarperfil/`)}>
              Editar perfil </button>
            <br></br>
            <button className={style.editProfile} onClick={() => history.push(`/ordenes/`)}>
              Ordenes </button>
              <br></br>
            <button className={style.editProfile} onClick={() => history.push(`/usuarios/`)}>
              Editar usuarios </button>

          </div>
          <div className={style.containerPic}>
            <img className={style.userPic} src={userData.profilepic ? userData.profilepic : noProfPic } alt='User Pic'/>
            <button onClick={()=> history.push('/editarperfil')} className={style.editBtn}>
              <img className={style.edit} src={Edit} alt="" />
            </button>
          </div>
        </div>
        <div className={style.categories}>
          <div className={style.alignTitle}>
          <h2 className={style.title}>Categorias</h2>
          <Link className={style.linkAdd} to='/crearcategorias'>
            <img className={style.addCategory} src={Add} alt='Agrega nueva categoría'/>
            <p className={style.addText}>Agregar categoría</p>
          </Link>
          </div>
          <CarouselCategories />
          <Link className={style.link} to='/categorias'>Administrar todas</Link>
           <ProductsAdmin/>
        </div>
      </div>

    </div>
  );
}

export default AdminUser;
