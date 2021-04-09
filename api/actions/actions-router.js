// Write your "actions" router here!
const express = require("express");

const {
  validateActionID,
  validateAction,
} = require("../middleware/middleware");

const router = express.Router();

const Actions = require("./actions-model");

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});
router.get("/:id", validateActionID, (req, res) => {
  res.json(req.id);
});
router.post("/", validateAction, (req, res) => {
  Actions.insert(req.body).then((newAction) => {
    res.status(201).json(newAction);
  });
});
router.put("/:id", validateAction, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then(() => {
      return Actions.get(req.params.id);
    })
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});
router.delete("/:id", validateActionID, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    res.json(req.action);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
