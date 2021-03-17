import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import Styles from "./Signin.module.css";
import { useState } from 'react';
import axios from 'axios';

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

    function handleChange(e) {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(`http://localhost:3001/users`,  input )
            .then((res) => {
                alert("Cuenta registrada");
                console.log(res.data);
            })
            .catch((error) => {
                alert("No se pudo crear la cuenta");
                console.log(error);
            });
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
                            id="type"
                            name="type"
                            onChange={handleChange}
                            value="artist"
                            type="radio"
                            required
                        />
                        <label for="type">artista</label>

                        <input
                            className={Styles.input}
                            id="type"
                            name="type"
                            onChange={handleChange}
                            value="user"
                            type="radio"
                            required
                        />
                        <label for="type">comprador</label>
                        <input type="submit" value='Crear' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
