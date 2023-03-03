const express = require('express');
const app = express();

// Allows to send parameters from the routers to the views
app.set('view engine', 'ejs');
// Allows us to render static files
app.use(express.static('public'));
// Allows to access information coming from forms
app.use(express.urlencoded({ extended: true }));
// Parse json in the body
app.use(express.json());

const userRouter = require('./routes/users');

app.use('/users', userRouter);

app.listen(3000);
