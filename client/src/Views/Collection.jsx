import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ArtCard from '../Components/ArtCard';
import SearchBar from '../Components/SearchBar';
import style from './collection.module.css';
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
  const history = useHistory()

  useEffect(() => {
    dispatch(getInitialProducts());

  }, [])

  function handleClick() {
    isOpenFilters === false ?
      dispatch(showFilters(true)) :
      dispatch(showFilters(false))
  }

  function handleRefresh() {
    history.go(0)
  }

  function displayProducts(array) {
    if (typeof array[0] === 'string') {
      return (
        <div>
          <p>No existen productos para esta categoría</p>
          <p className={style.linkRefresh} onClick={handleRefresh}>Volver</p>
        </div>
      )
    }
    return array.map((piece) => {
      return (
        <ArtCard
          name={piece.title}
          pic={piece.images[0].url}
          artist={piece.user.name + ' ' + piece.user.lastname}
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
