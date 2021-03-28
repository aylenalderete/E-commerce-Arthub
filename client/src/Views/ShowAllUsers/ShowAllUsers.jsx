import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import AllUsers from '../../Components/AllUsers/AllUsers'
import style from './showAllUsers.module.css'
import { useSelector } from 'react-redux';
import SearchBar from "../../Components/SearchBar/SearchBar.jsx";


function ShowAllUsers() {
    const userType = useSelector(state => state.userData.type);

    return (
        <div className={style.mainContainer}>
            {userType && userType === "admin" ? (
                <div className={style.mainContainer}>
                    <NavBar />
                    <AllUsers />
                </div>
            ) : (<></>
            )}
        </div>
    )
}

export default ShowAllUsers
