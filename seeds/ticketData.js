const { Ticket } = require("../models");

const ticketData = [
    // Gigi is going to Neil's event...
    {
        eventId: 1,
        userId: 2,
        ticketNo: "NEILSEVENT2021"
    },
    // Neil is going to Gigi's event...
    {
        eventId: 3,
        userId: 1,
        ticketNo: "GIGISEVENT2021"
    }
];

const seedTickets = () => Ticket.bulkCreate(ticketData);

module.exports = seedTickets;