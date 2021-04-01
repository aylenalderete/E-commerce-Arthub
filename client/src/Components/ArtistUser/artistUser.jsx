import React, {useEffect} from 'react';
import NavBar from '../NavBar/NavBar';
import Styles from './artistUser.module.css';
import table from '../BuyUser/buyUser.module.css';
import style from '../AdminUser/adminuser.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import noProfPic from '../Assets/profPic.jpg';
import Edit from '../../Images/edit.svg';
import Add from '../../Images/add-file.svg';
import CarouselCategories from '../CarouselCategories/carouselCategories';
import getUserOrders from '../../Actions/getUserOrders';

export default function ArtistUser() {

    const userData = useSelector(state => state.userData);
    const artistProducts = useSelector(state => state.artistProducts);
    const userOrders = useSelector(state => state.userOrders);
    const history = useHistory();
    const dispatch= useDispatch();

    useEffect(() => {
        dispatch(getUserOrders(userData.id));
    }, []);

    return (
        <div className={Styles.mainContainer}>
            <NavBar renderTop={false} />

            <div className={Styles.wrapper}>

                <div className={Styles.userDesc}>

                    <div className={Styles.userInfo}>
                        <h1 className={Styles.name} >{userData.name}</h1>
                        <p className={Styles.rol}>Rol:{userData.type} </p>
                        <button className={Styles.editProfile} onClick={() => history.push(`/editarperfil/`)}>
                            Editar perfil </button>
                        <br></br>
                        <button className={style.editProfile} onClick={() => history.push(`/requestAuction/`)}>
                            Solicitar subasta </button>
                    </div>
                    <div className={Styles.containerPic}>
                        <img className={Styles.userPic} src={userData.profilepic ? userData.profilepic : noProfPic} alt='User Pic' />
                        <button onClick={() => history.push('/editarperfil')} className={Styles.editBtn}>
                            <img className={Styles.edit} src={Edit} alt="" />
                        </button>
                        
                    </div>
                </div>
                {/* Productos */}
                <div className={Styles.products}>
                    <div className={Styles.alignTitle}>
                        <h2 className={Styles.title}>Productos</h2>
                        <Link className={Styles.linkAdd} to='/crearproducto'>
                            <img className={Styles.addProduct} src={Add} alt='Agrega un producto' />
                            <p className={Styles.addText}>Agregar producto</p>
                        </Link>
                    </div>
                    <CarouselCategories />
                    <Link className={Styles.link} to='/misproductos'>Administrar todos</Link>
                </div>
                {/* Ordenes (compras) */}
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