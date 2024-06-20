const express = require('express');
const urlRoute = require('./routes/url');
const { connectToMongoDB } = require('./db');
const URL = require('./models/urls');
const app = express();
const PORT = 8001;

app.use(express.json());

connectToMongoDB('mongodb+srv://sudhiramruskar:kXIxWIJUk4nad9eN@cluster0.huzuuy4.mongodb.net/shorturl')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visithistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true } 
  );

  if (!entry) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
