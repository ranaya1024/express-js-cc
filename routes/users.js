const express = require('express');
const router = express.Router();

const userList = [
  { name: 'Cartman', id: '123' },
  { name: 'Kyle', id: '456' }
];

// Static routes at the top
router.get('/', (req, res) => {
  res.send('User List');
});

router.post('/', (req, res) => {
  res.send('Create User');
});

router.get('/new', (req, res) => {
  res.send('User New Form');
});

// Dinamyc with param routes at the bottom
// So /new won't be considered an /:id
router
  .route('/:id')
  .get((req, res) => {
    const userId = req.params.id;
    if (req.user) {
      console.info('User Found', req.user);
    }
    res.send(`Get User with ID ${userId}`);
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
