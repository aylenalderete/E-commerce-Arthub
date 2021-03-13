import React from 'react'
import style from '/formCategories.module.css'

function FormCategories() {
    return (
        <div className = {style.create}>
            <h1>crea una nueva categoría</h1>
            <form className = {style.createForm}>

                <input type = 'text' required = 'required' placeholder='nombre*' />
                <input type = 'text' required = 'required' placeholder='descripción*' />
                <input className = 'button' type = 'submit' />

            </form>
        
        </div>
    )
}

export default FormCategories
