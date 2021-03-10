import React from 'react'

function Artist(picture, artist, description) {
    return (
        <div>
            <img src={picture}></img>
            <h1>{artist}</h1>
            <h3>{description}</h3>
        </div>
    )
}

export default Artist
