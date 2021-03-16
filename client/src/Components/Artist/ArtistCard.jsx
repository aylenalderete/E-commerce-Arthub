import React from 'react'
import {Link} from 'react-router-dom'
import style from './artistCard.module.css'

function ArtistCard({name, lastname, artistId}) {
    return (
        <div className = {style.cardContainer}>
            <div className = {style.imgContainer}>
                <Link to = {`/artistas/${artistId}`}>
                    <h3 className={style.text}>{name}</h3>
                    <h3 className={style.text}>{lastname}</h3>
                </Link>
            </div>
        </div>
    )
}

export default ArtistCard