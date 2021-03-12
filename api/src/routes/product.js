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

<<<<<<< HEAD
/*--------------Inicio Jorge Macias--------------------------*/

//Ruta que retorma producto segun segun la categoría
server.get('/categoria/:nombrecat', (req, res) =>{
	try {
		const {nombrecat} = req.params
	Category.findAll({
		include: [Product],
		where: {
			category:nombrecat
		}
	})
	.then(result => {
		res.json(result)
	})

	} catch (error) {
		res.status(500).json({message: 'Error'})
	}
	
})

/*------------------Fin-----------------------------------*/
=======

// Edit product 
server.put("/:id", async (req, res, next) => {
	try {
		const productToEdit = await Product.update(
			{
				title: req.body.title,
				price: req.body.price,
				description: req.body.description,
				stock: req.body.stock,
			},
			{ where: { id_product: req.params.id } }
		);
		await productToEdit.setCategories(req.body.categories);
		await productToEdit.setImages(req.body.productImage);

		res.status(200).json({ message: "Product Updated" });
	} catch (e) {
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
>>>>>>> dev

module.exports = server;
