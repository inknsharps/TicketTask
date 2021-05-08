const { Event } = require("../models");

const eventData = [
    {
        eventName: "Neil's Event",
        eventDate: "2021-06-15",
        eventPrice: 25,
        userId: 1,
        locationId: 1,
    },
    {
        eventName: "Neil's Event Continued",
        eventDate: "2021-06-16",
        eventPrice: 25,
        userId: 1,
        locationId: 3
    },
    {
        eventName: "Gigi's Event",
        eventDate: "2021-07-15",
        eventPrice: 30,
        userId: 2,
        locationId: 2
    }
];

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;