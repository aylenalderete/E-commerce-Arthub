import axios from 'axios'

export default function deleteUserOrderAll(idUser) {
  return function (dispatch) {
     
    return axios
      .delete(`http://localhost:3001/users/${idUser}/cart`)
      .then((result) => result.data)
      .then((response) => {
          dispatch({ type:"DELETE_USER_ORDER_All", payload: response})
      })
      
  };
}