import React from 'react'
import {Link} from 'react-router-dom'

function ArtistCard({picture, artist}) {
    return (
        <div>
            <div>
                <img src={picture} alt = 'Artist picture' ></img>
            </div>
            <div>
                <Link to = {`/artistas/${artist}`}>
                    <h1>{artist}</h1>
                </Link>
            </div>
        </div>
    )
}

export default ArtistCard
