import React from 'react'
import Styles from './EditProduct.module.css'

function EditProduct() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <div className={Styles.divTitle}>
                <p>Editar producto</p>
            </div>
            <form className={Styles.form}>
                <input className={Styles.input}></input>
                <input className={Styles.input}></input>
                <input className={Styles.input}></input>
                <input className={Styles.input}></input>
                <div className={Styles.file}>
                    {/* <input className={Styles.btnFile} type="file" name="file" accept= ".jpeg, .png, .jpg"/> */}
                </div>
            </form>
            <div className={Styles.btnProduct}>
                <button className={Styles.btn} >Editar producto</button>
            </div>
        </div>
    )
}

export default EditProduct
