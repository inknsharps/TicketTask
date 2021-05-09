const router = require("express").Router();
const { User, Event, Location, Ticket } = require("../../models");
// nanoid is used to generate the ticket number
const { nanoid } = require("nanoid");

require("dotenv").config();
const { createEmail } = require("../../utils/emailer");

router.get("/email/:userid/:eventid", async (req, res) => {
    try {
        const rawTicketData = await Ticket.findOne(
            {
                where: {
                    userId: req.params.userid,
                    eventId: req.params.eventid
                },
                include: { all: true } // Probably change this to limit info later for security reasons
            },
        );
        const ticketData = await rawTicketData.get({ plain: true });
        createEmail(ticketData.event.eventName, ticketData.event.eventName);
        res.status(200).json(ticketData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Create a ticket based on the event ID and user ID
// Make SURE we grab existing event and user IDs from the request, otherwise this will probably break
router.post("/:userid/:eventid", async (req, res) => {
    try {
        const newTicket = await Ticket.create({
            ticketNo: nanoid(),
            userId: req.params.userid,
            eventId: req.params.eventid
        });
        res.status(200).json(newTicket);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a ticket based on the event ID and user ID
router.delete("/:userid/:eventid", async (req, res) => {
    try {
        const deletedTicket = await Ticket.destroy({
            where: { 
                userId: req.params.userid,
                eventId: req.params.eventid
            }
        });
        res.status(200).json(deletedTicket);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;