const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');           
const userController = require("./controller/userController");
const taskController=require("./controller/taskController");
const { auth } = require('./controller/userController');



const app = express();
app.use(cors()); 

app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((error) => {
  console.log('MongoDB connection error', error);
});

app.post("/register", userController.register);

app.post("/login", userController.login);

app.post('/tasks',auth, taskController.createTask);

app.get('/tasks/:id', taskController.getTasks);

app.delete('/tasks/:id',taskController.deleteTask);

app.put('/tasks/:id',taskController.updateTask);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
