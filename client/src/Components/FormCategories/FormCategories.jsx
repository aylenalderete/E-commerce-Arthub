import React, { useState } from 'react'
import style from './formCategories.module.css'

function FormCategories() {

    const [input, setInput] = useState({ name: '', description: '' });
    // const [errors, setErrors] = useState({}); ---> Hacer despues 

    // function validate(){} ---> Hacer despues

    function handleSubmit(ev) {
        ev.preventDefault();
        try {
            fetch('http://localhost:3001/products/category', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            })
            .then((res) => res.json())
            .then(response => alert('Categoria creada'))

        } catch (error) {
            console.log(error);
            alert('No se pudo crear la categoria')
        }
    }

    function handleChange(ev) {
        setInput({
            ...input,
            [ev.target.name]: ev.target.value
        });

        // setErrors(validate()) ---> Hacer despues
    }

    return (
        <div className={style.create}>
            <h1>crea una nueva categoría</h1>
            <form onSubmit={handleSubmit} >

                <input className={style.input} onChange={handleChange} type='text' required='required' placeholder='nombre*' name='name' value={input.name} />
                <input className={style.input} onChange={handleChange} type='text' required='required' placeholder='descripción*' name='description' value={input.description} />
                <button className={style.btn} type='submit'>
                    crear
                </button>

            </form>

        </div>
    )
}

export default FormCategories
