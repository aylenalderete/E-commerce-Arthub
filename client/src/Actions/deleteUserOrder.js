import axios from 'axios'

export default function deleteUserOrder(idorder, idlineorder) {
  return function (dispatch) {
      console.log(idorder)
      console.log(idlineorder)
    return axios
      .delete(`http://localhost:3001/users/order/${idorder}/lineorder/${idlineorder}`)
      .then((result) => result.data)
      .then((response) => {
          dispatch({ type:"DELETE_USER_ORDER", payload: response})
      })
      
  };
}