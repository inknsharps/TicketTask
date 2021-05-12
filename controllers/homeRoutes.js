const router = require('express').Router();
const { Event, User, Location } = require('../models');

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
       res.status(200).render("homepage", { 
         logged_in: req.session.logged_in,
         events 
        })
  } catch (err) {
       res.status(500).json(err);
  } 
});

// Events page
router.get("/events", async (req, res) => {
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
       res.status(200).render("events", { 
        logged_in: req.session.logged_in,
        events 
      })
  } catch (err) {
       res.status(500).json(err);
  } 
});

// Get a event by idea and display the information on the page
router.get('events/:id', async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "event_creator",
          attributes: ['username'],
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
