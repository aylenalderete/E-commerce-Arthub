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

  //hooks filtros
  const [filter, setFilter] = useState(false);

  const showFilters = () => {
    filter === false ?
      setFilter(true) :
      setFilter(false);
  }

  const [order, setOrder] = useState(false);
  
  const showOrder = () => {
    order === false ?
      setOrder(true) :
      setOrder(false);
  }

  console.log(products)
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
            ></ArtCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection
