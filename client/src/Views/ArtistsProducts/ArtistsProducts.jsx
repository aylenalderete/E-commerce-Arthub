import React, {useEffect} from 'react'
import NavBar from '../../Components/NavBar/NavBar.jsx'
import style from './artistsProducts.module.css'
import {useSelector, useDispatch} from 'react-redux'
import ArtCard from '../../Components/Art/ArtCard.jsx'
import getArtistsProducts from '../../Actions/getArtistsProducts'


function ArtistsProducts() {

    const artistsProducts = useSelector((state) => state.artistsProducts)
    const userId = useSelector(state => state.userData.id);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getArtistsProducts(userId))
    }, []);

    
  
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
                    artist={piece.user.name + ' ' + piece.user.lastname}
                    id={piece.id_product}
                    userId={piece.userId}
                    key={piece.id_product}
                    categories={piece.categories}
                    />
                    ))}
                </div>
            </div>
            
        </div>
    )
   
}

export default ArtistsProducts
