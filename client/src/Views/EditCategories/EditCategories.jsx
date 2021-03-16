import React from 'react'
import EditCategories from '../../Components/EditCategories/EditCategories.jsx'
import NavBar from '../../Components/NavBar/NavBar.jsx'
import style from './editCategories.module.css'


function EditCategory() {
    return (
        <div className={style.mainContainer}>
            <NavBar renderTop={false} />
            <div className={style.formContainer}>
            <EditCategories />
            </div>
        </div>
    )
}

export default EditCategory