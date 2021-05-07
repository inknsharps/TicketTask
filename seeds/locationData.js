const { Location } = require("../models");

const locationData = [
    {
        eventId: 1,
        streetAddress: "123 123rd St.",
        city: "New York",
        postalCode: "10000",
        state: "NY",
        country: "USA"
    },
    {
        eventId: 2,
        streetAddress: "234 234rd St.",
        city: "New York",
        postalCode: "11111",
        state: "NY",
        country: "USA"
    },
    {
        eventId: 1,
        streetAddress: "14 John St.",
        city: "Boston",
        postalCode: "22222",
        state: "MA",
        country: "USA"
    }
];

const seedLocations = () => Location.bulkCreate(locationData);

module.exports = seedLocations;