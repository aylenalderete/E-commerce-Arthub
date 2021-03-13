// const { Product, Image, Category, User } = require("../db.js");
// const UsersList = require("./userslist.js");
// const arrayOfCategories = require("./categories.js");

// async function createNewUser(newUser) {
// 	try {
// 		const insertedUser = await User.create({
// 			username: newUser.username,
// 			name: newUser.name,
// 			lastname: newUser.lastname,
// 			email: newUser.email,
// 			password: newUser.password,
// 			birth: newUser.birth,
// 			type: newUser.type,
// 		});
// 		//await console.log(insertedUser);
// 		// Aca mapeo el array de productos ("products") de cada usuario y creo el producto
// 		await newUser.products.map(async function (newProduct) {
// 			try {
// 				const insertedProduct = await Product.create({
// 					title: newProduct.title,
// 					price: newProduct.price,
// 					description: newProduct.description,
// 					stock: newProduct.stock,
// 				});
// 				//Ahora recorro el array images del producto que contiene los urls
// 				//y creo la instancia de cada imagen
// 				await newProduct.images.map(async function (imgUrl) {
// 					try {
// 						const insertedImage = await Image.create({
// 							url: imgUrl,
// 						});
// 						//asocio la imagen con el producto
// 						insertedProduct.addImage(insertedImage);
// 					} catch {
// 						async (e) =>
// 							console.log("error----------------Images" + e);
// 					}
// 				});
// 				//Ahora recorro el array categories del producto que contiene dos propiedades (name y description)
// 				//y creo la instancia de cada categoria con un findOrCreate porque la relacion en este caso es
// 				//muchos a muchos y hay un constraint de unique en categories. Osea que si intento crear una categoria que ya
// 				//existe tiraria un error. Por eso va findOrCreate
// 				await newProduct.categories.map(async function (cat) {
// 					try {
// 						const insertedCategory = await Category.findOrCreate({
// 							where: {
// 								name: cat.name,
// 								description: cat.description,
// 							},
// 						});
// 						//asocio la imagen con el producto
// 						insertedProduct.addCategory(insertedCategory[0]);
// 					} catch {
// 						async (e) =>
// 							console.log("error----------------Categories" + e);
// 					}
// 				});
// 				//Ahora toca asociar el producto a cada usuario
// 				const association = await insertedUser.addProducts(
// 					insertedProduct
// 				);
// 				//console.log(insertedProduct);
// 			} catch {
// 				async (e) => console.log("error----------------Products" + e);
// 			}
// 		});
// 	} catch (e) {
// 		console.log(e);
// 		// console.log("error----------------Users");
// 	}
// }
// // UsersList.map(async function (newUser) {
// // 	createNewUser(newUser);
// // });
// module.exports = createNewUser;
// // console.log(UsersList);
