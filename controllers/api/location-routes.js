const router = require('express').Router();
const { Location, Event } = require('../../models');

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
router.get('/:id', async (req, res) => {
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