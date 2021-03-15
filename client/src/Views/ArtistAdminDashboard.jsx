import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArtCard from "../Components/ArtCard";
import style from "./ArtistAdminDashboard.module.css";
import NavBar from "../../src/Components/NavBar";

function ArtistAdminDashboard() {
    const [AdminProducts, setAdminProducts] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/products/user/${1}`)
            .then((res) => {
                setAdminProducts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className={style.mainContainer}>
            <NavBar renderTop={false} />
            <div className={style.secondContainer}>
                <p>Admin-artist dashboard</p>
                <p>Mis productos:</p>
                {console.log(AdminProducts)}
                <div className={style.cards}>
                    {AdminProducts.map((p) => (
                        <ArtCard pic={p.images} name={p.title} id={p.id_product} />
                    ))}
                </div>
                <Link to="/crearproducto">
                    <button>Crear producto</button>
                </Link>
            </div>
        </div>
    );
}

export default ArtistAdminDashboard;
