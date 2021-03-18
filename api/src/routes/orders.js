const server = require("express").Router();
const {
    User,
    Category,
    Image,
    Shoppingcart,
    Lineorder,
    Product,
} = require("../db.js");

// 1: GET /orders
// Esta ruta puede recibir el query string status y deberá devolver sólo las ordenes con ese status

server.get("/", async (req, res) => {
    const { status } = req.query;

    try {
        if (status) {
            const ordersToReturn = await Shoppingcart.findAll({
                where: { state: status },
                include: [{
                    model: Lineorder,
                    include: [{ model: Product }]
                },]
            });
            if (ordersToReturn.length > 0) {
                res.json(ordersToReturn)
            } else {
                res.json({ message: `Could not find orders with status: ${status}` });
            }
        } else {
            const allOrders = await Shoppingcart.findAll({
                include: [{
                    model: Lineorder,
                    include: [{ model: Product }]
                },]
            });
            if (allOrders.length > 0) {
                res.json(allOrders)
            } else {
                res.json({ message: "No orders found" });
            }
        }
    } catch {
        (err) => {
            console.log(err);
            res.json(err);
        };
    }
});

// 2: GET /orders/:id
// Ruta que retorne una orden en particular
server.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const orderToReturn = await Shoppingcart.findOne({
            where: { id_order: id },
            include: [
                {
                    model: Lineorder,
                    include: [{ model: Product }],
                },
            ],
        });
        if (!orderToReturn) {
            res.json({ message: "Could not find order" });
        }
        res.json(orderToReturn);
    } catch {
        (err) => {
            console.log(err);
            res.json(err);
        };
    }
});


// 3: PUT /orders/:id
// Ruta para modificar una Orden

server.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { state, total_price } = req.body;
        const orderToEdit = await Shoppingcart.findByPk(parseInt(id));
        if (!orderToEdit) {
            res.json({ message: "Could not find order" });
        }
        orderToEdit.state = state;
        orderToEdit.total_price = total_price;
        await orderToEdit.save();
        await orderToEdit.reload();
        console.log(orderToEdit);
        res.json(orderToEdit);
    } catch {
        (err) => {
            console.log(err);
            res.json(err);
        };
    }
});

module.exports = server;
