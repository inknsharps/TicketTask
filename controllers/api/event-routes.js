const router = require("express").Router();
const { Event } = require("../../models");

// Get all events, will need to adjust the render page once that is complete.
router.get("/", async (req, res) => {
   try {
        const eventsData = await Event.findAll({
            include: [
                { 
                    model: User,
                    attributes: ["username"]
                }
            ]
        });
        const events = eventsData.map((event) => event.get({ plain: true }));
        res.status(200).render("events", { events })
   } catch (err) {
        res.status(500).json(err);
   } 
});

// Get event by event ID
router.get("/:id", async (req, res) => {
    try {
        const eventData = await Event.findByPk(req.params.id, {
            include: { 
                model: User,
                attributes: ["username"]
            }
        });
        const event = eventData.get({ plain: true });
        res.status(200).render("event", { event });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Make a new event
// Make sure to include the information needed in the req.body
router.post("/", async (req, res) => {
    try {
        const newEvent = await Event.create({
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            eventPrice: req.body.eventPrice,
            userId: req.body.userId,
            locationId: req.body.locationId,
        });
        res.status(200).json(newEvent);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update an existing event, by its ID
router.put("/:id", async (req, res) => {
    try {
        const updatedEvent = await Event.update({
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            eventPrice: req.body.eventPrice,
            locationId: req.body.locationId,
        },
        {
            where: { id: req.params.id }
        });
        res.status(200).json(updatedEvent);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete an existing event, by its ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedEvent = await Event.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json(deletedEvent);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;