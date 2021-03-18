const jwt = require('jsonwebtoken')
function verifyToken(req, res, next) {
  const token = req.body.headers["Authorization"];

  if (!token) {
      
        console.log("entro aquí");
    return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  } else {
      console.log(token)
    const decoded = jwt.verify(token, "secret_key");
    req.userId = decoded.id;
    
    next();
  }
 
}

 module.exports = verifyToken; 
