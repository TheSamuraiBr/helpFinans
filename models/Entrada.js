const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const User = require("../models/User");

//user

const Entrada = db.define('Entrada', {
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
Entrada.belongsTo(User);
User.hasMany(Entrada);
module.exports = Entrada