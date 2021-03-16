import React from 'react'
import style from './artcard.module.css'
import { Link } from 'react-router-dom'

function ArtCard({ name, pic, artist, id, idArtist, admin }) {
  return (
    <div className={style.cardContainer}>
      <div className={style.imgContainer}>
        <img className={style.cardImg} alt="artpic" src={pic}></img>
      </div>
      <div className={style.linksArtCard}>
        <Link className={style.linksA} to={`/coleccion/${id}`}>
          <h5 className={style.text}>{name}</h5>
        </Link>
        <Link className={style.linksA} to={`/artistas/${idArtist}`}>
          <h5 className={style.text}>{artist}</h5>
        </Link>
        {
          admin && <Link to={`editarproducto/${id}`}>Editar</Link>
        }
      </div>
    </div>
  );
}

export default ArtCard
