const express = require('express');
const path = require('path');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res, next) => {
  // eslint-disable-next-line no-undef
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`App started on http://localhost:${PORT}/!`);
});
