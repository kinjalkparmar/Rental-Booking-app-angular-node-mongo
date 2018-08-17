const express = require('express');
const router = express.Router();
const Rentals = require('../models/rental');

const userctrl = require('../controllers/user')

router.get('/secret', userctrl.authMiddleware, function(req, res){
    res.json({"secret": true})
})



router.get('', function(req, res){
   Rentals.find({}, function(err, foundRentals){
        res.json(foundRentals);
   });
})

router.get('/:id', function(req, res){
const rentalId = req.params.id;

    Rentals.findById(rentalId, function(err, foundRental){
        if(err){
            res.status(422).send({errors: [{title: 'rental Error', details: 'Could not find Rental!'}]})
        }
         res.json(foundRental);
    })
 })

module.exports = router;