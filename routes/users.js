const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

router.use(logger);
// logger for an specific route
//router.get('/', logger, ....)

const userList = [
  { name: 'Cartman', id: '123' },
  { name: 'Kyle', id: '456' }
];

// Static routes at the top
router.get('/', (req, res) => {
  console.log('Query url parameter: ?name=', req.query.name);
  res.send('**User List Path**');
});

router.post('/', (req, res) => {
  const firstName = req.body.firstName;

  if (firstName) {
    userList.push({ name: firstName, id: firstName });
    res.redirect(`/users/${firstName}`);
  } else {
    d;
    console.error('Error');
    res.render('users/new', { firstName });
  }
  res.send('Create User');
});

router.get('/new', (req, res) => {
  res.render('users/new', { firstName: 'Ruben' });
});

// Dinamyc with param routes at the bottom
// So /new won't be considered an /:id
router
  .route('/:id')
  .get((req, res) => {
    const userId = req.params.id;
    if (req.user) {
      res.send(`Get User with ID ${userId}`);
    }
  })
  .put((req, res) => {
    const userId = req.params.id;
    res.send(`Update User with ID ${userId}`);
  })
  .delete((req, res) => {
    const userId = req.params.id;
    res.send(`Delete User with ID ${userId}`);
  });

// Get a user in one single place to be available in all router routes for users
router.param('id', (req, res, next, id) => {
  req.user = userList.find((user) => user.id === id);
  next();
});

module.exports = router;
