import axios from "axios";
export default function addToCart(idUser, productId) {
	return async (dispatch) => {
		return await axios
			.post(`http://localhost:3001/users/${idUser}/cart`, {
				productId: productId,
				quantity: 1,
			})
			.then((res) =>
				dispatch({ type: "ADD_TO_CART", payload: res.data })
			);
	};
}