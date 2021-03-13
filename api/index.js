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


const server = require('./src/app.js');
const { conn, Product, Category, Image } = require('./src/db.js');

// Productos y categorias
const arrayCategories = require('./src/seeders/categories.js');
const arrayProducts = require('./src/seeders/products.js');

// Usuarios
// const UsersList = require("./src/seeders/userslist");
// const createNewUser = require("./src/seeders/seeder");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });

  // UsersList.map(async function (newUser) {
  //   await createNewUser(newUser);
  // });

  // Creacion de categorias
  Category.bulkCreate(arrayCategories)
    .then(async () => {
      console.log('Categories successfully created')
      // Creacion de productos
      return Product.bulkCreate(arrayProducts)
    })
    .then(prod => {
      prod.map((instance, i) => {
        arrayProducts[i].category.map(catToAdd => {
          Category.findByPk(catToAdd).then(catFound => {
            // Agrega categorias a los productos
            instance.addCategories(catFound)
          }).catch(err => console.log(err));
        });
      })

      prod.map((instance, i) => {
        const img = arrayProducts[i].images.map(url => ({url}))
        Image.bulkCreate(img)
          .then(arrayImages => {
            // Agrega imagenes a los productos
            instance.setImages(arrayImages.map(i => i.dataValues.id))
          })
          .catch((err) => {
            console.error(err);
          });
      })
    })
    .then(console.log('Products successfully created'))
    .catch((err) => {
      console.error(err);
    });
});
