const { DataTypes } = require('sequelize');
// Modelo de categoria
module.exports = (sequelize) => {
	sequelize.define('category', {
		name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
		},
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    },{timestamps: false})

};