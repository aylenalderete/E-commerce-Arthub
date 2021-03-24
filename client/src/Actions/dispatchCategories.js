export function addItemPopUp (category) {
    console.log(category)
    return {type: 'ADD_ITEM_POPUP', payload: category}
};
export function deleteItemPopUp (data){
    return {type: 'DELETE_ITEM_POPUP', payload: data}
}
