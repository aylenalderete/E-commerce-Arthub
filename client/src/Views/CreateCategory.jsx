import React from 'react'
import FormCategories from '../Components/FormCategories/FormCategories'
import NavBar from '../Components/NavBar'
import Styles from './createCategory.module.css'


function CreateCategory() {
    return (
        <div className={Styles.mainContainer}>
            <NavBar renderTop={false} />
            
            <FormCategories />
        </div>
    )
}

export default CreateCategory
