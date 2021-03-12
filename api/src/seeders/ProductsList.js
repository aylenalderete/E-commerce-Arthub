const arrayOfCategories = require("./CategoriesList.js");

const arrayOfProducts = [
	{
		title: "Cuadro A",
		price: 875,
		description: "Descripcion 1",
		stock: 3,
		images: [
			"https://http2.mlstatic.com/D_NQ_NP_750211-MLA32320249351_092019-O.webp",
			"https://http2.mlstatic.com/D_NQ_NP_773571-MLA44811915155_022021-O.webp",
			"https://http2.mlstatic.com/D_NQ_NP_768415-MLA44811915790_022021-O.webp",
		],
		categories: arrayOfCategories,
	},
	{
		title: "Cuadro B",
		price: 345,
		description: "Descripcion 2",
		stock: 3,
		images: [
			"https://aws.admagazine.com/prod/designs/v1/assets/620x818/68699.jpg",
			"https://aws.admagazine.com/prod/designs/v1/assets/620x439/68698.jpg",
			"https://aws.admagazine.com/prod/designs/v1/assets/620x439/68700.jpg",
		],
		categories: arrayOfCategories,
	},
	{
		title: "Cuadro C",
		price: 462,
		description: "Descripcion 3",
		stock: 3,
		images: [
			"https://aws.admagazine.com/prod/designs/v1/assets/620x818/68701.jpg",
			"https://aws.admagazine.com/prod/designs/v1/assets/620x439/68702.jpg",
			"https://aws.admagazine.com/prod/designs/v1/assets/620x818/68703.jpg",
		],
		categories: arrayOfCategories,
	},
	{
		title: "Cuadro D",
		price: 524,
		description: "Descripcion 4",
		stock: 3,
		images: [
			"https://aws.admagazine.com/prod/designs/v1/assets/620x439/68706.jpg",
			"https://aws.admagazine.com/prod/designs/v1/assets/620x439/68704.jpg",
			"https://aws.admagazine.com/prod/designs/v1/assets/620x818/68705.jpg",
		],
		categories: arrayOfCategories,
	},
	{
		title: "Cuadro E",
		price: 2554,
		description: "Descripcion 5",
		stock: 3,
		images: [
			"https://concepto.de/wp-content/uploads/2018/09/pintura2-1-e1538148276170.jpg",
			"https://concepto.de/wp-content/uploads/2018/09/arte-abstracto-e1538149912292.jpg",
		],
		categories: arrayOfCategories,
	},
	{
		title: "Cuadro F",
		price: 2351,
		description: "Descripcion 6",
		stock: 3,
		images: [
			"https://concepto.de/wp-content/uploads/2018/02/artes-plasticas-cuadro-min-e1519328319772.jpg",
		],
		categories: arrayOfCategories,
	},
	{
		title: "Cuadro G",
		price: 3523,
		description: "Descripcion 7",
		stock: 3,
		images: [
			"https://www.arkiplus.com/wp-content/uploads/2015/04/Kandinsky.jpg",
		],
		categories: arrayOfCategories,
	},
];
module.exports = arrayOfProducts;
