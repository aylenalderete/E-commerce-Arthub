import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Styles from "./navBar.module.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import signOutUsers from '../../Actions/signOutUsers'
import profPic from '../Assets/profPic.jpg'

function NavBar({ renderTop }) {
  const loggedUser = useSelector(state => state.userData);
  // console.log(loggedUser);
  const history = useHistory();
  const [redirect, setRedirect] = useState(false)
  function handleGoBack() {
    history.push('/')
  }
  const dispatch = useDispatch()
  function clickHandler() {
    dispatch(signOutUsers())
    localStorage.removeItem('token')
    setRedirect(true)

  }
  if (redirect) return <Redirect to="/ingresar"></Redirect>
  return (
    <div className={renderTop === true ? Styles.navMain : Styles.navMain2}>
      {renderTop === true ? (
        <div className={Styles.navContainer}>
          <div className={Styles.navContainerSecciones}>
            <Link className={Styles.link} to="/coleccion">
              <p className={Styles.secciones}>colección</p>
            </Link>
            <Link className={Styles.link} to="/artistas">
              <p className={Styles.secciones}>artistas</p>
            </Link>
            <Link className={Styles.link} to="/nosotros">
              <p className={Styles.secciones}>nosotros</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className={Styles.navContainer2}>
          <p onClick={handleGoBack} className={Styles.tituloNavbar2}>
            arthub
            </p>

          <div className={Styles.navContainerSecciones2}>
            <Link className={Styles.link2} to="/coleccion">
              <p className={Styles.secciones2}>colección</p>
            </Link>
            <Link className={Styles.link2} to="/artistas">
              <p className={Styles.secciones2}>artistas</p>
            </Link>
            <Link className={Styles.link2} to="/nosotros">
              <p className={Styles.secciones2}>nosotros</p>
            </Link>
          </div>
          <div className={Styles.line2}>
            {loggedUser.id > 0 ? (
              <div>
                {loggedUser.id > 0 && loggedUser.profilepic ? (
                  <img
                    className={Styles.profPic}
                    src={loggedUser.profilepic}
                  ></img>
                ) : (
                  <img className={Styles.profPic} src={profPic}></img>
                )}
                {loggedUser.id > 0 ? (
                  <h1 className={Styles.profInfo}>{loggedUser.name}</h1>
                ) : null}
                {loggedUser.id > 0 && loggedUser.type !== "user" ? (
                  <h3 className={Styles.profInfoType}>{loggedUser.type}</h3>
                ) : null}
              </div>
            ) : null}
            {loggedUser.id > 0 ? (
              <Link className={Styles.link2} to="/miperfil">
                <p className={Styles.seccionMicuenta}>mi cuenta</p>
              </Link>
            ) : (
              <Link className={Styles.link2} to="/ingresar">
                <p className={Styles.seccionMicuenta}>mi cuenta</p>
              </Link>
            )}
            <div>
              {loggedUser.id > 0 ? (
                <p onClick={clickHandler} className={Styles.cerrarSesion}>
                  cerrar sesión
                </p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar
