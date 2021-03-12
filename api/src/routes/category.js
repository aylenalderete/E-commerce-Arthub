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

router.delete('/:id', async (req, res) => {
    try {
        let destroyed = await Category.destroy({
            where: {id: req.params.id},            
        });
        res.json(destroyed);
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
        res.json(updated);     
    } catch (error) {
        console.log('error: ', error);
    }

});

module.exports = router;