const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('Root route');
  res.send(':)');
});

app.listen(3000);
