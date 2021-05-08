const router = require("express").Router();
const ticketRoutes = require("./ticket-routes");
const userRoutes = require("./userRoutes");
const eventRoutes = require("./event-routes");

router.use("/users", userRoutes);
router.use("/tickets", ticketRoutes);
router.use("/events", eventRoutes);

module.exports = router;