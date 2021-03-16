import React from 'react';
import { Link } from 'react-router-dom';
import Styles from "./navBar.module.css";
import { useHistory } from "react-router-dom";

function NavBar({renderTop}) {
    const history = useHistory();
    function handleGoBack() {
        history.push('/')
      }
    

    return (
        <div className={ renderTop === true ? Styles.navMain : Styles.navMain2}>
            { renderTop === true ?
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
                :
                <div className={Styles.navContainer2}>
                    
                        <p onClick={handleGoBack} className={Styles.tituloNavbar2}>arthub</p>  
                  
                    <div className= {Styles.navContainerSecciones2}>
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
                    <div className= {Styles.line2}>
                    <Link className={Styles.link2} to="/ingresar">
                        <p className={Styles.seccionMicuenta}>mi cuenta</p>
                        </Link>
                    </div>
                </div>                
            }
        </div>

    )
}

export default NavBar
