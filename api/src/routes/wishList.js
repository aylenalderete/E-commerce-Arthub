const server = require('express').Router();
const { Product, Image, Category, User, productcategory, Review, userwishprod } = require('../db.js');

server.post('/add', async (req, res) => {
    try {
        const { iduser, idprod } = req.body
        let prod = await Product.findByPk(idprod)
        prod.addUser(iduser);
        res.send('agregado');
        
    } catch (error) {
        res.json(error)
    }
})

server.get('/:userId', async (req, res) => {
    const { userId } = req.params
    
    try {
        let idsprod = await userwishprod.findAll({
            where: {userId},
        });
        let prods = [];
        if (idsprod.length > 0) {
            for (let i = 0; i < idsprod.length; i++) {
                prods.push(await Product.findByPk(idsprod[i].dataValues.productIdProduct)); 
            }
            res.json(prods);
        }else{
            res.json('the user has no products')
        }
    } catch (error) {
        res.status(404).json(error)
    }
})

server.delete('/:userId', async (req, res) => {
    const { userId } = req.params
    const { idprod } = req.body

    try {
        let prod = await userwishprod.destroy({
            where: {productIdProduct: idprod, userId}
        })
        if (prod !== 0) {
            res.json('removed');            
        }else{
            res.json('not found');
        }
    
    } catch (error) {
        res.json(error)
    }

})

module.exports = server;
