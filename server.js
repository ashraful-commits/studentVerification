const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

const pageRouter = require('./routes/pageRouter');
const expressLayouts = require('express-ejs-layouts');
//============================================================> config dotenv
dotenv.config();

//===========================================================> port init

const port = process.env.PORT || 3000;

//==========================================================> init epxress

const app = express();

//==========================================================> app use

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//==========================================================> ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/app');

//==========================================================> app use
app.use(pageRouter);
app.use(express.static('public'));

//==========================================================> create server

app.listen(port, () => {
  console.log(`server is running port ${port}`.bgMagenta);
});
