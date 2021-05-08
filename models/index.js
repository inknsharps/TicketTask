const User = require("./User");
const Event = require("./Event");
const Location = require("./Location");
const Ticket = require("./Ticket");

User.hasMany(Event, {
    foreignKey: "userId",
    as: "event_creator"
});

Event.belongsTo(User, {
    foreignKey: "userId",
    as: "event_creator"
});

User.belongsToMany(Event, {
    through: { 
        model: Ticket,
    },
    as: "event_attendees"
});

Event.belongsToMany(User, {
    through: {
        model: Ticket,
    },
    as: "ticketholders"
});

Event.belongsTo(Location, {
    foreignKey: "locationId",
    as: "event_location"
});

Location.hasMany(Event, {
    foreignKey: "locationId",
    as: "location_event"
});

module.exports = { User, Event, Ticket, Location };