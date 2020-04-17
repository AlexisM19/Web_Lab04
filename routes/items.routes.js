const router = require("express").Router();
const Item = require("../database/models/item.model");

router.get("/", (req, res, error) => {
  Item.find()
    .exec()
    .then((items) => {
      console.log(items);
      res.render("items", { items });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/", (req, res, next) => {
  const item = new Item(req.body);
  item
    .save()
    .then((newItem) => {
      res.render("includes/item", { item: newItem });
    })
    .catch((error) => {
      next(error);
    });
});

router.patch("/:id", (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((item) => res.send(item))
    .catch((error) => next(error));
});

router.delete("/:id", (req, res, next) => {
  Item.findByIdAndDelete(req.params.id)
    .then((item) => res.send(item))
    .catch((error) => next(error));
});

module.exports = router;
