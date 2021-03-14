import React, {useState, useEffect} from 'react'
import ArtistCard from '../Components/ArtistCard'
import SearchBar from '../Components/SearchBar'
import NavBar from '../Components/NavBar'
import style from './artists.module.css'
import {useDispatch, useSelector} from 'react-redux'
import getUsersArtists from '../Actions/getUsersArtists'
import PopUp from '../Components/PopUpFilters/PopUp';
import PopUpSort from '../Components/PopUpSort/popUpSort';


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
  
    const [order, setOrder] = useState(false);
    const showOrder = () => {
      order === false ?
        setOrder(true) :
        setOrder(false);
    }

    return (
        <div className = {style.mainContainerArtist}>
            <NavBar renderTop={false} />                
            <div className={style.secondContainer}>
                {filter === true ? <PopUp /> : <></>}
                {order === true ? <PopUpSort order={true} /> : <></>}
                
                <div className={style.sbContainer}>
                    <button className={style.btnFilters} onClick={showFilters}>filtrar</button>
                    <button className={style.btnFilters} onClick={showOrder}>ordenar</button>
                    <SearchBar />
                </div>
            
                <div className={style.artists}>
                {usersArtists&&usersArtists.map((artist) => (
                    <ArtistCard 
                        name = {artist.username}
                        ></ArtistCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Artists
