//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const server = require("./src/app.js");
const {
  conn,
  Product,
  Category,
  Image,
  User,
  Shoppingcart,
  Lineorder,
} = require("./src/db.js");

// Categorias
const arrayCategories = require("./src/seeders/categories.js");
// Productos
const arrayProducts = require("./src/seeders/products.js");
// Usuarios
const arrayOfUsers = require("./src/seeders/users.js");

//Shopping Cart
const arrayShopping = require("./src/seeders/shoppingcart.js");
const arrayOfShoppingcart = require("./src/seeders/shoppingcart.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
  // Creacion de usuarios
  const seeder = async function () {
    await User.bulkCreate(arrayOfUsers)
      .then(async () => {
        console.log("Users created");
        // Creacion de categorias
        return await Category.bulkCreate(arrayCategories);
      })
      .then(async () => {
        console.log("Categories successfully created");
        // Creacion de productos
        return await Product.bulkCreate(arrayProducts);
      })
      .then(async (prod) => {
        await prod.map(async (instance, i) => {
          await arrayProducts[i].category.map(async (catToAdd) => {
            await Category.findByPk(catToAdd)
              .then(async (catFound) => {
                // Agrega categorias a los productos
                await instance.addCategories(catFound);
              })
              .catch((err) => console.log(err));
          });
        });

        prod.map(async (instance, i) => {
          const img = await arrayProducts[i].images.map((url) => ({ url }));
          await Image.bulkCreate(img)
            .then(async (arrayImages) => {
              // Agrega imagenes a los productos
              await instance.setImages(arrayImages.map((i) => i.dataValues.id));
            })
            .catch((err) => {
              console.error(err);
            });
        });
      })
      .then(console.log("Products successfully created"))
      .catch((err) => {
        console.error(err);
      });

    //-----------------------PRUEBAS Shopping Cart------------------------------------

    Shoppingcart.bulkCreate(arrayOfShoppingcart).then((result) => {
      console.log("Cart Created");
      result.map((cart, i) => {
        const listorder = arrayOfShoppingcart[i].lineorder.map((e) => ({
          unit_price: e.unit_price,
          quantity: e.quantity,
        }));
        // console.log(listorder)
        Lineorder.bulkCreate(listorder)
          .then(async (arrayLine) => {
            //console.log(arrayLine)
            arrayLine.map(async (m, i) => {
              const productToAdd = await Product.findByPk(
                arrayOfShoppingcart[i].lineorder[0].productIdProduct
              );
              // console.log(productToAdd);
              await productToAdd.addLineorder(m);
            });

            const userToAdd = await User.findByPk(
              arrayOfShoppingcart[i].userId
            );
            await cart.setLineorders(
              arrayLine.map((i) => i.dataValues.id_line)
            );
            cart.setUser(userToAdd.dataValues.id);
            cart.save();
          })

          .catch((err) => {
            console.error(err);
          });
      });
    });
    //------------------------FIN------------------------------------
  };
  // Descomentar la siguiente linea para llenar la db por primera vez
  seeder();
});
