import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import style from './createAuction.module.css'
import getAuctions from '../../Actions/getAuctions'
import close from '../../Images/cancel.svg'
import createAuctionPU from '../../Actions/createAuctionPU';


function CreateAuction(props) {
    const auctions = useSelector(state => state.auctions)

    const [theAuction, setTheAuction] = useState()

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAuctions());
        return () => {dispatch(createAuctionPU(false))}
    }, [])

    useEffect(() => {
        setTheAuction(auctions.find((element) => element.id_auction === props.auctionId)) 
    }, [auctions])

    function handleSubmit(ev) {
        ev.preventDefault();
        try {
            fetch(`http://localhost:3001/auctions/${theAuction.id_auction}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    price: theAuction.price,
                    state: 'subastando',
                    percentage: theAuction.price*0.1,
                })
                
            })
                .then((res) => res.json())
                
                

        } catch (error) {
            console.log(error);
            alert('No se pudo cambiar el estado')
        }

        dispatch(createAuctionPU(false))
        dispatch(getAuctions())
    }

    function handleChange(ev) {
        setTheAuction({
            ...theAuction,
            [ev.target.name]: ev.target.value
        });
    }

    const onClose = () =>{
        dispatch(createAuctionPU(false))
    }

    return (
        <div className={style.mainDivPopUp}>

            <button onClick={()=>{onClose()}} className={style.btnCloseDiv}>
                <img className={style.close} src={close} alt="close edit" />
            </button>
            <div className={style.title}>
            <h1 >Editar subasta</h1>
            </div>
        
            <div>
                <div className={style.column1}>
                    <div className={style.containerPic}>
                        <img className={style.picture} src={theAuction?.images[0].url} />
                    </div>
                    <div className={style.column2}>
                        <p className={style.titles}>Título:</p>
                        <input className={style.input} name='title' value={theAuction?.title} disabled />
                        <p className={style.titles}>Artista:</p>
                        <input className={style.input} name='username' value={theAuction?.users[0].username} disabled />
                        <p className={style.titles}>Descripción:</p>
                        <input className={style.input} name='description' value={theAuction?.description} disabled />
                        <p className={style.titles}>Precio inicial:</p>
                        <input className={style.input} name='price' value={theAuction?.price} onChange={handleChange} />
                        <p className={style.titles}>Monto de aumento:</p>
                        <input className={style.input} name='percentage' value={ theAuction?.price>= 1000 ? 100 : 50
                        } onChange={handleChange}/>


                        </div>
                            <div className={style.btnSelect}>
                                <button className={style.btn} type='submit' onClick={handleSubmit}>
                                    Aceptar subasta
                                </button>

                            </div>
                
                    </div>

            </div>

        </div>
    )
}

export default CreateAuction