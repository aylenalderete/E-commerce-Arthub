import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar';
import style from './artpiece.module.css'

function ArtistProfile({ artistId }) {

    const [artistDetails, setArtistDetails] = useState({
        username: '',
        name: '',
        lastname: '',
        email: '',

    });

    useEffect(() => {
        axios
            .get(`http://localhost:3001/user/${artistId}`)
            .then((result) => setArtistDetails(result.data[0]));
    }, [])

    return (
        <div className={style.navContainer}>
            <NavBar renderTop={false}></NavBar>
            <div className={style.container}>
                <h1>{artistDetails.name + ' ' + artistDetails.lastname}</h1>
            </div>
        </div>
    )
}

export default ArtistProfile
