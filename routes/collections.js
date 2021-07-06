const { Deck } = require('../models/collections');
const { Flashcard } = require('../models/flashcards');
const express = require('express');
const router = express.Router();

//Create new deck
router.post('/', async (req, res) => {
    try{
        const deck = new Deck({
        name: req.body.name,
        description: req.body.description
        });
        
        await deck.save();
        
        return res.send(deck);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});
//creates new flashcard to be added to specified deck
 router.post('/cardDeck/:deckId', async(req, res) => {
     try{
         const flashcard = new Flashcard({
             front: req.body.front,
             back: req.body.back
         })
         const deck = await Deck.findById(req.params.deckId);
         if (!deck) return res.status(400).send(`The deck with id"${req.params.deckId}" does not exist.`);

         deck.cardDeck.push(flashcard);

         await deck.save();
         return res.send(deck.cardDeck);
     } catch (ex) {
         return res.status(500).send(`Internal Server Error: ${ex}`);
     }
 });
   
//Add a currently existing flashcard to a currently existing deck
router.post('/:deckId/cardDeck/:flashcardId', async (req, res) =>{
    try{
        const deck = await Deck.findById(req.params.id);
        if (!deck) return res.status(400).send(`The deck with id "${req.params.deckId}" does not exist.`);

        if (!flashcard) return res.status(400).send(`The flashcard with id "${req.params.flashcardId}" does not exist.`);

        cardDeck.push(flashcard);
        await deck.save();
        return res.send(deck.cardDeck);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//Gets all card decks
router.get('/cardDeck', async (req, res) => {
    try {
    const deck = await Deck.find();
    return res.send(deck);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });
//Gets content of specific card deck
   router.get('/cardDeck/:id', async (req, res) => {
    try {
   
    const deck = await Deck.findById(req.params.id);
    if (!deck)
    return res.status(400).send(`The deck with id "${req.params.id}" does not exist.`);
    return res.send(deck);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });

//gets card deck and responds with collection
   router.get('/id', async (req, res) => {
    try {
    const deck = await Deck.find();
    return res.send(deck);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });
//gets specific card in specific collection
router.get('/cardDeck/:deckId/:flashcardId', async (req, res) => {
    try {
        
    const deck = await Deck.findById(req.params.deckId)
    if (!deck){
        return res.status(400).send(`The deck with id "${req.params.id}" does not exist.`);
    }
    
    const flashcard = deck.cardDeck.id(req.params.flashcardId);
    if(!flashcard) {
        return res.status(400).send(`The flashcard with id "${req.params.id}" does not exist.`);
    }
    return res.send(flashcard);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });
//Updates flash card within the deck
router.put('/cardDeck/:deckId/:flashcardId', async (req, res) =>{
    try{
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error);

        const deck = await Deck.findById(req.params.deckId);
        if (!deck) return res.status(400).send(`The deck with id "${req.params.deckId}" does not exist.`);

        const flashcard = deck.cardDeck.id(req.params.flashcardId);
        if (!flashcard) return res.status(400).send(`The flashcard with id "${req.params.flashcardId}" does not exist in the deck.`);

        cardDeck.front = req.body.front;
        cardDeck.back = req.body.back;

        await deck.save();
        return res.send(flashcard);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});
//deletes flashcard within specific deck
router.delete('/cardDeck/:deckId/:flashcardId', async(req, res) =>{
    try {
        const deck = await Deck.findById(req.params.deckId);
        if (!deck) return res.status(400).send(`The deck with id "${req.params.deckId}" does not exist.`);

        let flashcard = deck.cardDeck.id(req.params.flashcardId);
        if (!flashcard) return res.stabbtus(400).send (`The flashcard with id "${req.params.flashcardId}" does not exist.`);

        flashcard = await flashcard.remove();

        await deck.save();
        return res.send(flashcard);
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});
router.delete('/cardDeck/:deckId', async(req,res) =>{
    const deck = await Deck.findByIdAndRemove(req.params.deckId);

    if (!deck) return res.status(400).send(`The deck with id "${req.params.deckId}" does not exist.`);

    return res.send(deck);
    
   });
   

module.exports = router;


