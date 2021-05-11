const router = require("express").Router();
const { Event, User, Ticket, Location } = require("../models");

// This route gets all the events that the user has made, and all the events that the user is attending
router.get("/:id", async (req, res) => {
    try {
        const rawUserEvents = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Event,
                    as: "event_creator",
                    include: {
                        model: Location,
                        as: "event_location"
                    }
                },
                {
                    model: Event,
                    through: Ticket,
                    as: "event_attendees",
                    include: {
                        model: Location,
                        as: "event_location"
                    }
                },
            ]
        });
        const userEvents = rawUserEvents.get({ plain: true });
        console.log(userEvents);
        res.status(200).json(userEvents);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;