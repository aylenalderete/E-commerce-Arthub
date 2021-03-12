import React from 'react'
import NavBar from '../Components/NavBar'
import style from './aboutUs.module.css'

function AboutUs() {
    return (
        <div>
            <NavBar />
        <div className = {style.container}>
            <div className = {style.title}>
                <h1>nosotros</h1>
            </div>
            <div className = {style.text}>
                <p>érase una vez en Henry...</p>
            </div>
            <div className = {style.rectangle}>
                <div className = {style.text2}>
                    <h4>
                        contacto: <br>
                        </br>dirección@mail.com<br>
                        </br>29384 383284
                        
                    </h4>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AboutUs
