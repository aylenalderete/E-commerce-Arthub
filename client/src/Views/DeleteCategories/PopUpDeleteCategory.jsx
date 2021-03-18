import React from 'react'
import NavBar from '../../Components/NavBar/NavBar.jsx'
import DeleteCategories from '../../Components/DeleteCategories/DeleteCategories.jsx'
import style from './popUpDeleteCategory.module.css'


function PopUpDeleteCategory({categoryId}) {
console.log(categoryId)

    return (
        <div className={style.mainContainer}>
            <NavBar renderTop={false} />
            <div className={style.formContainer}>
            <DeleteCategories categoryId = {categoryId}/>
            </div>
        </div>
    )
}

export default PopUpDeleteCategory
