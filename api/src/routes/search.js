/*-----------------Inicion Jorge Macias---------------------------------*/
const server = require('express').Router();
const { Product, Category, Image } = require('../db.js');




/*--------------Ruta que retorma producto segun el keyword de busqueda-----------*/

server.get('/', (req, res) => {
    try {
        const { query } = req.query
        Product.findAll({
            include: [Category, Image],
            where: {
                title: query
            }
        })
            .then(prod => {
                res.json(prod)
            })

    } catch (error) {
        res.status(500).json({message: 'Error'})
    }

});

/*------------------------------Fin-----------------------------------------*/




module.exports = server;
