const express = require("express")
const logs = express.Router()
const cors = require('cors')

const Log = require("../models/Log")
logs.use(cors())


logs.post('/addLog', (req, res) => {
    const logData = {
        url: req.body.url,
        status: req.body.status,
        elapsedTime: req.body.elapsedTime,
        add_by: req.body.add_by
    }
    Log.findOne({

    })
    .then(log => {
        Log.create(logData)
        .then(log => {
            res.json({status: log.url + ' е регистриран'})
        })
        .catch(err => {
            res.send('грешка: ' + err)
        })
    })
    .catch(err => {
        res.send('грешка: ' + err)
    })
})

logs.post('/getLogsInfo', (req, res) => {
    Log.findAll({
        attributes: ['id', 'url', 'status', 'elapsedTime', 'add_by'],
        where: {
            add_by: req.body.add_by
        }
    })
    .then(log => {
        if(log) {
            res.json(log)
        } else {
            res.send("Грешни данни!")
        }
    })
    .catch(err => {
        res.send('error:' + err)
    })
})

logs.post('/editLog', (req, res) => {
    Log.update(
        {
            status: req.body.status,
            elapsedTime: req.body.elapsedTime,
        },
        {
            where: { url: req.body.url }
        }
    )
    .then(log => {
        if(log) {
            res.json(log)
        } else {
            res.send("Грешни данни!")
        }
    })
    .catch(err => {
        res.send('error:' + err)
    })
})

logs.post('/getAllLogs', (req, res) => {
    Log.findAll({
        attributes: ['id', 'url', 'status', 'elapsedTime', 'add_by']
    })
    .then(log => {
        if(log) {
            res.json(log)
        } else {
            res.send("Грешни данни!")
        }
    })
    .catch(err => {
        res.send('error:' + err)
    })
})

module.exports = logs