const { DataTypes } = require('sequelize');
// Modelo de categoria
module.exports = (sequelize) => {
	sequelize.define('category', {
		name: {
            type: DataTypes.STRING,
            allowNull: false,
		},
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
};