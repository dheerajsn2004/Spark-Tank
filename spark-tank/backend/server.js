const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/investment', { useNewUrlParser: true, useUnifiedTopology: true });

// Define company schema
const companySchema = new mongoose.Schema({
  name: String,
  value: Number,
  sharesAvailable: Number,
});

const Company = mongoose.model('Company', companySchema);

// API to get companies
app.get('/companies', async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

// API to update company after purchase
app.post('/buy-shares', async (req, res) => {
  const { companyName, sharesToBuy, remainingPurse } = req.body;

  const company = await Company.findOne({ name: companyName });
  if (!company) return res.status(404).send('Company not found');

  const totalCost = company.value * sharesToBuy;
  if (totalCost > remainingPurse) return res.status(400).send('Insufficient funds');

  company.sharesAvailable -= sharesToBuy;
  company.value += company.value * 0.05; // Increase value by 5%

  await company.save();
  res.status(200).send('Purchase successful');
});

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
