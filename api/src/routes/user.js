const server = require('express').Router();
const { User, Category, Image } = require('../db.js');

// Get all users
server.get('/', (req, res) => {

	User.findAll({
		attributes: ['id', 'username', 'name', 'lastname', 'birth', 'type', 'email']
	})
		.then(result => {
			res.json(result)
		})

})

// Get user by id
server.get('/:id', (req, res) => {

	User.findAll({
		where: { id: req.params.id },
		attributes: ['id', 'username', 'name', 'lastname', 'birth', 'type', 'email']
	})
		.then(result => {
			res.json(result)
		})
})

module.exports = server;