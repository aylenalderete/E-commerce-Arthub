import React from 'react'
import getInitialProducts from '../../Actions/getInitialProducts';
import deleteproduct from '../../Actions/deleteproduct'

function DeleteProduct(props) {

    const [theProduct, setTheProduct] = useState()

    const products = useSelector(state => state.products)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getInitialProducts());
    }, []);
    
    useEffect(() => {
        setTheProduct(products.filter((element) => element.id == props.products.id)[0])
    }, [products])


    function handleSubmit() {
        try {
            fetch(`http://localhost:3001/products/${props.products.id}`, {
                method: 'DELETE',
            })
            .then((res) => res.json())
            .then(response => alert('Producto eliminado'))

        } catch (error) {
            console.log(error);
            alert('No se pudo eliminar el producto')
        }

        dispatch(deleteproduct(false))
    }
 

    return (
        <div className={style.mainDivPopUp}>
            <div className={style.textPop}>
                estás seguro de querer eliminar el producto {props.products.name} ?
            </div>        
            <div className = {style.btnSelect}>
                <button className={style.btn} onClick = {() => handleSubmit()}>
                    eliminar
                </button>
            </div>
        </div>
    )
}

export default DeleteProduct
