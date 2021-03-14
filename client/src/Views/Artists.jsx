import React, {useState, useEffect} from 'react'
import ArtistCard from '../Components/ArtistCard'
import SearchBar from '../Components/SearchBar'
import NavBar from '../Components/NavBar'
import style from './artists.module.css'
import {useDispatch, useSelector} from 'react-redux'
import getUsersArtists from '../Actions/getUsersArtists'

function Artists() {

    const usersArtists = useSelector(state =>state.usersArtists)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersArtists());
    }, [])

    return (
        <div className = {style.mainContainerArtist}>
            <NavBar renderTop={false} />                
            <div className={style.secondContainer}>
                <div className={style.sbContainer}>
                    <SearchBar />
                </div>
            
                <div className={style.artists}>
                {usersArtists&&usersArtists.map((artist) => (
                    <ArtistCard 
                        artist = {artist.username}
                        ></ArtistCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Artists
