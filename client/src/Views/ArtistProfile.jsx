import React from 'react'
import artists from '../fakeListArtists'

function ArtistProfile({artistName}) {

    var artistFinder = artist.find(x => x.artist === artistName)
    return (
        <div>
            <div>
                <h4 href = '/incio'>Inicio</h4>
                <h4 href = '/artistas'>Volver</h4>
            </div>
            <div>
                <img src = {artistFinder.picture} alt = 'Artist Picture'></img>
            </div>
            <div>
                <h1>{artistFinder.artist}</h1>
            </div>
            <div>
                <p>{artistFinder.description}</p>
            </div>
        </div>
    )
}

export default ArtistProfile
