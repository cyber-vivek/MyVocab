const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const wordRoutes = require('./routes/wordRoutes');
const authRoutes = require('./routes/AuthRoutes');
const authenticateUser = require('./middlewares/authMiddleware');
const cron = require('node-cron');
const { sendDailyEmailToEachUser } = require('./utils/dailyWordEmailer');
const { DAILY_WORD_CRON_TIME } = require('./utils/constants');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
})
app.use('/auth', authRoutes);

app.use(authenticateUser);
app.use('/word', wordRoutes);

cron.schedule(DAILY_WORD_CRON_TIME, sendDailyEmailToEachUser);