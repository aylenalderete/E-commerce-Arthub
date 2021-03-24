import axios from 'axios';

export const addItem = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
    const found = cart.find((f) => f.product.id_product === id)
    let index = cart.indexOf(found)
    let item = {
        product: {},
        quantity: 1
    };
    if (!found) {
        return function (dispatch) {
            axios.get(`http://localhost:3001/products/${id}`)
                .then(r => {
                    item.product = r.data
                    return item
                })
                .then(item => {
                    cart = [...cart, item]
                    localStorage.setItem('cart', JSON.stringify(cart));
                    dispatch({
                        type: "ADD_ITEM",
                        payload: item
                    })
                })
        }
    } else {
        let stock = cart[index].product.stock;
        if (cart[index].quantity < stock) {
            cart[index].quantity += 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        item = cart[index]

        return {
            type: "ADD_ITEM",
            payload: item
        }
    }
}

export const deleteItem = (id) => {
    return {
        type: 'DELETE_ITEM',
        payload: id
    }
}

export const emptyCart = () => {
    return {

    }
}

//for - button 
export const reduceQuantity = (id) => {

    return {
        type: 'REDUCE_QUANTITY',
        payload: id
    }

}