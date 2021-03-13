import React from 'react'
import FormCategories from '../Components/FormCategories/FormCategories'
import NavBar from '../Components/NavBar'

function CreateCatgory() {
    return (
        <div className = {style.mainContainerForm}>
            <NavBar renderTop={false} />  
            <FormCategories />
        </div>
    )
}

export default CreateCatgory
