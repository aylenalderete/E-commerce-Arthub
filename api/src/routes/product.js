const server = require('express').Router();
const { Product, Image, Category, User, productcategory } = require('../db.js');

// 1: Get all products 
server.get('/', (req, res) => {
	Product.findAll(
		{
			include: [
				// Si required es true, no trae todos los productos
				// Aplicar filtro desde el front
				// Para que solo se muestren los productos
				// Con imagen y con categoria
				{
					model: Image,
					// required: true
				},
				{
					model: Category,
					// required: true
				}
			]
		}
	)
		.then(products => {
			res.send(products);
		})
		.catch(() => {
			res.status(500).json({ message: 'Internal server error' })
		});
});

// 2: Create a new product
server.post('/', async function (req, res) {
	const { title, price, description, stock, images, categories, userId } = req.body;
	try {
		const newProduct = await Product.create({
			title,
			price,
			description,
			stock,
			userId
		})
		const img = images.map(url => ({ url }))
		const productImage = await Image.bulkCreate(img)

		await newProduct.setCategories(categories)
		await newProduct.setImages(productImage.map(i => i.dataValues.id))
		res.json('New product added')
	}
	catch (err) {
		res.status(500).json({ message: err })
	}
});

// 3: Edit product
server.put("/:id", async (req, res) => {

	try {
		const productToEdit = await Product.findByPk(parseInt(req.params.id));
		productToEdit.title = req.body.title;
		productToEdit.price = req.body.price;
		productToEdit.description = req.body.description;
		productToEdit.stock = req.body.stock;

		req.body.images.map(async (img, i) => {
			await Image.findOrCreate({
				where: {
					url: req.body.images[i].url
				}
			})
				.then(image => {
					// Agrega imagenes a los productos
					productToEdit.setImages(image[0].id)
				})
		})

		await productToEdit.setCategories(req.body.categories);

		await productToEdit.save();
		const productToReturn = await productToEdit.reload();
		console.log(productToReturn);

		res.status(200).json(productToReturn);
	} catch (e) {
		res.status(400).json({ message: e });
	}
});


// 4: Delete category from product
server.delete("/:idProducto/category/:idCategorias", async (req, res) => {

	const idProd = parseInt(req.params.idProducto)
	const idCat = parseInt(req.params.idCategorias)

	try {
		const productToEdit = await Product.findOne({
			where: { id_product: idProd },
			include: { model: Category },
		});
		await productToEdit.removeCategory(idCat);
		res.json(productToEdit);
	} catch {
		res.status(400);
	}
});

// 5: Delete product by id
server.delete('/:id', async (req, res) => {

	try {

		Product.destroy({ where: { id_product: req.params.id } })
			.then(data => {
				if (data == 0) {
					res.json('The product do not exist')
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

// 6: Search product by id
server.get('/:id', async (req, res) => {

	const prodId = parseInt(req.params.id)

	Product.findByPk(prodId, { include: [Category, Image] })
		.then(prod => res.json(prod))
		.catch(err => {
			console.log(err)
			res.json(err)
		})

});

// 7: Add category to product
server.post("/:idProducto/category/:idCategorias", async (req, res) => {

	const idProd = parseInt(req.params.idProducto)
	const idCat = parseInt(req.params.idCategorias)

	try {
		const productToEdit = await Product.findOne({
			where: { id_product: idProd },
			include: { model: Category },
		});
		await productToEdit.addCategory(idCat);
		res.json('Category added');
	} catch {
		res.status(400);
	}
});

// 8: Search products from category
server.get('/categorias/:nombrecat', (req, res) => {

	const { nombrecat } = req.params
	Category.findAll({ where: { name: nombrecat } })
		.then(categoria => { return categoria[0].dataValues.id })
		.then(catId => Product.findAll({
			include: [
				{
					model: Category,
					where: { id: catId }
				},
				{
					model: Image
				}
			]
		}))
		.then(products => {
			if (products.length > 0) {
				res.json(products)
			} else {
				res.json('No products found')
			}
		})
		.catch(err => {
			console.log(err)
			res.json(err)
		})

})

// 9: Get products by user id
server.get('/user/:id', (req, res) => {

	const { id } = req.params
	Product.findAll({
		include: [Category, Image],
		where: { userId: id }
	})
		.then(result => {
			res.json(result)
		})

})

module.exports = server;
