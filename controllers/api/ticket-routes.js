const router = require("express").Router();
const { Ticket } = require("../../models");

// Create a ticket based on the event ID and user ID
// Make SURE we grab existing event and user IDs from the request, otherwise this will probably break
router.post("/:userid/:eventid", async (req, res) => {
    try {
        const newTicket = Ticket.create({
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
        const deletedTicket = Ticket.destroy({
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