const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'iToring_user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        profile_image: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'pr_default.png'
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        second_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        third_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mobile_number: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    }
)