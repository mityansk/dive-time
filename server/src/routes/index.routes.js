const router = require("express").Router();
const authRoutes = require("./auth.routes");
const diveLocationRoutes = require("./diveLocation.routes");
const formatResponse = require("../utils/formatResponse");
const tourRoutes = require("./tour.routes");

router.use("/auth", authRoutes);
router.use("/locations", diveLocationRoutes);
router.use("/tour", tourRoutes);

router.use("*", (req, res) => {
  res.status(404).json(formatResponse(404, "Not Found!"));
});

module.exports = router;
