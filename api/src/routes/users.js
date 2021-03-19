
const server = require('express').Router();
const jwt = require('jsonwebtoken')
const verifyToken = require('./verifyToken')
const bcrypt = require('bcryptjs')
const {
	User,
	Category,
	Image,
	Shoppingcart,
	Lineorder,
	Product,
} = require("../db.js");


// 1: Get all users
// No password
server.get("/", (req, res) => {
	User.findAll({
		attributes: [
			"id",
			"username",
			"name",
			"lastname",
			"profilepic",
			"birth",
			"email",
			"type",
			"state",
		],
	}).then((result) => {
		res.json(result);
	});
});

// 2: Create new user
server.post("/", async function (req, res) {
	let {
		username,
		name,
		lastname,
		profilepic,
		email,
		password,
		birth,
		type,
		state,
	} = req.body;

	let newState = "";
	if (type === "artist") {
		newState = "pending";
	}
	if (type === "user") {
		newState = "approved";
	}
	if (type === "admin") {
		newState = "approved";
	}

	try {
		const crypter = async password => {
			const salt = await bcrypt.genSalt(10)
			return bcrypt.hash(password, salt)
		}

		const hashPass = await crypter(password)
	
		const newUser = await User.create({
			username,
			name,
			lastname,
			profilepic,
			email,
			password: hashPass,
			birth,
			type,
			state: newState,
		}).then((newuser) => {
			const token = jwt.sign({ id: newuser.id }, "secret_key", {
				expiresIn: 60 * 60 * 24,
			});
			newuser.password = ' '
			let obj = { user: newuser, auth: true, token };
			console.log(obj)
			res.json(obj);
		});
		// const img = images.map(url => ({ url }))
		// const userImage = await Image.bulkCreate(img)
		// await newUser.setImages(userImage.map(i => i.dataValues.id))
		// console.log(newUser)
		console.log("User successfully created");
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err });
	}
});

// 3: Get user by id
// No password
server.get("/:id", (req, res) => {
	User.findAll({
		where: { id: req.params.id },
		attributes: [
			"id",
			"username",
			"name",
			"lastname",
			"profilepic",
			"birth",
			"email",
			"type",
			"state",
		],
	}).then((result) => {
		res.json(result);
	});
});

// 4: Modify user by id
// To be used by the common user/artist
// No password (new route)
server.put("/:id", async (req, res) => {
	try {
		let updated = await User.update(
			{
				username: req.body.username,
				name: req.body.name,
				lastname: req.body.lastname,
				profilepic: req.body.profilepic,
				email: req.body.email,
				birth: req.body.birth,
				type: req.body.type,
			},
			{
				where: { id: req.params.id },
			}
		);
		res.json("User succesfully modified");
	} catch (err) {
		console.log(err);
	}
});

// 5: Trae a última ORDEN abierta que tenga el usuario.
// Cuando el usuario haga el checkout, esa orden se cerrará y se creará una nueva orden vacía que este abierta.

server.get("/:idUser/cart", (req, res) => {
	Shoppingcart.findOne({
		where: { userId: req.params.idUser, state: "pending" },
		include: [
			{
				model: Lineorder,
				include: [{ model: Product, include: [{ model: Image }] }],
			},
		],
	})
		.then((result) => {
			if (result === null) {
				return res.json({
					message: "Could not find specified shopping cart",
				});
			}
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

// 6: Vacia el carrito: elimina los lineorders
// que tenga y setea el precio a cero
server.delete("/:idUser/cart", async (req, res) => {
	try {
		const cartToEmpty = await Shoppingcart.findOne({
			where: { userId: req.params.idUser, state: "pending" },
			include: [
				{
					model: Lineorder,
					include: [{ model: Product }],
				},
			],
		});
		if (cartToEmpty === null) {
			return res.json({
				message: "Could not find specified ShoppingCart",
			});
		}
		console.log(cartToEmpty.lineorders);
		await cartToEmpty.removeLineorders(cartToEmpty.lineorders);
		cartToEmpty.total_price = 0;
		await cartToEmpty.save();
		await cartToEmpty.reload();
		res.json(cartToEmpty);
	} catch {
		(err) => {
			console.log(err);
			res.json(err);
		};
	}
});

// 7: Agrega item a carrito 
server.post("/:idUser/cart", async (req, res) => {
	const { idUser: userId } = req.params;
	const { productId, quantity } = req.body;






	try {
		//Chequeamos que el usuario exista por ID para avisar en caso contrario
		const userExists = await User.findByPk(userId);
		if (!userExists) {
			res.json({ message: "Could not find user" });
		}
		const productToAdd = await Product.findByPk(parseInt(productId));
		const newLineorder = await Lineorder.create({
			quantity,
			unit_price: productToAdd.dataValues.price,
		});
		const newCart = await Shoppingcart.create({
			state: "pending",
			total_price:
				newLineorder.dataValues.unit_price *
				newLineorder.dataValues.quantity,
			userId,
		});
		await productToAdd.setLineorder(newLineorder);
		await newCart.setLineorders(newLineorder);
		res.json({ message: "Shoppingcart created" });
	} catch (error) {
		res.status(500).send("Error");
	}
});

// 8: Edita linea de orden
server.put("/:idUser/cart", async (req, res) => {
	const { idUser: userId } = req.params;
	const { lineOrderId, quantity } = req.body;

	try {
		const cartToEdit = await Shoppingcart.findOne({
			where: { userId, state: "pending" },
			include: [
				{
					model: Lineorder,
					where: { id_line: lineOrderId },
				},
			],
		});
		const quantityId = cartToEdit.lineorders[0].id_line;
		const lineOrderToEdit = await Lineorder.findOne({
			where: { id_line: quantityId },
		});
		lineOrderToEdit.quantity = quantity;
		await lineOrderToEdit.save();
		await cartToEdit.reload();
		await console.log(cartToEdit.lineorders);

		res.json({
			message: "Quantity updated",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send("Error");
	}
});

server.post('/signin/algo', async (req, res, next) => {
	
	const { username, password } = req.body;
	
	const compare = async (password, passwordDataBase) => {
    return bcrypt.compare(password, passwordDataBase);
  };
	


		User.findOne({
		where: { username: username } //Verify if username is correct
	})
		.then(async user => {
			if (user) {
				const comparer = await compare(password, user.password)
				
				if (comparer) { //Verify if password is correct

					//create token
					let token = jwt.sign({ id: user.id }, 'secret_key', {
						expiresIn: 60 * 60 * 24
					})
					user.password = '';
					res.json({
						user: user,
						auth: true,
						token
					})
				} else {
					res.json('contraseña incorrecta')
				}
			} else {
				res.json('usuario inexistente')
			}
		})
		.catch(err => {
			console.log(err)
			res.json(err)
		})

})

server.post("/userdata/token", verifyToken, (req, res, next) => {

	User.findByPk(req.userId)
		.then((user) => {
			user.password = 0;
			res.json(user);
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		});

})

// 9: Retorna todas las ordenes de usuario (id) pasado por params 
server.get("/:id/orders", async (req, res) => {
	const { id } = req.params;

	try {
		const orderToReturn = await Shoppingcart.findAll({
			where: { userId: id },
			include: [
				{
					model: Lineorder,
					include: [{ model: Product }],
				},
			],
		});
		if (orderToReturn.length > 0) {
			res.json(orderToReturn);
		}
		res.json({ message: `Could not find order associated with user id: ${id}` });
	} catch {
		(err) => {
			console.log(err);
			res.json(err);
		};
	}

});

module.exports = server;

