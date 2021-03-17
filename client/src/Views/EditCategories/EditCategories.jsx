import React from 'react'
import EditCategories from '../../Components/EditCategories/EditCategories.jsx'
import NavBar from '../../Components/NavBar/NavBar.jsx'
import style from './editCategories.module.css'


function EditCategory({categoryId}) {
    return (
        <div className={style.mainContainer}>
            <NavBar renderTop={false} />
            <div className={style.formContainer}>
            <EditCategories categoryId = {categoryId}/>
            </div>
        </div>
    )
}

export default EditCategory