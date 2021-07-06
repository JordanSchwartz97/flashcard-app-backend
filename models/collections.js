const mongoose = require('mongoose');
const Joi = require('joi');
const {flashcardSchema} = require ('./flashcards');

const cardDeckSchema = new mongoose.Schema({
    name: String,
    description: String,
    cardDeck: { type: [flashcardSchema]}
});

const Deck = mongoose.model('Deck', cardDeckSchema);

function validateDeck(deck){
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema.validate(deck);
}
exports.Deck = Deck;
exports.validate = validateDeck;