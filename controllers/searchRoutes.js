const router = require('express').Router();
const { Location, Event } = require('../models');
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
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
        const locationData = locationsEvents.map(location => location.get({plain: true}));
        console.log(locationData);
        res.status(200).render("search", { locationData });
      } catch (err) {
        res.status(400).json(err);
      }
});

module.exports = router;