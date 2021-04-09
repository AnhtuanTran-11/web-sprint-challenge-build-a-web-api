// Write your "projects" router here!
const express = require("express");

const {
  validateProjectID,
  validateProject,
} = require("../middleware/middleware");

const router = express.Router();

const Projects = require("./projects-model");

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});
router.get("/:id", validateProjectID, (req, res) => {
  res.json(req.id);
});

router.post("/", validateProject, (req, res) => {
  Projects.insert(req.body).then((newProject) => {
    res.status(201).json(newProject);
  });
});

router.put("/:id", validateProject, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then(() => {
      return Projects.get(req.params.id);
    })
    .then((project) => {
      res.json(project);
    })
    .catch(next);
});

router.delete("/:id", validateProjectID, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id);
    res.json(req.project);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", async (req, res) => {
  try {
    const project = await Projects.get(req.params.id);
    if (!project) {
      res.send([]);
    } else {
      const actions = await Projects.getProjectActions(req.params.id);
      res.json(actions);
    }
  } catch (err) {
    res.status(500).json({
      message: "The actions could not be retrieved",
    });
  }
});

module.exports = router;
