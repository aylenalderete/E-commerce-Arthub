import React from 'react';
import style from './artcard.module.css';
import { Link } from 'react-router-dom';
import userLog from '../../Actions/userLog';
import {useSelector, useDispatch} from 'react-redux';

function ArtCard({ name, pic, artist, id, idArtist, admin, price }) {
 
  

  return (
    <div className={style.cardContainer}>
      <div className={style.imgContainer}>
        <img className={style.cardImg} alt="artpic" src={pic}></img>
      </div>
      <div className={style.linksArtCard}>
        <Link className={style.linksA} to={`/coleccion/${id}`}>
          <h5 className={style.text}>{name}</h5>
        </Link>
        <h5 className={style.text}>{"$ " + price}</h5>
        <Link className={style.linksA} to={`/artistas/${idArtist}`}>
          <h5 className={style.text}>{artist}</h5>
        </Link>
        {
          admin && <Link to={`editarproducto/${id}`}>Editar</Link>
        }
        <Link className={style.linksA} to= '/carrito'>
          <p className={style.btn}>Añadir al carrito</p>
        </Link>
      </div>
    </div>
  );
}

export default ArtCard
