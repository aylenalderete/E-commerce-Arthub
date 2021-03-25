import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import AllUsers from '../../Components/AllUsers/AllUsers'
import style from './showAllUsers.module.css'

function showAllUsers() {
    return (
        <div className = {style.mainContainer}>
            <NavBar />
            <AllUsers />
            
        </div>
    )
}

export default showAllUsers