const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const searchRoutes = require("./searchRoutes");
// const profileRoutes = require("./profileRoutes")

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/search", searchRoutes);

module.exports = router;