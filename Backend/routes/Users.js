const express = require("express")
const iToring_users = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
// const sequelize = require("sequelize")
// const Op = sequelize.Op

const User = require("../models/User")
iToring_users.use(cors())

process.env.SECRET_KEY = 'e-cantora'

iToring_users.post('/register', (req, res) => {
    const userData = {
        profile_image: req.body.profile_image,
        first_name: req.body.first_name,
        second_name: req.body.second_name,
        third_name: req.body.third_name,
        username: req.body.username,
        email: req.body.email,
        mobile_number: req.body.mobile_number,
        password: req.body.password,
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(iToring_user => {
        if(!iToring_user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                User.create(userData)
                .then(iToring_user => {
                    res.json({status: iToring_user.email + ' е регистриран'})
                })
                .catch(err => {
                    res.send('грешка: ' + err)
                })
            })
        } else {
            res.json({error: "Такъв потребител вече съществува!"})
        }
    })
    .catch(err => {
        res.send('грешка: ' + err)
    })
})

iToring_users.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        }
    })
    .then(iToring_user => {
        if(iToring_user) {
            if(bcrypt.compareSync(req.body.password, iToring_user.password)) {
                let token = jwt.sign(iToring_user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            } 
            else {
                res.status(400).json({error: "Грешни данни!"})
            }
        } else {
            res.status(400).json({error: "Потребител с този имейл не съществува!"})
        }
    })
    .catch(err => {
        res.status(400).json({ error: err  })
    })
})

iToring_users.post('/updateUserInfo', (req, res) => {
    User.update(
    {
        profile_image: req.body.profile_image,
        first_name: req.body.first_name,
        second_name: req.body.second_name,
        third_name: req.body.third_name,
        username: req.body.username,
        email: req.body.email,
        mobile_number: req.body.mobile_number,
        password: req.body.password,
    },
    {
        where: {
            id: req.body.id
        }
    })
    .then(iToring_user => {
        res.json(iToring_user)
    })
    .catch(err => {
        res.json(err)
    })
})

iToring_users.post('/getuserinfo', (req, res) => {
    User.findAll({
        attributes: ['id', 'profile_image', 'first_name', 'second_name', 'third_name', 'username', 'email', 'mobile_number'],
        where: {
            email: req.body.email
        }
    })
    .then(iToring_user => {
        if(iToring_user) {
            res.json(iToring_user)
        } else {
            res.send("Грешни данни!")
        }
    })
    .catch(err => {
        res.send('error:' + err)
    })
})

module.exports = iToring_users