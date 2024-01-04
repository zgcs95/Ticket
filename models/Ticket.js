const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TicketSchema = new Schema({
    home: String,
    away: String,
    price: Number
});

const Ticket = mongoose.model('Ticket', TicketSchema)


module.exports = Ticket