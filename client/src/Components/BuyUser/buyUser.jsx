import React, { useEffect } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import { Link, useHistory } from 'react-router-dom';
import style from '../AdminUser/adminuser.module.css';
import { useSelector, useDispatch } from 'react-redux';
import NotFound from '../Assets/profPic.jpg';
import Edit from '../../Images/edit.svg';
import getUserOrders from '../../Actions/getUserOrders';
import table from './buyUser.module.css';

//get a users id y agarrar el user por el redux store
export default function BuyUser() {
    //get user id from authentication info in store

    //get the user info 
    const userData = useSelector(state => state.userData);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserOrders(userData.id));
    }, []);

    //get user orders
    const userOrders = useSelector(state => state.userOrders);

    let history = useHistory()
    return (
        <div className={style.mainContainer}>
            <NavBar renderTop={false} />
            <div className={style.secondContainer}>
                <div className={style.userDesc}>

                    <div className={style.userInfo}>
                        <h1 className={style.name} >{userData.lastname ? (userData.name + ' ' + userData.lastname): (userData.name)}</h1>
                        <div className={style.info}>
                            <p>Cumpleaños: {userData.birth && userData.birth.slice(5, 10)} </p>
                            <p>Mail: {userData.email} </p>
                        </div>

                        <p>Quieres ser artista y vender tus obras? Solicitalo <Link className={table.links} to='/editProfile'>aquí</Link></p>

                        <button className={table.btnEditProfile} onClick={() => history.push(`/editarperfil/`)}>
                            Editar perfil </button>
                    </div>
                    <div className={style.containerPic}>
                        <img className={style.userPic} src={!userData.profilepic ? NotFound : userData.profilepic} alt='User Pic' />
                        <button className={style.editBtn}>
                            <img className={style.edit} src={Edit} alt="" />
                        </button>
                    </div>

                </div>

                <div className={style.containerProducts}>
                    <h2 className={style.title}>Mis Ordenes</h2>

                    {!userOrders.message ?
                        <div className={style.divOrders}>
                            <div className={table.tableContainer}>
                                {userOrders.length > 0 && userOrders.map(o =>
                                    <div className={table.orderContainer} >
                                        <p className={table.infoProduct}>Orden: {o.id_order}</p>
                                        <p className={table.infoProduct}>State: {o.state}</p>
                                        <p className={table.infoProduct}>Precio total: $ {o.total_price}</p>
                                        <p className={table.infoProduct}>Creada: {o.createdAt.slice(0, 10)}</p>
                                       
                                       
                                        
                                        <Link to={`/detalledeorden/${o.id_order}`} >Ver detalle</Link>
                                    </div>

                                )}
                            </div>
                        </div>
                        :
                        <div className={table.notOrders} >
                            <p className={table.infoProduct}>Aún no has realizado ninguna compra, deseas hacerlo? Visita
                               nuestra <Link className={table.links} to='/coleccion'>colección</Link>
                            </p>
                        </div>
                    }
                </div>
            </div>

        </div>

    )

}
