import React from 'react'
import {Link} from 'react-router-dom'
import style from './artistCard.module.css'

function ArtistCard({picture, artist}) {
    return (
        <div className = {style.cardContainer}>
            <div className = {style.imgContainer}>
                <img className={style.imgArtist} src={picture} alt = 'Artist' ></img>
            </div>
            <div>
                <Link to = {`/artistas/:artistId`}>
                    <h3 className={style.text}>{artist}</h3>
                </Link>
            </div>
        </div>
    )
}

export default ArtistCard