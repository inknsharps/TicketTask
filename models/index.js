const User = require("./User");
const Event = require("./Event");
const Location = require("./Location");

User.hasMany(Event, {
    foreignKey: "userId",
    as: "event_creator"
});

Event.belongsTo(User, {
    foreignKey: "userId",
    as: "event_creator"
});

Event.hasMany(Location, {
    foreignKey: "eventId",
    as: "event_location"
});

Location.belongsToMany(Event, {
    foreignKey: "eventId",
    as: "event_location"
});

Location.hasMany(Event, {
    foreignKey: "locationId",
    as: "location_of_event"
});

Event.belongsToMany(Location, {
    foreignKey: "locationId",
    as: "location_of_event"
});

module.exports = { User, Event, Location };