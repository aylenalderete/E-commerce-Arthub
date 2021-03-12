const { Router } = require('express');
const { Category } = require('../db.js');
const router = Router();

router.post('/', async (req, res) => {

    try {
        let newCategory = await Category.create({
            name: req.body.name,
            description: req.body.description,
        });
        res.json(newCategory);
    } catch (error) {
        res.json('Error: la categoria ya existe');
    }

});

router.get('/', (req,res) => {
    try {
        Category.findAll()
    .then(result => {
        res.json(result)
    })
    
    } catch (error) {
        res.status(500).res.json({message: 'Error al obtener las categorias'})
    }
    
})

router.delete('/:id', async (req, res) => {
    try {
        let destroyed = await Category.destroy({
            where: {id: req.params.id},            
        });
        res.json(`Categoria con id ${req.params.id} Eliminada`);
    } catch (error) {
        res.json('Error: ', error);
    }

});

router.put('/:id', async (req, res) => {

    try {
        let updated = await Category.update({
            name: req.body.name,
            description: req.body.description,
        },{
            where: {id: req.params.id},
        });
        res.json(`Categoria con id ${req.params.id} modificada`);     
    } catch (error) {
        console.log('error: ', error);
    }

});

module.exports = router;