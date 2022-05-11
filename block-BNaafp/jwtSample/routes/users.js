var express = require('express');
const { handle } = require('express/lib/application');
var router = express.Router();

var User = require('../model/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({ message: 'User Information' });
});

// Registration handle

router.post('/register', async (req, res, next) => {
  try {
    var user = await User.create(req.body);
    console.log(user);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

// Login Handler

router.post('/login', async (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    return res.statusCode(400).json({ error: 'Email/password required' });
  }
  try {
    var user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'email is not registered' });
    }
    var result = await user.verifyPassword(password);
    if (!result) {
      return res.statusCode(400).json({ error: 'Invalid Password' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
