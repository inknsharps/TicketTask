const sequelize = require("../config/connection");
const seedUsers = require("./userData");
const seedLocations = require("./locationData");
const seedEvents = require("./eventData");
const seedTickets = require("./ticketData");

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedLocations();
    await seedEvents();
    await seedTickets();
    process.exit(0);
};

seedAll();