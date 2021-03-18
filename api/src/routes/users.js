const server = require('express').Router();
const { User, Category, Image } = require('../db.js');
const jwt = require('jsonwebtoken')
const verifyToken = require('./verifyToken')

// 1: Get all users
// No password 
server.get('/', (req, res) => {

	User.findAll({
		attributes: ['id', 'username', 'name', 'lastname', 'birth', 'email', 'type', 'state']
	})
		.then(result => {
			res.json(result)
		})

})

// 2: Create new user
server.post('/', async function (req, res) {
	let { username, name, lastname, email, password, birth, type, state } = req.body;

	let newState = ''
	if (type === 'artist') {
		newState = 'pending'
	}
	if (type === 'user') {
		newState = 'approved'
	}
	if (type === 'admin') {
		newState = 'approved'
	}

	try {
		const newUser = await User.create({
			username,
			name,
			lastname,
			email,
			password,
			birth,
			type,
			state: newState
		})
		// const img = images.map(url => ({ url }))
		// const userImage = await Image.bulkCreate(img)
		// await newUser.setImages(userImage.map(i => i.dataValues.id))
		// console.log(newUser)
		console.log('User successfully created')
		res.json('User successfully created')
	}
	catch (err) {
		console.log(err);
		res.status(500).json({ message: err })
	}
});

// 3: Get user by id
// No password
server.get('/:id', (req, res) => {

	User.findAll({
		where: { id: req.params.id },
		attributes: ['id', 'username', 'name', 'lastname', 'birth', 'email', 'type', 'state']
	})
		.then(result => {
			res.json(result)
		})
})

// 4: Modify user by id
// To be used by the common user/artist
// No password (new route) 
server.put('/:id', async (req, res) => {

	try {
		let updated = await User.update({
			username: req.body.username,
			name: req.body.name,
			lastname: req.body.lastname,
			email: req.body.email,
			birth: req.body.birth,
			type: req.body.type
		},
			{
				where: { id: req.params.id },
			});
		res.json('User succesfully modified');
	} catch (err) {
		console.log(err);
	}
});

//Post singin	#################################################

server.post('/signin/algo', (req, res, next) => {

	const {username,password} = req.body;

	User.findOne({
		where:{username:username } //Verify if username is correct
		})
		.then(user => {
			if(user){
				if(user.password === password){ //Verify if password is correct

					//create token
					let token = jwt.sign({id:user.id},'secret_key',{
						expiresIn:60 * 60 * 24
					})
					user.password = '';
					res.json({user: user,
						      auth: true, 
						      token})
				}else{
					res.json('incorrect password')
				}
			}else{
				res.json('user does not exist')
			}
		})
		.catch(err => {
			console.log(err)
			res.json(err)
		})

})

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
module.exports = server;