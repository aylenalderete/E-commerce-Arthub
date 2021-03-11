//Begin Andrés Gómez -  10/03/2021

const server = require('express').Router();
const { Product,User } = require('../db.js');

server.put('/:id', async (req, res, next) => {

    try {

        Product.destroy( {where:{id_product:req.params.id} })
        .then( data =>{
            if(data==0){
                res.json('The product do not exists')
            }else{
                res.json('Success')
            }
        }).catch(err=>{
            console.log(err)
            res.json(err)
        })

    }
    catch (err){
        console.log(err)
        res.json(err)
    }

});

module.exports = server;

//End Andrés Gómez -  10/03/2021
