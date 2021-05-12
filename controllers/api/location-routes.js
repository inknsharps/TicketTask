const router = require('express').Router();
const { Location, Event } = require('../../models');
const { Op } = require("sequelize");

// GET all locations
router.get('/', async (req, res) => {
  try {
    const locationData = await Location.findAll();
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single location
router.get('id/:id', async (req, res) => {
    try {
      const locationData = await Location.findByPk(req.params.id, {
        // JOIN with travellers, using the Trip through table
        include: [
            { 
                model: Event, 
                as: 'location_events' 
            }
        ]
      });
  
      if (!locationData) {
        res.status(404).json({ message: 'No location found with this id!' });
        return;
      }
  
      res.status(200).json(locationData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// GET a single location and its associated events
// Fuzzy search that should be formatted like so:
// /search?city=newyork&state=ny&country=usa
router.get("/search", async (req, res) => {
  try {
    const locationsEvents = await Location.findAll({
      where: {
        [Op.or] : [
          { 
            city: { 
              [Op.like]: `%${req.query.city}%` 
            } 
          },
          {
            state: {
              [Op.like]: `%${req.query.state}%`
            }
          },
          {
            country: {
              [Op.like]: `%${req.query.country}%`
            }
          }
        ]
      },
      include: {
        model: Event,
        as: "location_events"
      }
    });
    // res.status(200).render("events", { locationsEvents });
    res.status(200).json(locationsEvents);
  } catch (err) {
    res.status(400).json(err);
  }
});

// CREATE a location
router.post('/', async (req, res) => {
    try {
      const locationData = await Location.create({
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        postalCode: req.body.postalCode,
        state: req.body.state,
        country: req.body.country
      });
      res.status(200).json(locationData);
    } catch (err) {
      res.status(400).json(err);
    }
});
  
module.exports = router;