//Begin Andrés Gómez -  10/03/2021

const server = require('express').Router();
const { Product,Category,Image,productcategory} = require('../db.js');

server.get('/:id', async (req, res, next) => {

    try{

        var resultSet = {
                            id:'',
                            title:'',
                            price:'',
                            description:'',
                            stock:'',
                            categories:[],
                            images:[],
                        }

        var obj = {}
    

        await Product.findByPk(req.params.id,{ include: [Category, Image]   })
        .then(data=>{

            resultSet.id = data.dataValues.id_product
            resultSet.title = data.dataValues.title
            resultSet.price = data.dataValues.price
            resultSet.description = data.dataValues.description
            resultSet.stock = data.dataValues.stock

            data.categories.forEach(value => {

                obj.id = value.dataValues.id;
                obj.name = value.dataValues.name;
                obj.description = value.dataValues.description;

                resultSet.categories.push(obj)
                obj = {};
            });

            data.images.forEach(value => {

                 obj.id = value.dataValues.id;
                 obj.url = value.dataValues.url;
 
                 resultSet.images.push(obj)
                 obj = {};
            });

            res.json(resultSet)
        })
        .catch(err=>{
            console.log(err)
            res.json(err)
        })

    }catch(err){
        console.log(err)
        res.json(err)
    }

});

module.exports = server;

//End Andrés Gómez -  10/03/2021
