import React, { useState, useEffect } from "react";
import style from "./artcard.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import editPiece from "../../Images/edit.svg";
import deletePiece from "../../Images/delete.svg";
import DeleteProduct from "../DeleteProduct/DeleteProduct.jsx";
import deleteproduct from "../../Actions/deleteproduct";
import getproductid from "../../Actions/getproductid";
import cart from "../../Images/shopping-cart.svg";
import { addItem, getOrCreateCart } from "../../Actions/shoppingCart"
import { useHistory } from 'react-router';
import { addFav, removeFav } from '../../Actions/wishlist';

function ArtCard({ name, pic, artist, id, idArtist, price, stock, setFlag }) {

  const userType = useSelector((state) => state.userData.type);
  const userData = useSelector((state) => state.userData);

  const history = useHistory();
  const dispatch = useDispatch();

  const isOpenDeleteProd = useSelector((state) => state.isOpenDeleteProd);

  const [productId, setProductId] = useState();

  // Create cart

  function handleClick(id) {
    // dispatch(getOrCreateCart())
    dispatch(addItem(id))
    // history.push('/carrito')
  }


  // Eliminar producto
  function handleDeleteClick(id) {
    isOpenDeleteProd === false
      ? dispatch(deleteproduct(true))
      : dispatch(deleteproduct(false));
    setProductId(id);
    dispatch(getproductid(id));
  }

  // Wishlist
  function handleAddFav(idprod){
    dispatch(addFav(idprod, userData.id))
  }

  function handleRemoveFav(idprod){
    dispatch(removeFav(idprod, userData.id))
  }

  // if user is unlogged or buyer type
  if (!userType || userType === "user") {
    return (
      <div className={style.cardContainer}>
        <div className={style.imgContainer}>
          <Link className={style.linksA} to={`/coleccion/${id}`}>
            <img className={style.cardImg} alt="artpic" src={pic}></img>
          </Link>
        </div>
        <div className={style.linksArtCard}>
          <Link className={style.linksA} to={`/coleccion/${id}`}>
            <h5 className={style.name}>{name}</h5>
          </Link>
          <h5 className={style.text}>Precio: {"$ " + price}</h5>
          {stock > 0 ? (
            <h5 className={style.text}>{`Stock: ${stock}`}</h5>
          ) : (
            <h5 className={style.noStock}>Sin stock</h5>
          )}
          <Link className={style.linksA} to={`/artistas/${idArtist}`}>
            <h5 className={style.artist}>Artista: {artist}</h5>
          </Link>

          {stock > 0 && (
            <Link className={style.cartCont} to="/carrito">
              <img
                onClick={() => handleClick(id)}
                className={style.cart}
                src={cart}
              ></img>
            </Link>
          )}
          {
            userType === "user" && !userData.wishlist.find(p => p.productIdProduct === id) &&
            <button className={style.btnFav} onClick={() => handleAddFav(id)}>
              <i  class="far fa-heart"></i>
            </button>
          }
           {
            userType === "user" && userData.wishlist.find(p => p.productIdProduct === id) &&
            <button className={`${style.btnFav} ${style.pink}`} onClick={() => handleRemoveFav(id)}>
              <i  class="fas fa-heart"></i>
            </button>
          }

        </div>
      </div>
    );
  }

  // If user is artist type
  else if (userType === "artist" || userType === "admin") {
    return (
      <div className={style.cardContainer}>
        {isOpenDeleteProd === true && (
          <DeleteProduct
            productId={productId}
            setFlag={setFlag}
          ></DeleteProduct>
        )}
        <div className={style.imgContainer}>
          <img className={style.cardImg} alt="artpic" src={pic}></img>
        </div>

        <div className={style.linksArtCard}>
          <Link to={`/editarproducto/${id}`} className={style.btnEdit}>
            <img className={style.icon} src={editPiece} alt="edit item" />
          </Link>
          <div className={style.btnDelete}>
            <img
              className={style.icon}
              src={deletePiece}
              alt="delete item"
              onClick={() => handleDeleteClick(id)}
            />
          </div>
          <Link className={style.linksA} to={`/coleccion/${id}`}>
            <h5 className={style.pieceName}>Pieza: {name}</h5>
          </Link>
          <h5 className={style.text}>
            {stock > 0 ? `Stock: ${stock}` : "Producto no disponible"}
          </h5>
          <h5 className={style.text}>Precio: {"$ " + price}</h5>
          <Link className={style.linksA} to={`/artistas/${idArtist}`}>
            <h5 className={style.text}>Artista: {artist}</h5>
          </Link>
        </div>
      </div>
    );
  }
}

export default ArtCard;
