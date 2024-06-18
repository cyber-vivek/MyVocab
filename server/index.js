const express = require('express');

const app = express();
require('dotenv').config();


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})
app.get('/', (req, res) => {
  res.json({data: 'Hello World!'});
});