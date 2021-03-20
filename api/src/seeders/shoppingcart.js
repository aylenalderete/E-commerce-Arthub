const arrayOfShoppingcart = [
    {
        state: "fullfilled",
        total_price: 90,
        userId: 4,
        lineorder: [
            {
                unit_price: 10,
                quantity: 2,
                productIdProduct: 3,
            },
            {
                unit_price: 10,
                quantity: 3,
                productIdProduct: 2,
            },
            {
                unit_price: 10,
                quantity: 4,
                productIdProduct: 1,
            },
        ],
    },
    {
        state: "pending",
        total_price: 43,
        userId: 1,
        lineorder: [
            {
                unit_price: 10,
                quantity: 2,
                productIdProduct: 5,
            },
            {
                unit_price: 5,
                quantity: 3,
                productIdProduct: 2,
            },
            {
                unit_price: 2,
                quantity: 4,
                productIdProduct: 1,
            },
        ],
    },
    {
        state: "pending",
        total_price: 100,
        userId: 3,
        lineorder: [
            {
                unit_price: 15,
                quantity: 2,
                productIdProduct: 3,
            },
            {
                unit_price: 10,
                quantity: 3,
                productIdProduct: 2,
            },
            {
                unit_price: 10,
                quantity: 4,
                productIdProduct: 1,
            },
        ],
    },
    // {
    //     state: "pending",
    //     total_price: 60,
    //     userId: 4,
    //     lineorder: [
    //         {
    //             unit_price: 5,
    //             quantity: 2,
    //             productIdProduct: 4,
    //         },
    //         {
    //             unit_price: 10,
    //             quantity: 3,
    //             productIdProduct: 3,
    //         },
    //         {
    //             unit_price: 5,
    //             quantity: 4,
    //             productIdProduct: 2,
    //         },
    //     ],
    // },
];

module.exports = arrayOfShoppingcart;