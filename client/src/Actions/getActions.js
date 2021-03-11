
//obtener todos los cuadros 
export function getProducts(search) {
    return dispatch => {
        dispatch({ type: 'GET_PRODUCTS', payload: search });
    }
}
