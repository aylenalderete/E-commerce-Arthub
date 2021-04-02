import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getAuctions from '../../Actions/getAuctions'
import style from './allAuctions.module.css'
import edit from "../../Images/edit.svg"
import deleteauction from "../../Images/delete.svg"
import axios from 'axios'
import createAuctionPU from '../../Actions/createAuctionPU'
import CreateAuction from './CreateAuction'
import DeleteAuction from './DeleteAuction'
import deleteAuctionPU from '../../Actions/deleteAuctionPU'
import { Redirect, Link } from 'react-router-dom';
import checkauction from '../../Images/comment.svg'

function AllAuction() {
    const auctions = useSelector(state => state.auctions)

    const dispatch = useDispatch()

    const createAuction = useSelector(state => state.createAuction)

    const deleteAuction = useSelector(state => state.deleteAuction)

    const [auctionId, setAuctionId] = useState()

    const [flag, setFlag] = useState(false)

    const userData = useSelector(state => state.userData)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(getAuctions())
        setFlag(false)
    }, [flag])

    function handleClickEdit(id) {
        createAuction === false ? dispatch(createAuctionPU(true)) : dispatch(createAuctionPU(false));
        setAuctionId(id)
    }

    function handleDeleteClick(id) {
        deleteAuction === false ? dispatch(deleteAuctionPU(true)) : dispatch(deleteAuctionPU(false));
        setAuctionId(id)
    }

    if (userData.id < 1 || userData.type !== 'admin') {
        return <Redirect to="/ingresar"></Redirect>;
    }

    console.log(auctionId)


    return (
        <div className={style.container} style={loading ? { 'cursor': 'progress' } : null}>
            {createAuction === true && <CreateAuction auctionId={auctionId} />}
            {deleteAuction === true && <DeleteAuction auctionId={auctionId} />}
            <div >
                <div className={style.column}>
                    <h1>Subastas:</h1>
                </div>
                <table className={style.table}>
                    <tr className={style.head}>
                        <th>imagen</th>
                        <th>título</th>
                        <th>artista</th>
                        <th>descripción</th>
                        <th>estado</th>
                    </tr>

                    {auctions && auctions.map((a) => (

                        <tr key={a.id} className={style.auctions}>
                            <td>
                                <img className={style.picture} src={a.images[0].url} />
                            </td>
                            <td>{a.title}</td>
                            <td>{a.users[0].username}</td>
                            <td>{a.description}</td>
                            <td>{a.state}</td>

                            <th className={style.th}>
                                <div className={style.btnContainer}>
                                    <div className={style.btnContainer} onClick={() => handleClickEdit(a.id_auction)}>
                                        <img className={style.icon} src={edit} alt="edit item" />
                                    </div>

                                    <div className={style.btnContainer} onClick={() => handleDeleteClick(a.id_auction)} >
                                        <img className={style.icon} src={deleteauction} alt="edit item" />
                                    </div>

                                    <Link to={`/auctionView/${a.id_auction}`}>
                                        <div className={style.btnContainer} >
                                            <img className={style.icon} src={checkauction} alt="check item" />
                                        </div>
                                    </Link>
                                </div>
                            </th>
                        </tr>

                    ))}
                </table>
            </div>
        </div>
    )

}

export default AllAuction
