const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const { PORT } = process.env;
const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(routes);

app.listen(PORT || 3000, () => console.log(`Server running on port ${PORT ? PORT : 3000}`));

