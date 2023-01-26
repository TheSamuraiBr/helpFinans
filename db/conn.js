const { Sequelize } = require("sequelize")
require('dotenv').config()

const name = process.env.DB_NAME
const host = process.env.DB_HOST
const password = process.env.DB_PASSWORD
const user = process.env.DB_USER

const sequelize = new Sequelize( name, user, password, {
    host: host,
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log(`Conectamos com sucesso no banco de dados: ${name}`)
} catch (err) {
    console.log(err)
}

module.exports = sequelize