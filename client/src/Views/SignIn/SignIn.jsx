import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import Styles from "./Signin.module.css";
import { useState } from 'react';
import axios from 'axios';
import signInUsers from '../../Actions/signInUsers'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

export const validate = (input) => {

    let errors = {};
    if (!input.username) {
        errors.username = 'el nombre de usuario es obligatorio';
    }

    if (!input.password) {
        errors.password = 'la contraseña es obligatoria';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(input.password)) {
        errors.password = 'la contraseña debe contener por lo menos 8 caracteres, una mayuscula y un numero'
    }

    if (!input.name) {
        errors.name = 'el nombre es obligatorio';
    }

    if (!input.lastname) {
        errors.lastname = 'el apellido es obligatorio';
    }

    if (!input.lastname) {
        errors.lastname = 'el apellido es obligatorio';
    }

    if (!input.email) {
        errors.email = 'el email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.email = 'el mail es invalido';
    }

    if (!input.birth) {
        errors.birth = 'la fecha de nacimiento es obligatoria';
    }

    if (!input.type) {
        errors.type = 'el tipo es obligatorio';
    }


    // if (urlImages.length === 0) {
    //     errors.images = 'debe cargar por lo menos una imagen'
    // }
    return errors;
};


function SignIn() {

    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const [input, setInput] = useState({
        username: "",
        password: "",
        name: "",
        lastname: "",
        email: "",
        birth: "",
        type: ""
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    function onFocus(ev) {
        setTouched({
            ...touched,
            [ev.target.name]: true
        })
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
        setErrors(validate({
            ...input,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(`http://localhost:3001/users`, input)
            .then((res) => {

                dispatch(signInUsers(res.data.user))
                alert("Cuenta registrada");
                console.log(res)
                if (res.data.auth === true) {
                    localStorage.setItem('token', res.data.token)
                    setRedirect(true)
                };
            })
            .catch((error) => {
                alert("No se pudo crear la cuenta");
                console.log(error);
            });
    }
    if (redirect) return <Redirect to="/coleccion"></Redirect>

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
                            onFocus={onFocus}
                            required
                        />
                        {
                            errors.username && touched.username && <p>{errors.username}</p>
                        }
                        <input
                            type="password"
                            className={Styles.input}
                            value={input.password}
                            name="password"
                            onChange={handleChange}
                            placeholder="Contraseña (debe contener por lo menos una mayuscula y un numero)"
                            onFocus={onFocus}
                            required
                        />
                        {
                            errors.password && touched.password && <p>{errors.password}</p>
                        }
                        <input
                            className={Styles.input}
                            value={input.name}
                            name="name"
                            onChange={handleChange}
                            placeholder="Nombre"
                            onFocus={onFocus}
                            required
                        />
                        {
                            errors.name && touched.name && <p>{errors.name}</p>
                        }
                        <input
                            className={Styles.input}
                            value={input.lastname}
                            name="lastname"
                            onChange={handleChange}
                            placeholder="Apellido"
                            onFocus={onFocus}
                            required
                        />
                        {
                            errors.lastname && touched.lastname && <p>{errors.lastname}</p>
                        }
                        <input
                            className={Styles.input}
                            value={input.email}
                            name="email"
                            onChange={handleChange}
                            placeholder="E-mail"
                            onFocus={onFocus}
                            required
                        />
                        {
                            errors.email && touched.email && <p>{errors.email}</p>
                        }
                        <input
                            className={Styles.date}
                            value={input.birth}
                            name="birth"
                            onChange={handleChange}
                            placeholder="Fecha de nacimiento"
                            type='date'
                            onFocus={onFocus}
                            required
                        />
                        {/* {
                            errors.birth && touched.birth && <p>{errors.birth}</p>
                        } */}
                        <div className={Styles.contRadio}>
                            <div className={Styles.radio}>
                                <input
                                    // className={Styles.input}
                                    id="type"
                                    name="type"
                                    onChange={handleChange}
                                    value="artist"
                                    type="radio"
                                    onFocus={onFocus}
                                    required
                                />
                                <label for="type">artista</label>
                            </div>

                            <div className={Styles.radio}>
                                <input
                                    // className={Styles.input}
                                    id="type"
                                    name="type"
                                    onChange={handleChange}
                                    value="user"
                                    type="radio"
                                    onFocus={onFocus}
                                    required
                                />
                                <label for="type">comprador</label>
                            </div>
                        </div>
                        {
                            errors.birth && touched.birth && <p>{errors.birth}</p>
                        }

                        <input className={Styles.btn} type="submit" value='Crear' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
