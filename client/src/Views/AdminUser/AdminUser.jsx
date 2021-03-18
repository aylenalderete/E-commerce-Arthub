import React from "react";
import NavBar from "../../Components/NavBar/NavBar.jsx";
import style from "./adminuser.module.css";
import { Link } from "react-router-dom";
import { BrownserRouter as Router, useHistory } from "react-router-dom";
import userPic from '../../Images/elcapitan.jpg';
import CarouselCategories from '../../Components/CarouselCategories/carouselCategories'

function AdminUser() {
  const history = useHistory();
  const handleHistory = () => {
    history.push("/ingresar");
  };
  return (
    <div className={style.mainContainer}>
      <NavBar renderTop={false} />
      <div className={style.secondContainer}>
        <div className={style.userDesc}>

          <div className={style.userInfo}>
            <h1 className={style.name} >Ricky Fort</h1>
            <p className={style.rol}>Rol: El comandante</p>

            <button className={style.logOut} onClick={() => handleHistory()}>
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
        </div>
        {/*componente estadisticas, boton ver todas */}
      </div>

    </div>
  );
}

export default AdminUser;
