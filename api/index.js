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
const { conn, Product, Category, Image, User } = require('./src/db.js');

// Categorias
const arrayCategories = require('./src/seeders/categories.js');
// Productos
const arrayProducts = require('./src/seeders/products.js');
// Usuarios
const arrayOfUsers = require('./src/seeders/users.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });

  // Creacion de usuarios
  User.bulkCreate(arrayOfUsers)
  .then(async() => {
    console.log('Users created')
    // Creacion de categorias
    return Category.bulkCreate(arrayCategories)
  })
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
