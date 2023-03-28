const Task = require('../model/Task');

exports.createTask = async (req, res) => {
  try {
    const { description, user } = req.body;
    const task = new Task({description,user});
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getTasks = async (req, res) => {
  try {
    const userId = req.params.id;

    const tasks = await Task.find({ user: userId });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};



exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findByIdAndDelete(taskId); 
    if (!deletedTask) {
      return res.status(404).send('Task not found');
    }

    res.send('Task deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { description } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { description },
      { new: true } 
    );

    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


