const { Ticket } = require("../models");

const ticketData = [
    // Gigi is going to Neil's event...
    {
        eventId: 1,
        userId: 2
    },
    // Gigi is going to Neil's event...
    {
        eventId: 3,
        userId: 1
    }
];

const seedTickets = () => Ticket.bulkCreate(ticketData);

module.exports = seedTickets;