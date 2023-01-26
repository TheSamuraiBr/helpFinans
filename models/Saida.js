const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const User = require("./User");

//user

const Saida = db.define('Saida', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    value: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        require: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },


});
Saida.belongsTo(User);
User.hasMany(Saida);
module.exports = Saida