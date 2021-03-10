const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

//CAMBIO REALIZADO POR ANDRES
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("user", {
		username: {
			type: DataTypes.STRING,
            allowNull: false,
            unique : true,
        },
        name: {
			type: DataTypes.STRING,
			allowNull: false,
        },
        lastname: {
			type: DataTypes.STRING,
			allowNull: false,
        },    
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate : {
                isEmail : true
            }
        },    
        password:{
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                args: ["(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+"],
                msg: "La contraseña debe contener al menos una mayúscula, minúscula, número y carácter especial"
                }
                }
        },
        birth:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        type:{
            type:DataTypes.STRING,
            allowNull:false,
        }
        

	});
};