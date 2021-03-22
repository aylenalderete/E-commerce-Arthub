import axios from "axios";
export default function addToCart(idUser, productId, quantity) {
	return async (dispatch) => {
		return await axios
			.post(`http://localhost:3001/users/${idUser}/cart`, {
				productId: productId,
				quantity: quantity || 1,
			})
			.then((res) =>
				dispatch({ type: "ADD_TO_CART", payload: res.data })
			);
	};
}
