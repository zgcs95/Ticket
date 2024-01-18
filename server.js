const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Ticket = require('./models/Ticket')
mongoose.connect('mongodb://localhost/my_database');
const bodyParser = require('body-parser');
// Ticket.create({
//   home: 'Man Utd',
//   away: 'Man City' ,
//   price: 250
// })
// .then(result => {
//   console.log(result);
// })
// .catch(err => {
//   console.error(err);
// });


app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/getData', async (req, res) => {
    try {
      const data = await Ticket.find({});
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
app.post('/addData', async (req, res) => {
    try {
      const newData = req.body;
      await Ticket.create(newData);
      res.status(201).json({ message: 'Data added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// New route for searching data
app.get('/searchData', async (req, res) => {
  const keyword = req.query.keyword;

  try {
    const data = await Ticket.find({
      $or: [
        { home: { $regex: keyword, $options: 'i' } },
        { away: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
