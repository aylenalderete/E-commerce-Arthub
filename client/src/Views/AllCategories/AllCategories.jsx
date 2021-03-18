import axios from 'axios'
import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import NavBar from "../../Components/NavBar/NavBar"
import Styles from "./AllCategories.module.css"
import getCategories from '../../Actions/filter'
import {useSelector, useDispatch} from 'react-redux'
import DeleteCategories from '../../Components/DeleteCategories/DeleteCategories.jsx'


function AllCategories() {
    const categories = useSelector(state => state.categories)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getCategories());

    }, []);

    return (
        <div className={Styles.mainContainer}>
            <NavBar renderTop={false} />
            <div className={Styles.container}>
                <table className={Styles.table}>
                    <tr>
                        <th className={Styles.th}>Categorías:</th>
                        <th>
                        </th>
                    </tr>
                    {
                        categories.map((p) => (
                        <tr className={Styles.tr}>
                            <td>{p.name}</td>
                            <td>{p.description}</td>
                            <th className={Styles.th}>
                                <Link to={`/editarcategorias/${p.id}`}>
                                    <button className={Styles.btn}>Editar</button>
                                </Link>
                                <Link to={`/eliminarcategorias/${p.id}`}>    
                                    <button className={Styles.btn}>Eliminar</button>
                                </Link>
                            </th>
                        </tr>
                        ))                        
                    }
                </table>
            </div>
        </div>
    )
}

export default AllCategories