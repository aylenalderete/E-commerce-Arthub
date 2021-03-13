const server = require('express').Router();
const { Product, Image, Category, User, productcategory } = require('../db.js');

// Get all products 
server.get('/', (req, res) => {
	Product.findAll({
		include: [
			{
				model: Image,
				required: true
			},
			{
				model: Category,
				required: true
			}
		]
	})
		.then(products => {
			res.send(products);
		})
		.catch(() => {
			res.status(500).json({ message: 'Internal server error' })
		});
});

// Create a new product
server.post('/', async function (req, res) {
	const { title, price, description, stock, image, category } = req.body;
	try {
		const newProduct = await Product.create({
			title,
			price,
			description,
			stock
		})
		const productImage = await Image.create({
			url: image
		})
		const categories = category;

		await newProduct.setCategories(categories)
		await newProduct.setImages(productImage)
		res.json('New product added')
	}
	catch (err) {
		res.status(500).json({ message: 'Error' })
	}
});

//pending 1
// Edit product
server.put("/:id", async (req, res, next) => {
	try {
		const productToEdit = await Product.findByPk(req.params.id);
		productToEdit.title = req.body.title;
		productToEdit.price = req.body.price;
		productToEdit.description = req.body.description;
		productToEdit.stock = req.body.stock;

		const productImage = await Image.create({
			url: req.body.image,
		});

		await productToEdit.setImages(productImage);
		const categoryToAdd = await Category.findByPk(req.body.categories);
		await productToEdit.setCategories(categoryToAdd);

		await productToEdit.save();
		const productToReturn = await productToEdit.reload();
		console.log(productToReturn);

		res.status(200).json(productToReturn);
	} catch (e) {
		console.log(e);
		res.status(400).json({ message: "Error" });
	}
});


// Delete product by id
server.delete('/:id', async (req, res) => {

	try {

		Product.destroy({ where: { id_product: req.params.id } })
			.then(data => {
				if (data == 0) {
					res.json('The product do not exists')
				} else {
					res.json('Success')
				}
			}).catch(err => {
				console.log(err)
				res.json(err)
			})

	}
	catch (err) {
		console.log(err)
		res.json(err)
	}

});

// Search product by id
server.get('/:id', async (req, res) => {

	try {

		var resultSet = {
			id: '',
			title: '',
			price: '',
			description: '',
			stock: '',
			categories: [],
			images: [],
		}

		var obj = {}


		await Product.findByPk(req.params.id, { include: [Category, Image] })
			.then(data => {
				resultSet.id = data.dataValues.id_product
				resultSet.title = data.dataValues.title
				resultSet.price = data.dataValues.price
				resultSet.description = data.dataValues.description
				resultSet.stock = data.dataValues.stock
				data.categories.forEach(value => {
					obj.id = value.dataValues.id;
					obj.name = value.dataValues.name;
					obj.description = value.dataValues.description;
					resultSet.categories.push(obj)
					obj = {};
				});
				data.images.forEach(value => {
					obj.id = value.dataValues.id;
					obj.url = value.dataValues.url;
					resultSet.images.push(obj)
					obj = {};
				});
				res.json(resultSet)
			})
			.catch(err => {
				console.log(err)
				res.json(err)
			})
	} catch (err) {
		console.log(err)
		res.json(err)
	}
});
//pending 3
// Add category to product
server.post("/:idProducto/category/:idCategorias", async (req, res) => {
	try {
		const productToEdit = await Product.findOne({
			where: { id_product: req.params.idProducto },
			include: { model: Category },
		});
		await productToEdit.addCategory(req.params.idCategorias);
		res.json(productToEdit);
	} catch {
		res.status(400);
	}
});
//pending 4
// Delete category from product
server.delete("/:idProducto/category/:idCategorias", async (req, res) => {
	try {
		const productToEdit = await Product.findOne({
			where: { id_product: req.params.idProducto },
			include: { model: Category },
		});
		await productToEdit.removeCategory(req.params.idCategorias);
		res.json(productToEdit);
	} catch {
		res.status(400);
	}
});

server.get('/categorias/:nombrecat', (req, res) => {
	try {

		var resultSet = {
			id: '',
			title: '',
			price: '',
			description: '',
			stock: '',
			categories: [],
			images: [],
		}
		var arrayResult = [];
		var arrayCategories = [];
		var arrayImages = [];
		var obj = {}



		const { nombrecat } = req.params
		Category.findAll({
			include: [Product],
			where: {
				name: nombrecat
			}
		})
			.then(result => {
				result[0].products.forEach(elem => {
					//console.log(elem.dataValues.id_product)
					Product.findByPk(elem.dataValues.id_product, {
						include: [Category, Image]
					})
						.then(data => {

							resultSet.id = data.dataValues.id_product
							resultSet.title = data.dataValues.title
							resultSet.price = data.dataValues.price
							resultSet.description = data.dataValues.description
							resultSet.stock = data.dataValues.stock

							data.dataValues.categories.forEach(value => {

								obj.id = value.dataValues.id;
								obj.name = value.dataValues.name;
								obj.description = value.dataValues.description;

								arrayCategories.push(obj)
								obj = {};
							});

							resultSet.categories = arrayCategories

							arrayCategories = [];

							data.dataValues.images.forEach(value => {

								obj.url = value.dataValues.url;
								arrayImages.push(obj)
								obj={}
							})

							resultSet.images = arrayImages;
							arrayImages = [];

							arrayResult.push(resultSet)
							resultSet = {}

							//console.log(resultSet)
							//console.log(data)
						})
						.then(result => {
							res.json(arrayResult)
						})
						.catch(error => {
							res.status(500).json({message: 'Error'})
							console.log(error)
						})
				})
			})


	} catch (error) {
		res.status(500).json({ message: 'Error' })
	}

})

module.exports = server;
