import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar/NavBar.jsx';
import style from './artistProfile.module.css'
import ArtCard from './../../Components/Art/ArtCard';

function ArtistProfile({ artistId }) {

    const [artistDetails, setArtistDetails] = useState({
        username: '',
        name: '',
        lastname: '',
        profilepic: '',
        email: '',
    });

    const [artistProducts, setArtistProducts] = useState({})

    useEffect(() => {
        axios
            .get(`http://localhost:3001/users/${artistId}`)
            .then((result) => setArtistDetails(result.data[0]));
    }, [])

    useEffect(() => {
        axios
            .get(`http://localhost:3001/products/user/${artistId}`)
            .then((result) => setArtistProducts(result.data));
    }, [])





    return (
        <div className={style.mainContainer}>
            <div className={style.navBaralign}>
                <NavBar renderTop={false} />
                <div className={style.secondContainer}>

                    <h1>{artistDetails.name} {artistDetails.lastname}</h1>
                    <h3>Productos publicados</h3>
                    <div className={style.allCardsContainer}>
                        {
                            (Object.entries(artistProducts).length > 1) ? artistProducts.map(piece => (
                                <ArtCard
                                    name={piece.title}
                                    artist={artistDetails.name + ' ' + artistDetails.lastname}
                                    pic={piece.images[0].url}
                                    idArtist={piece.userId}
                                    id={piece.id_product}
                                    key={piece.id_product}
                                    price={piece.price}
                                    stock={piece.stock}
                                    categories={piece.categories}
                                />
                            ))
                                :
                                <div className={style.secondContainer}>
                                    <p>No hay productos publicados</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtistProfile
