import axios from "axios";

export default function changeQuantityGuest(productId, quantity) {
    return{
        type: 'CHANGE_QUANTITY_GUEST', payload: {productId, quantity}
    }
}