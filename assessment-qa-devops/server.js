const express = require('express')
//const { Server } = require("http");
const path = require('path')
const app = express()
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')
app.use(express.json());

app.use(express.static("public"));


// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public/index.html"));
// });


// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '6ce517c12fbd480b8de442c8f79890ad',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get("/styles", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.css"));
});
app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.js"));
});


app.get('/api/player', (req, res) => {//app.get('/api/player', (req, res) => {
    try {
        rollbar.info('Someone is wants to play this game YO!')
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})

app.get('/api/robots', (req, res) => {
    try {
        rollbar.info('Is this working? This is a bug.')
        res.status(200).send(bots)
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        rollbar.info('Oh look! Someone got choices!')
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({choices, compDuo})
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            rollbar.info('It is about to go down!!')
            res.status(200).send('You lost!')
        } else {
            playerRecord.losses++
            res.status(200).send('You won!')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        res.sendStatus(400)
    }
})





//added endpoint//

//app.use('/index.js', express.static(path.join(__dirname, '../public/index')));

//app.use('/server.js', express.static(path.join(__dirname, 'server.js')));

//app.use(express.static(__dirname + '../public'));


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})