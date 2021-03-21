import axios from "axios";

export default function addToCartGuest(productId) {
    return (dispatch) => {
        return axios
            .get(`http://localhost:3001/products/${productId}`)
            .then((res) =>{
                res = {unit_price: res.data.price, quantity: 1, product: res.data}
                dispatch({ type: "ADD_TO_CART_GUEST", payload: res })
            }
            )
            .catch((err) => {

                console.log(err)

            })
    };
}