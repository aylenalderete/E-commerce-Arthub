const server = require("express").Router();
const { Offer, Product, Category } = require('../db.js');


server.get('/', async (req, res) => {
    res.json(await Offer.findAll());
})

server.post('/', async (req, res) => {
    const { day, discount, idCategory } = req.body;

    
    
    let offer = await Offer.findOrCreate({
        where: {
            day,
            categoryId: idCategory
        }
    })
    
    offer[0].discount = discount;
    await offer[0].save();

    res.json(offer[0]);
})

// HACER DELETE

module.exports = server;