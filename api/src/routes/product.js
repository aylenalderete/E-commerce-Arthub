const server = require('express').Router();
const { Product, Image, Category } = require('../db.js');

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

module.exports = server;
