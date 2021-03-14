import React, { useState, useEffect } from 'react'
import ArtCard from '../Components/ArtCard'
import SearchBar from '../Components/SearchBar'
import style from './collection.module.css'
import NavBar from '../Components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import getInitialProducts from '../Actions/getInitialProducts';
import PopUp from '../Components/PopUpFilters/PopUp';
import showFilters from '../Actions/showFilters';

function Collection() {

  const products = useSelector(state => state.products);
  const isOpenFilters = useSelector(state => state.isOpenFilters)
  const filteredProducts = useSelector(state => state.filteredProducts)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialProducts());

  }, [])

  function handleClick() {
    isOpenFilters === false ?
      dispatch(showFilters(true)) :
      dispatch(showFilters(false))
  }

  function displayProducts(array) {

    return array.map((piece) => {
      return (
        <ArtCard
          name={piece.title}
          pic={piece.images[0].url}
          artist="Lore ipsum dolor"
          id={piece.id_product}
          key={piece.id_product}
        />
      )
    })

  }



  return (
    <div className={style.mainContainer}>
      <NavBar renderTop={false} />
      <div className={style.secondContainer}>
        {isOpenFilters === true ? <PopUp></PopUp> : <></>}

        <div className={style.sbContainer}>

          <button className={style.btnFilters} onClick={handleClick}>filtrar</button>
          <SearchBar></SearchBar>
        </div>

        <div className={style.container}>
          {filteredProducts[0] ? displayProducts(filteredProducts) : displayProducts(products)}
        </div>
      </div>
    </div>
  );
}

export default Collection
