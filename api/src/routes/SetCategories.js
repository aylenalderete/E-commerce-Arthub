const server = require("express").Router();
const { Product, Image, Category, User } = require("../db.js");

// POST /products/:idProducto/category/:idCategoria

// Agrega la categoria al productProduct, Image, Category, Usero.

// DELETE /products/:idProducto/category/:idCategoria

// Elimina la categoria al producto.

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

module.exports = server;
