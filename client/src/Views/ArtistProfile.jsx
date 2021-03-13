import React from 'react'
import artists from '../fakeListArtists'
import style from './artpiece.module.css'

function ArtistProfile({artistId}) {

    var artistFinder = artists.find(x => x.artist === artistId)
    return (
        <div className={style.container}>
            <div>
                <h4 href = '/artistas'>Volver</h4>
            </div>
            <div className={style.infoContainer}>
                <h1>{artistFinder.artist}</h1>
            </div>
            <div>
                <p>{artistFinder.description}</p>
            </div>
            <div className={style.imgContainer}>
                <img src = {artistFinder.picture} alt = 'Artist Picture'></img>
            </div>
        </div>
    )
}

export default ArtistProfile
