const server = require('express').Router();
const { User } = require('../db.js');

// Get all users
server.get('/', (req, res) => {

	User.findAll({
		attributes : ['id' ,'username', 'name', 'lastname', 'type' ]
	})
	.then(result => {
		res.json(result)
	})

})

module.exports = server;