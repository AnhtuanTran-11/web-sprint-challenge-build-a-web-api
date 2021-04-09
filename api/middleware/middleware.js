const Action = require("../actions/actions-model");
const Project = require("../projects/projects-model");

async function validateActionID(req, res, next) {
  // DO YOUR MAGIC
  try {
    const action = await Action.get(req.params.id);
    if (!action) {
      next({ status: 404, message: "Action not found" });
    } else {
      req.id = action;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "Problem finding action",
    });
  }
}
async function validateProjectID(req, res, next) {
  // DO YOUR MAGIC
  try {
    const project = await Project.get(req.params.id);
    if (!project) {
      next({ status: 404, message: "Project not found" });
    } else {
      req.id = project;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "Problem finding project",
    });
  }
}

function validateAction(req, res, next) {
  // DO YOUR MAGIC
  const { project_id, notes } = req.body;
  if (!project_id || !notes) {
    res.status(400).json({
      message: "Missing required fields",
    });
  } else {
    next();
  }
}

function validateProject(req, res, next) {
  // DO YOUR MAGIC
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({
      message: "Missing required fields",
    });
  } else {
    next();
  }
}

module.exports = {
  validateActionID,
  validateProjectID,
  validateAction,
  validateProject,
};
