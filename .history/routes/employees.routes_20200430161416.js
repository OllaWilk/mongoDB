const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/employees', (req, res) => {
  req.db.collection('departments').find().toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data);
  });
});

router.get('/employees/random', (req, res) => {
  res.json(db.employees[Math.floor(Math.random() * db.length)]);
});

router.get('/employees/:id', (req, res) => {
  res.json(db.employees.find(item => item.id == req.params.id));
});

router.post('/employees', (req, res) => {
  const { firstName, lastName } = req.body;
  db.employees.push({ id: 3, firstName, lastName })
  res.json({ message: 'OK' });
});

router.put('/employees/:id', (req, res) => {
  const { firstName, lastName } = req.body;
  db = db.employees.map(item => (item.id == req.params.id) ? { ...item, firstName, lastName } : item );
  res.json({ message: 'OK' });
});

router.delete('/employees/:id', (req, res) => {
  db = db.employees.filter(item => item.id != req.params.id)
  res.json({ message: 'OK' });
});

module.exports = router;
