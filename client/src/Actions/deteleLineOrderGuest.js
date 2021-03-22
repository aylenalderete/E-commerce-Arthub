
export default function deleteLineOrderGuest(productId) {
    return{
        type: 'DELETE_LINEORDER_GUEST', payload: productId
    }
}