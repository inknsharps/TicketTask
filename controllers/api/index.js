const router = require("express").Router();
const ticketRoutes = require("./ticket-routes");
const userRoutes = require("./userRoutes");
const eventRoutes = require("./event-routes");
const locationRoutes = require("./location-routes");

router.use("/users", userRoutes);
router.use("/tickets", ticketRoutes);
router.use("/events", eventRoutes);
router.use("/locations", locationRoutes);

module.exports = router;