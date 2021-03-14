import React from 'react'
import style from './artcard.module.css'
import {Link} from 'react-router-dom'

function ArtCard({name, pic, artist}) {
    return (
      <div className={style.cardContainer}>
        <div className={style.imgContainer}>
          {pic.map((p) => (
          <img className={style.cardImg} alt="artpic" src={p.url}></img>            
          ))}
        </div>
        <div className={style.linksArtCard}>
          <Link className={style.linksA} to={`/colección/${name}`}>
            <h5 className={style.text}>{name}</h5>
          </Link>
          <Link  className={style.linksA} to={`/artists/${artist}`}>
            <h5 className={style.text}>{artist}</h5>
          </Link>
        </div>
      </div>
    );
}

export default ArtCard
