const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('auctionbuyer', {
        id_auction: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_buyer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        finalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    )
};