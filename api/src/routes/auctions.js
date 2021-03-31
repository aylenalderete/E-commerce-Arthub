const server = require('express').Router();
const { Auction, Image } = require('../db.js');


server.post('/', async (req, res) => {
    const { title, description, state, price, idSeller, percentage, idBuyer, age, images } = req.body
    try {
        const newAuction = await Auction.create({
            title,
            description,
            price,
            state,
            idSeller,
            idBuyer,
            percentage
        })
        res.json(newAuction)

        const img = images.map(url => ({ url }))
        const auctionImage = await Image.bulkCreate(img)

        await newAuction.setImages(auctionImage.map(i => i.dataValues.id))
    } catch (error) {
        res.status(400).json({ message: 'Error' })
    }

});

server.get('/', async (req, res) => {
    try {
        await Auction.findOne({
            include: [
                {
                    model: Image,
                    attributes: [
                        "id",
                        "url"
                    ]
                }

            ],


        })
            .then((result) => {
                res.json(result)
            })

    } catch (error) {
        res.status(400).json({ message: 'Error' })
    }

})

server.get('/:idAuction', async (req, res) => {

    await Auction.findByPk(req.params.idAuction)
        .then((result) => {
            console.log(result)
            res.json(result)
        })
})

server.delete('/:idAuction', async (req, res) => {
    const { idAuction } = req.params;

    try {

        Auction.destroy(
            {
                where: { id_auction: idAuction }
            });
        res.json({ message: 'Auction successfully removed' });
    } catch (error) {
        res.status(400).json({ message: 'Error' });
    }
})


server.put('/:idAuction/:idBuyer', async (req, res) => {
    const { idBuyer,idAuction } = req.params;
    const { price } = req.body
    try {
        await Auction.update({
            idBuyer,
            price
        }, {
            where: {
                id_auction: idAuction
            }
        });
        res.json({ message: 'Auction successfully updated' });
    } catch (error) {
        res.status(400).json({ message: 'Error' });
    }
})
server.put('/:idAuction', async (req, res) => {
    const { idAuction } = req.params;
    const {  state, price,  percentage } = req.body
    try {
        await Auction.update({
            price,
            state,
            percentage
        }, {
            where: {
                id_auction: idAuction
            }
        });
        res.json({ message: 'Auction successfully updated' });
    } catch (error) {
        res.status(400).json({ message: 'Error' });
    }
})
module.exports = server;