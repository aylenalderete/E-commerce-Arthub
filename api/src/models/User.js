const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profilepic: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: ["(?=.*[0-9])(?=.*[0-9])"],
                    msg: "Password must contain at least 1 uppercase alphabetical character and 1 numeric character"
                }
            }
        },
        birth: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM(['artist', 'user', 'admin']),
            allowNull: false,
        },
        state: {
            type: DataTypes.ENUM(['approved', 'rejected', 'pending', 'deleted']),
            allowNull: false
        }
    }, {
        timestamps: false
    });
};