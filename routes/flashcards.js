const Flashcard = require('../models/flashcards');
const express = require('express');
const router = express.Router();
// All endpoints and route handlers go here
//gets all flashcards currently not stored in collections
router.get('/', async (req, res) => {
    try {
    const flashcard = await Flashcard.find();
    return res.send(flashcard);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });
//gets specific flash card based on id
   router.get('/:id', async (req, res) => {
    try {
   
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard)
    return res.status(400).send(`The flashcard with id "${req.params.id}" does not exist.`);
    return res.send(flashcard);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });



//add a new flashcard
router.post('/', async (req, res) => {
    try{
        const flashcard = new Flashcard({
        front: req.body.front,
        back: req.body.back
        });
        
        await flashcard.save();
        
        return res.send(flashcard);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


//delete a flashcard currently not assigned to a deck
router.delete('/:id', async (req, res) => {
    try {
   
    const flashcard = await Flashcard.findByIdAndRemove(req.params.id);
    if (!flashcard)
    return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);
    return res.send(flashcard);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });
   
module.exports = router;