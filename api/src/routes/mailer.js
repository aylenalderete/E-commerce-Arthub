const server = require("express").Router();
const jwt = require("jsonwebtoken");
const verifyTokenResetPw= require("./verifyTokenResetPw");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer")
const {google} = require("googleapis")

const CLIENT_ID = '58229968491-6sjdcgkqh0uog45rabbitouniqs182ch.apps.googleusercontent.com'
const CLIENT_SECRET = 'WqmGTBctdvzddpFsmu0_MwBV'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04VjdAu7ftOspCgYIARAAGAQSNwF-L9Irxx8NT_J7Zbe-8ahhQWzuEL5JdKgNFPc3cskLeZzmAOHquYKdxgMC0gv53CChhMqLrao'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

async function sendEmail (subject,body,to){
    try{
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user:'andres2661991@gmail.com',
                clientId: CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {

            from: 'ArtHub <andres2661991@gmail.com>',
            to :to,
            subject:subject ,
            html:body
        }

        const result = await transport.sendMail(mailOptions)
        return result

    }catch (err){
        console.log(err)
        return err
    }
}

const {
	User,
	Category,
	Image,
	Shoppingcart,
	Lineorder,
	Product,
} = require("../db.js");
const { use } = require("./product");

//Send email to password reset

server.post("/send/:email", async (req, res) => {

    const {email} = req.params;

    const result = await User.findOne({
        where: {
          email: email,
        },
    })
    
    if(!result) res.json({email:false})

    var token = await jwt.sign({ id: result.id }, "secret_change_key", {
            expiresIn: 60 ,
    });
     

    var body = `<p>Para resetear tu contraseña <a href=http://localhost:3000/passwordreset/${token}> click aquí</a></p>
                <div>Aviso: este enlace expirará en 60 segundos</div>`

    sendEmail('User Request New',body,email)
    .then(async result2=>{

        if(!(result2.rejected.length)){
            
            try{
                await User.update(
                {password: '*******1A'},
                {where: { id: result.id }})

                    res.json({email:true})

            }catch(err){
                console.log(err)
                res.json(err)
            }   
        }else{
            res.json({auth:false})
        }
        
    })
    .catch((err)=>{
        console.log(err)
        res.json(err)
    })


})

//Validate token from gmail
server.post("/validate/token", verifyTokenResetPw, (req, res, next) => {
	res.json({auth:true})
});

//reset password
server.post("/resetpassword/:password", verifyTokenResetPw, async (req, res, next) => {

    const userId = req.userId
    const password = req.params.password

    try{
        const user = await User.findByPk(userId);

        console.log('User a actualizar password',user)

        if(user.dataValues){

            const crypter = async (password) => {
                const salt = await bcrypt.genSalt(10);
                return bcrypt.hash(password, salt);
            };

            const hashPass = await crypter(password);

            const update = await User.update(
                    {
                        password: hashPass
                    
                    },
                    {
                        where: { id: userId },
                    })
        }
            
        res.json({success:true})
        
    }catch (err){
        console.log(err)
        res.json(err)
    }
   
});

module.exports = server;