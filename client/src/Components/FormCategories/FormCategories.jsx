import React, { useState } from 'react'
import style from './formCategories.module.css'


export const validate = (input) => {
    let errors = {};
    if (!input.name) {
        errors.name = 'nombre es obligatorio';
    }


    if (!input.description) {
        errors.description = 'la descripcion es obligatoria';
    }
    return errors;

};
function FormCategories() {

    const [input, setInput] = useState({ name: '', description: '' });
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});


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

        setErrors(validate({
            ...input, [ev.target.name]: ev.target.value
        }));
    }

    function onFocus(ev){
        setTouched({
            ...touched,
            [ev.target.name] : true
        })
    }

    return (
        <div className={style.create}>
            <h1>crea una nueva categoría</h1>
            <form onSubmit={handleSubmit} >

                {/* <div> */}

                <input onFocus={onFocus} className={style.input} onChange={handleChange} type='text' required='required' placeholder='nombre*' name='name' value={input.name} />
                {errors.name && touched.name && (
                    <p>{errors.name}</p>
                )}

                {/* </div> */}
                <input onFocus={onFocus} className={style.input} onChange={handleChange} type='text' required='required' placeholder='descripción*' name='description' value={input.description} />
                {errors.description && touched.description && (
                    <p>{errors.description}</p>
                )}
                <button className={style.btn} type='submit'>
                    crear
                </button>

            </form>

        </div>
    )
}

export default FormCategories
