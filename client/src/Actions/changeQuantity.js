import axios from "axios";
export default function changeQuantity(idUser, idlineorder, quantity) {
	return async (dispatch) => {
		return await axios
			.put(`http://localhost:3001/users/${idUser}/cart`, {
				lineOrderId: idlineorder,
				quantity: quantity,
			})
			.then((res) =>
				dispatch({ type: "CHANGE_QUANTITY", payload: res.data })
			);
	};
}