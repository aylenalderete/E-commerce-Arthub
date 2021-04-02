import React, { useEffect, useState } from "react";
import style from "./auctionView.module.css";
import { useSelector, useDispatch} from "react-redux";
import NavBar from "../NavBar/NavBar.jsx";
import getAuctionView from '../../Actions/getAuctionView'
import { useLocation } from "react-router-dom";


export default function AuctionView(props){

const auctionView = useSelector(state => state.auctionView)
const [value, setValue] = useState(0)
const dispatch = useDispatch();

useEffect(() => {
    dispatch(getAuctionView(props.match.params.id))
},[])


if(auctionView){
    return (
        <div>
           {/* <NavBar renderTop={false}/> */}
           <div className={style.contenedor}>
               <div>
                   <h2>{auctionView.title}</h2>
                   {auctionView.images && auctionView.images.map(elem => (
                       <img src={elem.url}/>
                   ))}
               </div>
               <div>
                   <h1>Subasta  {auctionView.createdAt && auctionView.createdAt.slice(0, 10)} </h1>
                   <p>Oferta Actual {auctionView.price + value} </p>
                   <p>Valor Inicial {auctionView.price}</p>
                   <p>Cada oferta aumenta el 10% del valor inicial</p>
                   <button onClick={() => setValue(value+auctionView.percentage)}>Ofertar</button>
                   <button>Tiempo Restante</button>
               </div>
           </div>
           <div>
               <p>Descripción: {auctionView.description}</p>
               {auctionView.categories && auctionView.categories.map(elem => (
                       <p>{elem.name}</p> 
                   ))}
           </div>
        </div>
    )
}else{
    return(
        <div>
            <p>No hay datos que mostrar</p>
        </div>
    )
}
    
}