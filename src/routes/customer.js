let express = require('express');
let CustomerModel = require('../models/customer.model');
let router = express.Router();

//Create a new customer --> post method
router.post('/customer', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    // let user = {
    //     name: "Mukul",
    //     email: "mukuljain0295@gmail.com"
    // }   ---> incoming object
    let model = new CustomerModel(req.body);
    model.save()
        .then(doc => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc);
            }

            res.status(201).send(doc);
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

//Get a customer
router.get('/customer', (req, res) => {
    if(!req.query.email) {
        res.status(400).send('query param is missing');
    }
    CustomerModel.findOne({
        name: req.query.email
    })
    .then(doc => {
        res.status(201).send(doc);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

//Update existing customer --> put method
router.put('/customer', (req,res) => {
    if(!req.query.email) {
        res.status(400).send('query param is missing');
    }
    CustomerModel.findOneAndUpdate({
        email: req.query.email
    }, req.body, {
        new: true
    })
    .then(doc => {
        res.status(201).send(doc);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

//Delete a particular customer --> delet method
router.delete('/customer', (req, res) => {
    if(!req.query.email) {
        res.status(400).send('query param is missing');
    }
    CustomerModel.findOneAndDelete({
        email: req.query.email
    })
    .then(doc => {
        res.status(201).send(doc);
    })
    .catch(doc => {
        res.status(500).send(error);
    })
})

module.exports = router;