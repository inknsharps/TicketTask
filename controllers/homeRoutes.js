const router = require('express').Router();
const { Event, User } = require('../models');

router.get("/", async (req, res) => {
  try {
       const eventsData = await Event.findAll({
           include: [
               { 
                   model: User,
                   as: "event_creator",
                   attributes: ["username"]
               }
           ]
       });
       const events = eventsData.map((event) => event.get({ plain: true }));
       res.status(200).render("homepage", { events })
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
          as: "event_creator",
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

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
