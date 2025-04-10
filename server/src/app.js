const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const express = require('express');
const serverConfig = require('../src/config/serverConfig');
const indexRouter = require('../src/routes/index.routes');

const app = express();
const staticFolder = path.join(__dirname, 'public', 'dist');

serverConfig(app);

const PORT = process.env.PORT || 3000;

app.use('/api', indexRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(staticFolder, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
