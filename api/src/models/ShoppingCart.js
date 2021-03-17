const { DataTypes } = require("sequelize");
// Modelo de product (Matias)
module.exports = (sequelize) => {
    sequelize.define(
        "shoppingcart",
        {
            id_order: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            total_price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        { timestamps: false }
    );
};