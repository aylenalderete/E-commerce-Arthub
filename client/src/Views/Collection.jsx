import React from 'react'
import art from '../fakeList'
import ArtCard from '../Components/ArtCard'
import SearchBar from '../Components/SearchBar'
import style from './collection.module.css'
import NavBar from '../Components/NavBar';

function Collection() {
  return (
    <div className={style.mainContainer}>
      <NavBar renderTop={false} />
      <div className={style.secondContainer}>
        <div className={style.sbContainer}>
        <SearchBar></SearchBar>
        </div>
        <div className={style.container}>
          {art.map((piece) => (
            <ArtCard
              name={piece.name}
              pic={piece.pic}
              artist={piece.artist}
            ></ArtCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection
