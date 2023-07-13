const express = require('express');
const app = express();
const usersRoutes = require('./routes/webroute');

const Port = 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', usersRoutes);


app.listen(Port, () => console.log(`Server running on port ${Port}`));

