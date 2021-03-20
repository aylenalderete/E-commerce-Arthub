
import React from 'react';
import style from './artcard.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import editPiece from '../../Images/edit.svg';
import deletePiece from '../../Images/delete.svg';

import addToCart from "../../Actions/addToCart.js";
import getUserOrder from '../../Actions/getUserOrder';

function ArtCard({ name, pic, artist, id, idArtist, price, stock }) {
  const userType = useSelector(state => state.userData.type);

  // jorge
  const dispatch = useDispatch();

  const handlePostUserOrder = async (idUser, productId) => {
    await dispatch(addToCart(idUser, productId));
    dispatch(getUserOrder(idUser))
  };
  //-----

  // if user is unlogged or buyer type
  if (!userType || userType === 'user') {
    return (
      <div className={style.cardContainer}>
        <div className={style.imgContainer}>
        <Link className={style.linksA} to={`/coleccion/${id}`}>
          <img className={style.cardImg} alt="artpic" src={pic}></img>
          </Link>
        </div>
        <div className={style.linksArtCard}>
          <Link className={style.linksA} to={`/coleccion/${id}`}>
            <h5 className={style.text}>Pieza: {name}</h5>
          </Link>
          <h5 className={style.text}>Precio: {"$ " + price}</h5>
          <h5 className={style.text}>{stock > 0 ? `Stock: ${stock}` : "Producto no disponible"}</h5>
          <Link className={style.linksA} to={`/artistas/${idArtist}`}>
            <h5 className={style.text}>Artista: {artist}</h5>
          </Link>
          {
            stock === 0 &&
            <Link className={style.linksA} onClick={() => alert("Producto no disponible")}>
              <p className={style.btn}>Añadir al carrito</p>
            </Link>
          }
          {
            stock > 0 &&
            <Link className={style.linksA} >
              <button onClick={() => handlePostUserOrder(4, id)} className={style.btn} >
                Añadir al carrito
             </button>
            </Link>
          }
        </div>
      </div>
    );
  }

  // if user is artist type 
  else if (userType === 'artist' || userType === 'admin') {
    return (
      <div className={style.cardContainer}>
        <div className={style.imgContainer}>
          <img className={style.cardImg} alt="artpic" src={pic}></img>
          <Link to={`/editarproducto/${id}`} className={style.btnEdit}>
            <img className={style.icon} src={editPiece} alt='edit item' />
          </Link>
          <Link to={`/editarproducto/${id}`} className={style.btnDelete}>
            <img className={style.icon} src={deletePiece} alt='delete item' />
          </Link>
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
