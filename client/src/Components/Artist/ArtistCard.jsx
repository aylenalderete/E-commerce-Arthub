import React from 'react'
import { Link } from 'react-router-dom'
import style from './artistCard.module.css'

function ArtistCard({ name, lastname, artistId, profilepic, username }) {
    return (
        <div className={style.cardContainer}>
            <div className={style.imgArtist}>
                <img src={profilepic} />
            </div>
            <Link to={`/artistas/${artistId}`}>
                {name} {lastname}
            </Link>
        </div>
    )
}

export default ArtistCard