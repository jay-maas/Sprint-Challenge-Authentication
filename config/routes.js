const axios = require('axios');
const bcrypt = require('bcryptjs')
const Users = require('../models/userModels.js')
const generateToken = require('../auth/generateToken.js')

const { authenticate } = require('../auth/authenticate');


module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  let newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 10);
  newUser.password = hash;

  Users.add(newUser)
    .then(user => {
      console.log("test")
      res.status(201).json(user);
    })
    .catch(error => {
      console.log("error", error)
      res.status(500).json(error);
    });
}

function login(req, res) {
  let { username, password } = req.body;
  
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
