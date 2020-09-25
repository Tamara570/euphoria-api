const express = require('express')

const registerRouter = express.Router()
const bodyParser = express.json()


registerRouter.post('/user', (req, res) => {
    const { fullname, username, password } = req.body;

    //missing name
    if (!fullname) {
        return res
        .status(400)
        .send('Full Name Required')
    }

    //missing username
    if (!username) {
        return res
        .status(400)
        .send('Username Required')
    }

    //missing password
    if (!password) {
        return res
        .status(400)
        .send('Password Required')
    }

    //username length
    if (username.length < 6 || username.length > 20) {
        return res
        .status(400)
        .send('Username must be between 6 and 20 characters');
    }

    //password length
    if (password.length < 8 || password.length > 36) {
        return res
        .status(400)
        .send('Password must be between 8 and 36 characters');
    }

    res.send('All validation passed')
})
  
module.exports = registerRouter