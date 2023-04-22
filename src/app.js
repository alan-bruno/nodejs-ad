const express = require('express');
const app = express();
const cors = require("cors");
//  => Rotas
const index = require('./routes/index');
const auth = require('./routes/auth.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));

app.use(cors());
app.use(index);
app.use('/api/ad', auth); //localhost:3002/api/ad/{rota}
module.exports = app;
