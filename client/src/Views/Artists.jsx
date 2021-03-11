import React from 'react'
import artists from '../fakeListArtists'
import ArtistCard from '../Components/ArtistCard'

function Artists() {
    return (
        <div>
            {artists.map(artist => (
                <ArtistCard picture = {artist.picture} artist = {artist.artist}></ArtistCard>
            ))}
        </div>
    )
}

export default Artists
