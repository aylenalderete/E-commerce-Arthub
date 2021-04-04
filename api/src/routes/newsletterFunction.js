const { Router } = require("express");
const { User, Newsletter, Wishlist, Product } = require("../db.js");
const router = Router();
const path = require("path");

//Funcion de enviar email --------------------- INICIO

const nodemailer = require("nodemailer");
const fs = require("fs");
const { google } = require("googleapis");
const Handlebars = require("handlebars");
const hbs = require("nodemailer-express-handlebars");
const CLIENT_ID =
	"58229968491-6sjdcgkqh0uog45rabbitouniqs182ch.apps.googleusercontent.com";
const CLIENT_SECRET = "WqmGTBctdvzddpFsmu0_MwBV";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
	"1//04fZsdreosgbrCgYIARAAGAQSNwF-L9IrqHuSDMvBIGRnXIkUilPVz99wzLB613MJ_AIIR87ry3-JOW-VXn1YrMuqnEbtPh16jA0";
const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmail(subject, body, to) {
	try {
		const accessToken = await oAuth2Client.getAccessToken();

		const transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "andres2661991@gmail.com",
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN,
				accessToken: accessToken,
			},
		});

		const handlebarOptions = {
			viewEngine: {
				extName: ".handlebars",
				partialsDir: __dirname + "/templates/",
				defaultLayout: false,
			},
			viewPath: __dirname + "/templates/",
			extName: ".handlebars",
		};

		transport.use("compile", hbs(handlebarOptions));
		// const mailOptions = {
		// 	from: "ArtHub <andres2661991@gmail.com>",
		// 	to: to,
		// 	subject: subject,
		// 	template: body,
		// };
		//TEST
		var source = fs.readFileSync(
			path.join(__dirname, "templates/template.handlebars"),
			"utf8"
		);
		var template = Handlebars.compile(source);
		const mailOptions = {
			from: "ArtHub <andres2661991@gmail.com>",
			to: to,
			subject: subject,
			html: template(body), // Process template with locals - {passwordResetAddress}
		};
		//TEST

		const result = await transport.sendMail(mailOptions);
		return result;
	} catch (err) {
		console.log(err);
		return err;
	}
}

//Funcion de enviar email --------------------- FINAL


// Esta funcion busca los usuarios que tenian el producto en la whishlist y les envia un email avisando
// Recibe como argumento el id del producto que va a entrar en oferta o que renovo el stock
const sendEmailUpdateStock = async (idProduct) => {
    console.log(idProduct)
	const search = await Wishlist.findAll({
		where: { productIdProduct: idProduct },
	});
	console.log("-------------------------");
	if (search && search.length > 0) {
		let emailList = await Promise.all(
			search.map(async (user) => {
				let userEmail = await User.findByPk(user.dataValues.userId);
				return userEmail.email;
			})
		);
		console.log(emailList);
		const emailBody = "xdxdxdxdxdxdxd";
		const emailSubject = "Whislist";
		emailList.forEach((email) => {
			sendEmail(emailSubject, emailBody, email);
		});
	}
	console.log("-------------------------");
};

module.exports = {sendEmailUpdateStock}