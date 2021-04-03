const server = require('express').Router();
const { Auction, Image, User, Category, Auctionb } = require('../db.js');


server.post('/', async (req, res) => {
    const { title, description, state, price, userId, percentage, images, categories } = req.body
    try {
        const newAuction = await Auction.create({
            title,
            description,
            price,
            state,
            percentage,
        })
        res.json(newAuction)

        const img = images.map(url => ({ url }))
        const auctionImage = await Image.bulkCreate(img)
        await newAuction.setUsers(userId)
        await newAuction.setImages(auctionImage.map(i => i.dataValues.id))
        await newAuction.setCategories(categories)
    } catch (error) {
        res.status(400).json({ message: 'Error' })
    }

});

server.get('/', async (req, res) => {
    try {
        await Auction.findAll({
            include: [
                {
                    model: Image,
                    attributes: [
                        "id",
                        "url"
                    ]
                },
                {
                    model: User,
                    attributes: [
                        "id",
                        "username"
                    ]
                },
                {
                    model: Category
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
    const { idAuction } = req.params

    await Auction.findOne({
        include: [
            {
                model: Image,
                attributes: [
                    "id",
                    "url"
                ]
            },
            {
                model: User,
                attributes: [
                    "id",
                    "username"
                ]
            },
            {
                model: Category
            }

        ],
        where: {
            id_auction: idAuction
        }
    })
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


server.post('/:idAuction/:idUser', async (req, res) => {
    const { idUser, idAuction } = req.params;
    const { finalPrice } = req.body
    try {
        // const auction = await Auction.findAll({
        //     include: [
        //         {
        //             model: Image,
        //             attributes: [
        //                 "id",
        //                 "url"
        //             ]
        //         },
        //         {
        //             model: User,
        //             attributes: [
        //                 "id",
        //                 "username"
        //             ]
        //         },
        //         {
        //             model: Category
        //         }
    
        //     ],
        //     where: {
        //         id_auction: idAuction
        //     }

        // })

        const auctionBuyer =  await Auctionb.create({
            finalPrice,
            buyer_id : idUser
        })
      await  auctionBuyer.setAuctions(idAuction)
    await auctionBuyer.setUsers(idUser)

        res.json({ message: 'AuctionBuyer successfully updated' });
    } catch (error) {
        res.status(400).json({ message: 'Error' });
    }
})

server.get('/:idAuction/:idUser', async (req, res) => {
    
    try {
        Auctionb.findAll({
            include : [
                {
                    model : Auction
                },
                {
                    model : User
                }
            ]
        })
    .then((result) => {
        res.json(result)
    })
    } catch (error) {
        res.json({message:'Error'})
    }
    
})

server.put('/:idAuction', async (req, res) => {
    const { idAuction } = req.params;
    const { state, price, percentage } = req.body
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