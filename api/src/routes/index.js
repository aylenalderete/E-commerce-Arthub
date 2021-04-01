const { Router } = require("express");
// import all routers;
const productRouter = require("./product.js");
const categoryRouter = require("./category.js");
const searchRouter = require("./search.js");
const userRouter = require("./users.js");
const orderRouter = require("./orders.js");
const searchuserRouter = require("./searchuser.js");
const mailer = require("./mailer.js"); <<
<< << < HEAD
    ===
    === =
    const auctionRouter = require("./auctions.js")
const newsletter = require("./newsletter.js"); >>>
>>> > c783019c178e34637a228692e7237e32ae00be6f
const wishlistRouter = require("./wishList.js");
const newsletter = require("./newsletter.js");
const requestRouter = require("./request.js");

const router = Router();

/// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/wishlist", wishlistRouter);
router.use("/products/category", categoryRouter);
router.use("/products", productRouter);
router.use("/search", searchRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/searchuser", searchuserRouter);
router.use("/mailer", mailer);
router.use("/auctions", auctionRouter)
router.use("/newsletter", newsletter);
router.use("/request", requestRouter);

module.exports = router;