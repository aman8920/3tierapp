const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const Task = require('./models/task');
const tasks = require('./routes/tasks');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// DB test endpoint
app.get('/dbtest', async (req, res) => {
  try {
    const [result] = await sequelize.query('SELECT NOW()');
    res.json({ now: result[0].now || result[0].NOW });
  } catch (error) {
    console.error('DB test failed:', error);
    res.status(500).json({ error: 'Database not reachable' });
  }
});

app.use('/api/tasks', tasks);

const port = process.env.PORT || 3500;
app.listen(port, async () => {
  try {
    await sequelize.sync();
    console.log('DB connected & listening on port ' + port);
  } catch (err) {
    console.error('Failed to connect to DB:', err);
  }
});
