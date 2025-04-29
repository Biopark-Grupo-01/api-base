import Task from "../models/taskModel.js";
import publish from "../services/publish.js";

export const getActiveTasks = async (req, res, next) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Get active tasks'
    #swagger.description = 'Get active tasks'
    #swagger.responses[200]
  */
  try {
    const tasks = await Task.find({ done: false }, "_id description");

    res.OK(tasks);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Create task'
    #swagger.description = 'Create task'
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: "#/definitions/Task",
          },
        },
      },
    }
    #swagger.responses[201]
  */
  try {
    const task = await new Task({
      description: req.body.description,
      done: false,
    }).save();

    await publish("task", {
      id: task._id,
      description: task.description,
      callback: {
        href: `${process.env.CALLBACK_URL}/tasks/${task._id}/done`,
        method: "PATCH",
      }
    });

    res.CREATED(task);
  } catch (err) {
    next(err);
  }
};

export const doneTask = async (req, res, next) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Done task'
    #swagger.description = 'Done task'
    #swagger.responses[200]
  */
  try {
    await Task.findOneAndUpdate(req.params, { done: true });

    res.OK();
  } catch (err) {
    next(err);
  }
};
