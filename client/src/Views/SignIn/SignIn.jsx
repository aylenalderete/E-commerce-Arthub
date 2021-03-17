import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import Styles from "./Signin.module.css";
import { useState } from 'react';

function SignIn() {

    const [input, setInput] = useState({
        username: "",
        password: "",
        name: "",
        lastname: "",
        email: "",
        birth: "",
        type: ""
    });

    function handleChange(){

    }

    function handleSubmit(){
        
    }

    return (
        <div className={Styles.navBaralign}>
            <NavBar renderTop={false} />
            <div className={Styles.mainContainer}>
                <div className={Styles.secondContainer}>
                    <div className={Styles.divTitle}>
                        <p>Registrarse</p>
                    </div>
                    <form className={Styles.containerForm2} onSubmit={handleSubmit}>
                        <input
                            className={Styles.input}
                            value={input.username}
                            name="username"
                            onChange={handleChange}
                            placeholder="Usuario"
                            required
                        />
                        <input
                            className={Styles.input}
                            value={input.password}
                            name="password"
                            onChange={handleChange}
                            placeholder="Contraseña"
                            required
                        />
                        <input
                            className={Styles.input}
                            value={input.name}
                            name="name"
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                        />
                        <input
                            className={Styles.input}
                            value={input.lastname}
                            name="lastname"
                            onChange={handleChange}
                            placeholder="Apellido"
                            required
                        />
                        <input
                            className={Styles.input}
                            value={input.email}
                            name="email"
                            onChange={handleChange}
                            placeholder="E-mail"
                            required
                        />
                        <input
                            className={Styles.input}
                            value={input.birth}
                            name="birth"
                            onChange={handleChange}
                            placeholder="Fecha de nacimiento"
                            type='date'
                            required                          
                        />
                        <input
                            className={Styles.input}
                            value={input.birth}
                            name="birth"
                            onChange={handleChange}
                            placeholder="Fecha de nacimiento"
                            type='radio'
                            required                          
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
