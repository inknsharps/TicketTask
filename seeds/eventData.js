const { Event } = require("../models");

const eventData = [
    {
        eventName: "Neil's Event",
        userId: 1,
        locationId: 1,
    },
    {
        eventName: "Neil's Event Continued",
        userId: 1,
        locationId: 3
    },
    {
        eventName: "Gigi's Event",
        userId: 2,
        locationId: 2
    }
];

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;