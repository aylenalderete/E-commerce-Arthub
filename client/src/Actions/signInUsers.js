

export default function signInUsers(data) {
  console.log(data)
  if(data.user){
  return function (dispatch) {  
    dispatch({ type: "SIGN_IN", payload: data})}    
       
  }
  else return function (dispatch) {
    dispatch({type:"SIGN_IN_REFRESH", payload: data})
  }
}
