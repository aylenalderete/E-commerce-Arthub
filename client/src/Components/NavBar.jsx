import React from 'react'
import { Link } from 'react-router-dom'
import Styles from "./navBar.module.css"

function NavBar({renderTop}) {

    return (
        <div>
            { renderTop === true ?
                <div className={Styles.navContainer}>
                    <div className={Styles.navContainerSecciones}>
                        <Link className={Styles.link} to="/colección">
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
                    <div className={Styles.line}>
                        <p className={Styles.tituloNavbar2}>arthub</p>  
                    </div>
                    <div className= {Styles.navContainerSecciones2}>
                        <Link className={Styles.link2} to="/colección">
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
                        <p className={Styles.seccionMicuenta}>mi cuenta</p>
                    </div>
                </div>                
            }
        </div>

    )
}

export default NavBar
