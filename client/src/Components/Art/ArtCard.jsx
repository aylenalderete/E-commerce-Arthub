import React, { useState, useEffect } from 'react';
import style from './artcard.module.css';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import editPiece from '../../Images/edit.svg';
import deletePiece from '../../Images/delete.svg';
import DeleteProduct from '../DeleteProduct/DeleteProduct.jsx';
import deleteproduct from '../../Actions/deleteproduct';
import getproductid from '../../Actions/getproductid';
import cart from '../../Images/shopping-cart.svg';



function ArtCard({ name, pic, artist, id, idArtist, price, stock, setFlag }) {
  const userType = useSelector(state => state.userData.type);

  const isOpenDeleteProd = useSelector(state => state.isOpenDeleteProd);

  const [productId, setProductId] = useState()

  const dispatch = useDispatch()

  function handleDeleteClick (id) {
    isOpenDeleteProd=== false ? dispatch(deleteproduct(true)) : dispatch(deleteproduct(false));
    setProductId(id)
    dispatch(getproductid(id))
  };

 // if user is unlogged or buyer type
  if (!userType || userType === 'user' ) {
    return (
      <div className={style.cardContainer}>
        <div className={style.imgContainer}>
          <img className={style.cardImg} alt="artpic" src={pic}></img>
        </div>
        <div className={style.linksArtCard}>
          <Link className={style.linksA} to={`/coleccion/${id}`}>
            <h5 className={style.name}>{name}</h5>
          </Link>
          <h5 className={style.text}>Precio: {"$ " + price}</h5>
         {stock > 0 ? (<h5 className={style.text}>{`Stock: ${stock}`}</h5>) : <h5 className={style.noStock}>Sin stock</h5>}
          <Link className={style.linksA} to={`/artistas/${idArtist}`}>
            <h5 className={style.artist}>Artista: {artist}</h5>
          </Link>
          
          {
            stock > 0 &&
            <Link className={style.cartCont} to='/carrito'>
              <img className={style.cart} src={cart}></img>
            </Link>
          }
        </div>
      </div>
    );
  }

// if user is artist type 
  else if (userType === 'artist' || userType === 'admin'){
    return (
      <div className={style.cardContainer}>
        {isOpenDeleteProd === true && <DeleteProduct productId = {productId} setFlag = {setFlag}> 
            </DeleteProduct>}
        <div className={style.imgContainer}>
          <img className={style.cardImg} alt="artpic" src={pic}></img>
          <Link to={`/editarproducto/${id}`} className={style.btnEdit}>
            <img className={style.icon} src={editPiece} alt='edit item'/>
          </Link>
            <div className={style.btnDelete}>
            <img className={style.icon} src={deletePiece} alt='delete item' onClick={() => handleDeleteClick(id)} />
            </div>
            
        </div>
        <div className={style.linksArtCard}>
          <Link className={style.linksA} to={`/coleccion/${id}`}>
            <h5 className={style.pieceName}>Pieza: {name}</h5>
          </Link>
          <h5 className={style.text}>{stock > 0 ? `Stock: ${stock}` : "Producto no disponible"}</h5>
          <h5 className={style.text}>Precio: {"$ " + price}</h5>
          <Link className={style.linksA} to={`/artistas/${idArtist}`}>
            <h5 className={style.text}>Artista: {artist}</h5>
          </Link>
        </div>
      </div>
    );
  }
}

export default ArtCard