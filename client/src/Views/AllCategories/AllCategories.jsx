import axios from 'axios'
import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import NavBar from "../../Components/NavBar/NavBar"
import Styles from "./AllCategories.module.css"

function AllCategories() {
    const [AllCategories, setAllCategories] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/products/category')
        .then((res) => {
            setAllCategories(res.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

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
                        AllCategories.map((p) => (
                        <tr className={Styles.tr}>
                            <td>{p.name}</td>
                            <th className={Styles.th}>
                                <Link to="/editarcategorias"><button className={Styles.btn}>Editar</button></Link>
                                <button className={Styles.btn}>Eliminar</button>
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