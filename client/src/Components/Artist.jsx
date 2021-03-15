import React from 'react'

function Artist(picture, name, description) {
    return (
        <div>
            <img src={picture}></img>
            <h1>{name}</h1>
            <h3>{description}</h3>
        </div>
    )
}

export default Artist
