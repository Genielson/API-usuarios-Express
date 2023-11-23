const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const { getSecret } = require('./secrets');
const usersRoute = require('./routes/users');

mongoose.Promise = global.Promise;
mongoose.connect(getSecret('dbUri')).then(
  () => {
    console.log('Conectado ao MONGODB ');
  },
  (err) => console.log('ERRO AO CONECTAR AO MONGODB ', err)
);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users', usersRoute);

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});

module.exports = { app };