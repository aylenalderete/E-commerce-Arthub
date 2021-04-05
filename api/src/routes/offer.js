const server = require("express").Router();
const { Offer, Product, Category, Wishlist, User, Image } = require('../db.js');
const { sendEmail } = require("./newsletterOfferFunction.js");


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
    //newsletter-wishlist
    let productsWithOffer = await Product.findAll({ 
        include: [
            {
                model: Category,
                where: { id: idCategory }
            },
            {
                model: Image
            }
        ]
    })
    const data = productsWithOffer.map((el) => el.dataValues)
    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        const users = await Wishlist.findAll({
            where: {
                productIdProduct : product.id_product
            }
        })
        if(users.length === 0) continue
        for (let i = 0; i < users.length; i++) {
            console.log('por enviar el emailll');
            const userId = users[i].dataValues.userId;
            const userData = await User.findByPk(userId)
            const emailBody = {
                title: "Un producto de tu wishList está en oferta ahora!",
                product: {
                    title: product.title,
                    price: product.price - ((discount/100) * product.price),
                    image: product.images[0].dataValues.url,
                    description: product.description,
                    stock: product.stock,
                },
            };
            const emailSubject = "Whislist";
            console.log(emailBody);
            await sendEmail(emailSubject, emailBody, userData.dataValues.email);   
            console.log('email enviado!!!!!');                     
        }
    }
    res.json(offer[0]);
})

// HACER DELETE

module.exports = server;