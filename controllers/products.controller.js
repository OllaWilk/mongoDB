const Products = require('../models/products.model');

exports.getAll =  async (req, res) => {

    try {
      res.json(await Products.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {

    try {
      const count = await Products.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const prod = await Products.findOne().skip(rand);
      if(!prod) res.status(404).json({ message: 'Not found' });
      else res.json(prod);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getOne =  async (req, res) => {

    try {
      const prod = await Products.findById(req.params.id);
      if(!prod) res.status(404).json({ message: 'Not found' });
      else res.json(prod);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getPost =  async (req, res) => {

    try {
      const { name, client } = req.body;
      const newProducts = new Products({ name: name, client: client });
      await newProducts.save();
      res.json({ message: 'OK' });

    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getPut = async (req, res) => {

    const { name, client} = req.body;
    try {
      const prod = await(Products.findById(req.params.id));
      if(prod) {
        await Products.updateOne({ _id: req.params.id }, { $set: { name: name, client: client }});
        res.json({ message: 'OK' });
      }
      else res.status(404).json({message: 'Not found...'});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getDelete = async (req, res) => {

    try {
      const prod = await(Products.findById(req.params.id));
      if(prod) {
        await Products.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({message: 'Not found...'});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};