import React from 'react'
import artists from '../fakeListArtists'
import ArtistCard from '../Components/ArtistCard'
import SearchBar from '../Components/SearchBar'
import NavBar from '../Components/NavBar'
import style from './artists.module.css'

function Artists() {
    return (
        <div className = {style.mainContainerArtist}>
            <NavBar renderTop={false} />                
            <div className={style.secondContainer}>
                <div className={style.sbContainer}>
                    <SearchBar />
                </div>
            
                <div className={style.artists}>
                {artists.map(artist => (
                    <ArtistCard picture = {artist.picture} artist = {artist.artist}></ArtistCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Artists
