const server = require("express").Router();
const { Product, Image, Category, User } = require("../db.js");

// PUT /products/:id

// Modifica el producto con id: id. Retorna 400 si los campos enviados no son correctos.

// Retorna 200 si se modificó con exito, y retorna los datos del producto modificado.

//Por params necesitamos el id del producto a editar y por body todos los atributos del producto
//Es decir que siempre van a tener que enviar todos los atributos por el body aunque no hayan sido modificados

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

module.exports = server;
