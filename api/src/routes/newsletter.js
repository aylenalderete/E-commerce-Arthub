const { Router } = require("express");
const { User, Newsletter } = require("../db.js");
const router = Router();
const path = require("path");
//Funcion de enviar email --------------------- INICIO

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const hbs = require("nodemailer-express-handlebars");
const CLIENT_ID =
	"58229968491-6sjdcgkqh0uog45rabbitouniqs182ch.apps.googleusercontent.com";
const CLIENT_SECRET = "WqmGTBctdvzddpFsmu0_MwBV";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
	"1//04VjdAu7ftOspCgYIARAAGAQSNwF-L9Irxx8NT_J7Zbe-8ahhQWzuEL5JdKgNFPc3cskLeZzmAOHquYKdxgMC0gv53CChhMqLrao";

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
				partialsDir: path.resolve(__dirname, "/templates"),
				defaultLayout: false,
			},
			viewPath: path.resolve(
				__dirname,
				"/home/matias/Matias/Portfolio/ecommerce-ft09-g02/api/src/routes/templates"
			),
			extName: ".handlebars",
		};

		transport.use("compile", hbs(handlebarOptions));
		const mailOptions = {
			from: "ArtHub <andres2661991@gmail.com>",
			to: to,
			subject: subject,
			// html: body,
			template: "sub",
		};

		const result = await transport.sendMail(mailOptions);
		return result;
	} catch (err) {
		console.log(err);
		return err;
	}
}

//Funcion de enviar email --------------------- FINAL

//RUTAS:

//Devuelve todos los newsletter
router.get("/", (req, res) => {
	try {
		Newsletter.findAll({ include: [{ model: User }] }).then((result) => {
			res.json(result);
		});
	} catch (error) {
		res.status(500).res.json({ message: "Could not get newsletters" });
	}
});

//Suscribe al user al Newsletter
router.post("/:userId/subscribe", async (req, res) => {
	const { userId } = req.params;
	try {
		const userToSubscribe = await User.findByPk(userId);
		if (!userToSubscribe) {
			return res.json({ message: "Could not found user" });
		}
		if (
			!userToSubscribe.newsletter ||
			userToSubscribe.newsletter === false
		) {
			userToSubscribe.newsletter = true;
			userToSubscribe.save();
			const emailSubject = "Arthub Newsletter";
			const emailBody = "lalalalalal";
			const userEmail = userToSubscribe.email;
			console.log(userEmail);
			await sendEmail(emailSubject, emailBody, userEmail);
			//Guardo el mensaje enviado en la db
			const saveEmail = await Newsletter.create({ content: emailBody });
			saveEmail.addUsers(userToSubscribe.id);
			saveEmail.save();

			res.json({
				message: "You've successfully subscribed to our newsletter!",
			});
		} else {
			res.json({
				message: "You were already subscribed to our newsletter",
			});
		}
	} catch (error) {
		console.log(error);
		res.json({ message: "Unable" });
	}
});
//Des-Subscribe el user del Newsletter
router.post("/:userId/unsubscribe", async (req, res) => {
	const { userId } = req.params;
	try {
		const userToSubscribe = await User.findByPk(userId);
		if (!userToSubscribe) {
			return res.json({ message: "Could not found user" });
		}
		if (userToSubscribe.newsletter === true) {
			userToSubscribe.newsletter = false;
			userToSubscribe.save();
			const emailSubject = "Arthub Newsletter";
			const emailBody =
				"You've successfully unsubscribed from our newsletter!";
			const userEmail = userToSubscribe.email;
			await sendEmail(emailSubject, emailBody, userEmail);
			//Guardo el mensaje enviado en la db
			const saveEmail = await Newsletter.create({ content: emailBody });
			saveEmail.addUsers(userToSubscribe.id);
			saveEmail.save();
			res.json({
				message:
					"You've successfully unsubscribed from our newsletter!",
			});
		} else {
			res.json({ message: "You weren't subscribed to our newsletter" });
		}
	} catch (error) {
		console.log(error);
		res.json({ message: "Unable" });
	}
});
module.exports = router;
