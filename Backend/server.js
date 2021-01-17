var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
var port = process.env.PORT || 5000
const twilio = require("twilio")
const request = require("request")
const axios = require("axios")

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

var Users = require('./routes/Users')
var Logs = require('./routes/Logs')

app.use('/users', Users)
app.use('/logs', Logs)

//twilio requirements
const accoundSid = 'AC665614909f49df682f38a1352111d909'
const authToken = '3bbe1884af4cff1eb0888da761faddfe'
const client = new twilio(accoundSid, authToken)

app.post('/send-sms', (req, res) => {
    const { recipient } = req.body;
    client.verify.services('VA8a54ba909d3b4557b5a400a42bc18d2a')
    .verifications
    .create({to: recipient, channel: 'sms'})
    .then(verification => console.log(verification.status));
})

app.post('/check-sms', (req, res) => {
    const { recipient, verificationCode } = req.body
    client.verify.services('VA8a54ba909d3b4557b5a400a42bc18d2a')
      .verificationChecks
      .create({to: recipient, code: verificationCode})
      .then(response => {
        console.log(response.status)
        const st = response.status
        res.send(st)
        });
})

app.post('/checkUrl', (req, res) => {
    const { url } = req.body
    request.get({url: `${url}`, time: true}, function (error, response, body) {
        if(!error) {
            if(response.statusCode === 200 || response.statusCode === 201 || response.statusCode === 202) {
                console.log(url + ' is up!!' + response.elapsedTime);
                res.send({status: response.statusCode, elapsedTime: response.elapsedTime / 1000})
                return false;
            }
            else if(response.statusCode === 301 || response.statusCode === 302){
                console.log(url + ' is redirecting us!!');
                return false;
            }
            else if(response.statusCode === 401){
                console.log("you are unauthorized to " + url);
                return false;
            } else {
                console.log(url + ' is down!!');
            }
        }
    })
})

app.listen(port, async () => {
    console.log('\x1b[36m', "iToring сървъра е стартиран на порт: " + port)

    setInterval(() => {
        axios.post('http://172.16.1.137:3000/logs/getAllLogs')
        .then(res => {
            res.data.map(rs => 
                axios.post('http://172.16.1.137:3000/checkUrl', {
                    url: rs.url
                })
                .then(res => {
                    console.log(res.data)
                    axios.post('http://172.16.1.137:3000/logs/editLog', {
                        url: res.url,
                        status: res.statusCode,
                        elapsedTime: res.elapsedTime
                    })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            )
        })
        .catch(err => {
            console.log(err)
        })
    }, 60000)
})
