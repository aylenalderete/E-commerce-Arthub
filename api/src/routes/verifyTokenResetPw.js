const jwt = require('jsonwebtoken')
function verifyTokenResetPw(req, res, next) {
  const token = req.body.headers["Authorization"];

  console.log('ENTRA A LA VALIDACION DE TOKEN',token)

  if (!token) {
      
      console.log("entro aquí");
      return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  } else {
      console.log(token)

      try{
      var decoded = jwt.verify(token, "secret_change_key");
      req.userId = decoded.id
      console.log('ESTE ES DECODED',decoded)
      next();
      }catch(err){
          res.json({auth:false})
      }
    /*   req.userId = decoded.id; */
     
  }
 
}

 module.exports = verifyTokenResetPw; 
