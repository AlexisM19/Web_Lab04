const router = require("express").Router();
const itemsRoutes = require("./items.routes");


router.get("/", (req, res) => {
  res.render("home");
});

//Routage statique temporaire
router.get("/orders", (req, res) => {
  res.render("orders");
});

//Routage statique temporaire
router.get("/register", (req, res) => {
  res.render("register");
});

router.use("/items", itemsRoutes);

module.exports = router;
