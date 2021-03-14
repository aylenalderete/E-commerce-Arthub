import React, { useState, useEffect } from 'react'
import art from '../fakeList'
import ArtCard from '../Components/ArtCard'
import SearchBar from '../Components/SearchBar'
import style from './collection.module.css'
import NavBar from '../Components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import getInitialProducts from '../Actions/getInitialProducts';
import PopUp from '../Components/PopUpFilters/PopUp';
import PopUpSort from '../Components/PopUpSort/popUpSort';

function Collection() {

  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialProducts());

  }, [])

  return (
    <div className={style.mainContainer}>
      <NavBar renderTop={false} />
      <div className={style.secondContainer}>
      {filter === true ? <PopUp  /> : <></>}
      {order === true ? <PopUpSort order={true} /> : <></>}
      
        <div className={style.sbContainer}>
          
          <button className={style.btnFilters} onClick={showFilters}>filtrar</button>
          <button className={style.btnFilters} onClick={showOrder}>ordenar</button>
          <SearchBar></SearchBar>
        </div>
        
        <div className={style.container}>
          {products.map((piece) => (
            <ArtCard
              name={piece.title}
              pic={piece.images[0].url}
              artist="Lore ipsum dolor"
              id={piece.id_product}
              key={piece.id_product}
            ></ArtCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection
