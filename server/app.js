const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const { PORT } = process.env;
const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.render(path.join(__dirname, 'public/index.html'));
})
app.use(routes);

app.listen(PORT || 3000, () => console.log(`Server running on port ${PORT ? PORT : 3000}`));

