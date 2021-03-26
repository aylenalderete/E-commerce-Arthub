const { Router } = require("express");
// import all routers;
const productRouter = require("./product.js");
const categoryRouter = require("./category.js");
const searchRouter = require("./search.js");
const userRouter = require("./users.js");
const orderRouter = require("./orders.js");
const searchuserRouter = require("./searchuser.js")

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/products/category", categoryRouter);
router.use("/products", productRouter);
router.use("/search", searchRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/searchuser", searchuserRouter);

module.exports = router;