const { User } = require("../models");

const userData = [
    {
        email: "neil@email.com",
        username: "neil",
        password: "password12345",
        birthdate: "2000-01-01"
    },
    {
        email: "gigi@email.com",
        username: "gigi",
        password: "password12345",
        birthdate: "2000-01-01"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;