const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'log',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        url: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        elapsedTime: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        add_by: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    }
)