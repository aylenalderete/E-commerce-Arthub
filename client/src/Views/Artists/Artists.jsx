import React, {useState, useEffect} from 'react'
import ArtistCard from '../../Components/Artist/ArtistCard'
import SearchBar from '../../Components/SearchBar/SearchBar.jsx'
import NavBar from '../../Components/NavBar/NavBar.jsx'
import style from './artists.module.css'
import {useDispatch, useSelector} from 'react-redux'
import getUsersArtists from '../../Actions/getUsersArtists'
import PopUp from '../../Components/PopUpFilters/PopUp';



function Artists() {

    const usersArtists = useSelector(state =>state.usersArtists)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersArtists());
    }, [])

    const [filter, setFilter] = useState(false);

    const showFilters = () => {
      filter === false ?
        setFilter(true) :
        setFilter(false);
    }
  
   

    return (
        <div className = {style.mainContainerArtist}>
            <NavBar renderTop={false} />                
            <div className={style.secondContainer}>
                {filter === true ? <PopUp /> : <></>}
                
                <div className={style.sbContainer}>
                    <button className={style.btnFilters} onClick={showFilters}>filtrar</button>
                    <SearchBar />
                </div>
            
                <div className={style.artists}>
                {usersArtists&&usersArtists.map((artist) => (
                    <ArtistCard 
                        name = {artist.username}
                        artistId = {artist.id}
                        key = {artist.id}
                        ></ArtistCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Artists
