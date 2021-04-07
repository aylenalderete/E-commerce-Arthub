import React, { useEffect, useState } from "react";
import style from "./auctionView.module.css";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar.jsx";
import getAuctionView from '../../Actions/getAuctionView'
import Countdown from "./Countdown";
import getAuctionPriceTotal from '../../Actions/getAuctionPriceTotal';
import postAuction from '../../Actions/postAuction'


export default function AuctionView(props) {


    const auctionView = useSelector(state => state.auctionView)
    const [value, setValue] = useState(0)
    const dispatch = useDispatch();
    const userDataId = useSelector(state => state.userData.id)
    const userDataName = useSelector(state => state.userData.username)
    const totalPrice = useSelector(state => state.auctionActual)
    const [finished, setFinished] = useState (false)

 
    useEffect(() => {
        dispatch(getAuctionView(props.match.params.id))
        dispatch(getAuctionPriceTotal(auctionView.id_auction,userDataId))
    }, [])

  async function handleSubmit(element) {
    if(totalPrice && totalPrice.length !==0 && totalPrice[totalPrice.length-1].finalPrice){    
        var finalPrice = totalPrice[totalPrice.length-1].finalPrice >= 1000 ? totalPrice[totalPrice.length-1].finalPrice + 100 : totalPrice[totalPrice.length-1].finalPrice + 50
    }else{
        var finalPrice = auctionView.price 
    }
     
        await  dispatch(postAuction(auctionView.id_auction,userDataId, finalPrice))
        setValue(element)
        dispatch(getAuctionPriceTotal(auctionView.id_auction,userDataId))
    }

    function mounthData() {
        var month = new Array();
        month[0] = "Enero";
        month[1] = "Febrero";
        month[2] = "Marzo";
        month[3] = "Abril";
        month[4] = "Mayo";
        month[5] = "Junio";
        month[6] = "Julio";
        month[7] = "Agosto";
        month[8] = "Septiembre";
        month[9] = "Octubre";
        month[10] = "Noviembre";
        month[11] = "Deciembre";
      
        var data = new Date();
        var newMonth = month[data.getMonth()];
        return newMonth
        
      } 

       // inicio busqueda de precio total
    var email = []
    var priceTotal = [];
    var participants = [];
    var name = [];
    var lastname = [];
    for (var i = 0; i < totalPrice.length; i++) {
        // console.log("acaà")
        if (totalPrice[i].auction_id == auctionView.id_auction) {
            // console.log("entró")
            priceTotal.push(totalPrice[i].finalPrice)
            participants.push(totalPrice[i].users[0].username)
            name.push(totalPrice[i].users[0].name)
            lastname.push(totalPrice[i].users[0].lastname)
            email.push(totalPrice[i].users[0].email)
            var winner = participants[participants.length-1]
            var emailWinner = email[email.length-1]
            var nameWinner = name[name.length - 1];
            var lastnameWinner = lastname[lastname.length - 1];

        } 
    }



   



    if (auctionView != null) {
        return (
            <div className={style.mainContainer}>
                <NavBar renderTop={false} />
                <div className={style.contenedor}>
                    <div className={style.column1}>
                        <div className={style.title}>
                            <h1>{auctionView.title}</h1>
                        </div>
                        {auctionView.images && auctionView.images.map(elem => (
                            <div className={style.imgContainer}>
                                <img src={elem.url} />
                            </div>
                        ))}
                        <div className={style.info}>
                            {auctionView.users && auctionView.users.map(elem => (
                                <h3>{elem.username}</h3>
                            ))}
                            <h2>"{auctionView.description}"</h2>
                            <div className={style.category}>
                                {auctionView.categories && auctionView.categories.map(elem => (
                                    <p>{elem.name}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={style.title}>
                            <h1>Subasta {mounthData()} </h1>
                        </div>
                        <div className={style.actual}>
                            <p>Oferta Actual: {priceTotal[priceTotal.length-1]} </p>
                        </div>
                        <div className={style.initial}>
                            <p>Valor Inicial: {auctionView.price}</p>
                        </div>
                        <div className={style.ofert}>
                            <p>Siguiente oferta: {totalPrice && 
                                totalPrice.length !==0 && totalPrice[totalPrice.length-1].finalPrice ?

                                totalPrice[totalPrice.length-1].finalPrice >= 1000 ? totalPrice[totalPrice.length-1].finalPrice + 100 
                                : totalPrice[totalPrice.length-1].finalPrice + 50
                                :
                                auctionView.price >= 1000 ? auctionView.price + 100 : auctionView.price +50
                                }
                            {/* {                                
                            totalPrice[totalPrice.length-1].finalPrice > 1000 ?
                             totalPrice[totalPrice.length-1].finalPrice + 100 : 
                             totalPrice[totalPrice.length-1].finalPrice + 50} */}
    
                            </p>
                            <div className={style.btnSelect}>
                            {finished === false ? 
                        <button className={style.btn} onClick={() => handleSubmit(value + auctionView.percentage)}>Ofertar</button>
                        
                        :
                                <></>
                        }
                            </div>
                        </div>
                        <div >
                            <Countdown winner={winner} idAuct={auctionView.id_auction} setFinished={setFinished} email={emailWinner} name={nameWinner} lastname={lastnameWinner}/>
                        </div>
                    </div> 
                </div>
            </div>
        )
    } else {
        return (
            <div className={style.mainContainer}>
                <NavBar renderTop={false} />
                <p>No hay subastas activas</p>
            </div>
        )
    }

}