// Jorge Macias
const server = require('express').Router();
const { Product, Category, Image } = require('../db.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;




/*--------------Routers returns products by keyword-----------*/

server.get('/', (req, res) => {
	try {
		const { query } = req.query

		Product.findAll({
			include: [Category, Image],
			where: {
				[Op.or]: [
					{ title: query },
					{ description: { [Op.like]: `%${query}%` } }

				]
			}

		})
			.then(prod => {
				res.json(prod)
			})

	} catch (error) {
		res.status(500).json({ message: 'Error' })
	}

});



module.exports = server;