import React, {useEffect} from 'react'
import NavBar from '../Components/NavBar'
import style from './artistsProducts.module.css'
import {useSelector, useDispatch} from 'react-redux'
import ArtCard from '../Components/ArtCard'
import getArtistsProducts from '../Actions/getArtistsProducts'


function ArtistsProducts() {

    const artistsProducts = useSelector((state) => state.artistsProducts)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getArtistsProducts(1))
    }, []);

    console.log(artistsProducts)

    return (
        <div className = {style.navContainer}>
            <NavBar />
            <div>
                <button>crear producto</button>
                <button>modificar producto</button>
                <div className = {style.productsContainer}>
                {artistsProducts&&artistsProducts.map((piece) => (
                    <ArtCard
                    name={piece.title}
                    pic={piece.images[0].url}
                    artist="Lore ipsum dolor"
                    id={piece.id_product}
                    userId={piece.userId}
                    key={piece.id_product}
                    />
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default ArtistsProducts
