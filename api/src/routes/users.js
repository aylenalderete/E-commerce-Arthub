const server = require("express").Router();

const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");
const bcrypt = require("bcryptjs");
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
	if (req.query.type === 'artists') {
		User.findAll({
			where: {
				state: 'approved',
				type: 'artist'
			},
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
			]
		}).then((result) => {
			res.json(result);
		});
	} else {
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
	}

});

// 2: Create new user
server.post("/", async function (req, res) {
	// console.log("entro en la ruta");
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
	const finder = await User.findOne({
		where: {
			username: username,
		},
	});
	if (finder) {
		return res.json({
			msgUsername: "El usuario ya existe",
		});
	}
	if (!finder) {
		const emailFinder = await User.findOne({
			where: {
				email: email,
			},
		});
		if (emailFinder) {
			return res.json({
				msgEmail: "Este email ya esta registrado",
			});
		}
		if (!emailFinder) {
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
				const crypter = async (password) => {
					const salt = await bcrypt.genSalt(10);
					return bcrypt.hash(password, salt);
				};

				const hashPass = await crypter(password);

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
					newuser.password = " ";
					let obj = { user: newuser, auth: true, token };
					// console.log(obj);
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
		}
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

	var finder = await User.findOne({
		where: {
			username: req.body.username,
		},
	});
	if (finder && req.params.id == finder.dataValues.id) {
		finder = ''
	}
	if (finder) {
		return res.json({
			msgUsername: "El usuario ya existe",
		});
	}
	if (!finder) {
		var emailFinder = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		if (emailFinder && req.params.id == emailFinder.dataValues.id) {
			emailFinder = "";
		}
		if (emailFinder) {
			return res.json({
				msgEmail: "Este email ya esta registrado",
			});
		}

		if (!emailFinder) {
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
		}
	}
});
// esta funcion actualiza el precio total del carrito
async function updateCartTotalPrice(userId) {
	try {
		const cartToUpdate = await Shoppingcart.findOne({
			where: { userId, state: "pending" },
			include: [
				{
					model: Lineorder,
					include: [{ model: Product, include: [{ model: Image }] }],
				},
			],
		});

		if (cartToUpdate) {
			var new_total_price = 0;
			await cartToUpdate.lineorders.map((m) => {
				var lineorder_total_price = parseInt(m.quantity * m.unit_price);
				new_total_price += lineorder_total_price;
			});
			cartToUpdate.total_price = new_total_price;
			await cartToUpdate.save();
		} else {
			return false;
		}
	} catch (e) {
		console.log(e);
	}
}

// 5: Trae la última ORDEN abierta que tenga el usuario.
// Cuando el usuario haga el checkout, esa orden se cerrará y se creará una nueva orden vacía que este abierta.

server.get("/:idUser/cart", async (req, res) => {
	await updateCartTotalPrice(req.params.idUser);
	await Shoppingcart.findOne({
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

// Crea carrito de guest en base de datos
server.post("/:idUser/newcart", async (req, res) => {
	const { idUser: userId } = req.params;
	const { cart } = req.body;

	try {
		let totalPrice = cart.reduce((acc, prod) => acc + prod.quantity * prod.product.price, 0)
		let newCart = await Shoppingcart.create({
			total_price: totalPrice,
			state: "pending",
			userId
		})
		for (let i = 0; i < cart.length; i++) {
			const productToAdd = await Product.findByPk(parseInt(cart[i].product.id_product));
			const newLineorder = await Lineorder.create({
				quantity: cart[i].quantity,
				unit_price: productToAdd.dataValues.price,
			});
			await productToAdd.addLineorder(newLineorder.dataValues.id_line);
			await newCart.addLineorder(newLineorder.dataValues.id_line);
		}
		res.json(newCart)
	}
	catch (error) {
		res.status(400).send(error)
	}
})

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

		let cartNew = await Shoppingcart.findOne({
			where: {
				state: "pending",
				userId,
			},
		});

		if (!cartNew) {
			cartNew = await Shoppingcart.create({
				state: "pending",
				total_price:
					newLineorder.dataValues.unit_price *
					newLineorder.dataValues.quantity,
				userId,
			});
		} else {
			cartNew.total_price = cartNew.total_price
				+ newLineorder.dataValues.unit_price * newLineorder.dataValues.quantity

			await cartNew.save();
			await cartNew.reload();
		}
		//Chequeamos que el producto no este en el shoppingcart para no repetirlo
		const alreadyInCart = await Shoppingcart.findOne({
			where: { userId, state: "pending" },
			include: [
				{
					model: Lineorder,

					include: [
						{ model: Product, where: { id_product: productId } },
					],
				},
			],
		});
		// si alreadyInCart existe quiere decir que el producto ya esta en el carrito
		if (alreadyInCart) {
			return res.json({
				message: "This product is already in your ShoppingCart!",
			});
		} else {
			await productToAdd.addLineorder(newLineorder.dataValues.id_line);
			await cartNew.addLineorder(newLineorder.dataValues.id_line);
			await cartNew.save();
			res.json(cartNew);
		}
	} catch (error) {
		res.status(500).send(error);
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
			include: [
				{
					model: Product,
				},
			],
		});
		const stock = parseInt(lineOrderToEdit.product.stock);

		if (quantity > stock) {
			return res.json({ message: "Not enough stock of this product" });
		}
		if (quantity < 1) {
			return res.json({ message: "Quantity less than 1 is not allowed" });
		} else {
			lineOrderToEdit.quantity = parseInt(quantity);
			await lineOrderToEdit.save();
			await cartToEdit.save();

			await cartToEdit.reload();
			await lineOrderToEdit.reload();
			// console.log(lineOrderToEdit);
			res.json({ message: "Quantity Updated!" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("Error");
	}
});

server.post("/signin/algo", async (req, res, next) => {
	const { username, password } = req.body;

	const compare = async (password, passwordDataBase) => {
		return bcrypt.compare(password, passwordDataBase);
	};

	User.findOne({
		where: { username: username }, //Verify if username is correct
	})
		.then(async (user) => {
			if (user) {
				const comparer = await compare(password, user.password);

				if (comparer) {
					//Verify if password is correct

					//create token
					let token = jwt.sign({ id: user.id }, "secret_key", {
						expiresIn: 60 * 60 * 24,
					});
					user.password = "";
					res.json({
						user: user,
						auth: true,
						token,
					});
				} else {
					res.json("contraseña incorrecta");
				}
			} else {
				res.json("usuario inexistente");
			}
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

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
});

// 9: Retorna todas las ordenes de usuario (id) pasado por params
server.get("/:id/orders", async (req, res) => {
	const { id } = req.params;

	try {
		const orderToReturn = await Shoppingcart.findAll({
			where: { userId: id },
			include: [
				{
					model: Lineorder,
					include: [{ model: Product, include: [{ model: Image }] }],
				},
			],
		});
		if (orderToReturn.length > 0) {
			res.json(orderToReturn);
		}
		res.json({
			message: `Could not find order associated with user id: ${id}`,
		});
	} catch {
		(err) => {
			console.log(err);
			res.json(err);
		};
	}
});

// 10: Elimina lineorder de shopping cart y actualiza precio total de order
server.delete("/order/:idorder/lineorder/:idlineorder", async (req, res) => {
	try {
		await Lineorder.destroy({ where: { id_line: req.params.idlineorder } });

		const cart = await Shoppingcart.findOne({
			where: { id_order: req.params.idorder },
			include: [{ model: Lineorder }],
		});
		let newTotal = 0;
		cart.dataValues.lineorders.forEach((element) => {
			newTotal +=
				element.dataValues.unit_price * element.dataValues.quantity;
		});

		Shoppingcart.update(
			{
				total_price: newTotal,
			},
			{
				where: { id_order: req.params.idorder },
			}
		);

		res.send(`Line order with id ${req.params.idlineorder} was deleted`);
	} catch {
		(err) => {
			console.log(err);
			res.json(err);
		};
	}
});

module.exports = server;
