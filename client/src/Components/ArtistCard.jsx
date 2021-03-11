import React from 'react'

function ArtistCard(picture, artist) {
    return (
        <div>
            <img src={picture}></img>
            <h1>{artist}</h1>
        </div>
    )
}

export default ArtistCard
