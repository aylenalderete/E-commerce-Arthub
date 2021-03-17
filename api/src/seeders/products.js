const arrayOfProducts = [
    {
        title: "Astronauta",
        price: 100,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 3,
        userId: 1,
        images: [
            "https://i.imgur.com/HYCjNmD.png",
            "https://i.imgur.com/HYCjNmD.png",
        ],
        category: [2, 3],
    },
    {
        title: "Caballito",
        price: 150,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 432,
        userId: 2,
        images: ["https://i.imgur.com/XVfLCqe.jpg"],
        category: [1],
    },
    {
        title: "Cabrita",
        price: 100,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 1,
        userId: 3,
        images: ["https://i.imgur.com/oYqOEfO.jpg"],
        category: [1, 3, 5],
    },
    {
        title: "Cerdito",
        price: 150,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 99,
        userId: 7,
        images: ["https://i.imgur.com/FF3623l.jpg"],
        category: [2],
    },
    {
        title: "Faro",
        price: 100,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 0,
        userId: 4,
        images: ["https://i.imgur.com/m81rQbp.jpg"],
        category: [5],
    },
    {
        title: "Flores",
        price: 150,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 23,
        userId: 5,
        images: ["https://i.imgur.com/R3v4hNp.jpg"],
        category: [4, 5],
    },
    {
        title: "Guatemalita",
        price: 200,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 5,
        userId: 7,
        images: ["https://i.imgur.com/9ytzDk6.jpg"],
        category: [1, 2, 3, 4, 5],
    },
    {
        title: "Pato",
        price: 150,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 15,
        userId: 5,
        images: ["https://i.imgur.com/6CioD2b.png"],
        category: [1],
    },
    {
        title: "Pink Floyd en Barcelona",
        price: 100,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 21,
        userId: 1,
        images: ["https://i.imgur.com/SzAsdNG.jpg"],
        category: [3, 4],
    },
    {
        title: "Pink Floyd en New York",
        price: 200,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 150,
        userId: 2,
        images: ["https://i.imgur.com/WsU17dT.jpg"],
        category: [1, 3, 4],
    },
    {
        title: "Pink Floyd en Pennsylvania",
        price: 200,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 43,
        userId: 6,
        images: ["https://i.imgur.com/5Lskah7.jpg"],
        category: [2, 5],
    },
    {
        title: "Separador",
        price: 250,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 2,
        userId: 7,
        images: ["https://i.imgur.com/NiWmWae.jpg"],
        category: [1, 2, 5],
    },
    {
        title: "Shaka",
        price: 150,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 1,
        userId: 6,
        images: ["https://i.imgur.com/L5X7baJ.jpg"],
        category: [3, 4, 5],
    },
    {
        title: "Vaca",
        price: 100,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 6,
        userId: 1,
        images: ["https://i.imgur.com/2FwZ1JJ.jpg"],
        category: [2],
    },
    {
        title: "Van",
        price: 100,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 8,
        userId: 2,
        images: ["https://i.imgur.com/aVJ5Iw7.jpg"],
        category: [5],
    },
    {
        title: "Velero",
        price: 100,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 9,
        userId: 6,
        images: ["https://i.imgur.com/CycL5J5.jpg"],
        category: [2, 3],
    },
    {
        title: "Zorro",
        price: 100,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra efficitur magna, eu venenatis neque pharetra vel. Nam feugiat arcu neque, eu condimentum nunc tincidunt quis.",
        stock: 10,
        userId: 4,
        images: ["https://i.imgur.com/uUd7LqQ.png"],
        category: [3, 4],
    },
];

module.exports = arrayOfProducts;
