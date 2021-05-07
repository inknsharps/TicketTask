const router = require('express').Router();
const { Event, User } = require('../models');

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

router.get('/:id', async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const event = eventData.get({ plain: true });

    res.render('event', {
      ...event,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
