import React from "react";
import NavBar from "../Components/NavBar";
import style from "./adminuser.module.css";
import { Link } from "react-router-dom";
import { BrownserRouter as Router, useHistory } from "react-router-dom";
function AdminUser() {
  const history = useHistory();
  const handleHistory = () => {
    history.push("/ingresar");
  };
  return (
    <div className={style.mainContainer}>
      <NavBar renderTop={false}></NavBar>
      <div className={style.adminContainer}>
        <div className={style.div}>
          <Link className={style.link} to="/crearcategorias">
            Crear categoria
          </Link>
        </div>
        <div className={style.div}>
          <Link className={style.link} to="/admindashboard">
            Mis productos
          </Link>
        </div>
        <div className={style.div}>Mis estadisticas</div>
        <div className={style.div} onClick={() => handleHistory()}>
          Cerrar sesion
        </div>
      </div>
    </div>
  );
}

export default AdminUser;
