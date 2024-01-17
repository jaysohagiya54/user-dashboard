const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require('cors')
const jsondata = require("../mockdata.json");
const dataFilePath = path.resolve(__dirname, "../mockdata.json");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.get("/api/users", (req, res) => {
  // console.log("jsondata = ", jsondata)
  res.json(require("../mockdata.json"));
});
app.get("/api/user/:id", (req, res) => {
  const id = Number(req.params.id);
  const userwithid = jsondata.find((user) => user.id === id);
  res.json(userwithid);
});
app.put("/api/userupdate/:id",(req,res)=>{
  const taskId = Number(req.params.id);
  console.log(req.body);
  const updatedTask = req.body;
  console.log(taskId,updatedTask);
  const index = jsondata.findIndex((item) => item.id === taskId);
  if (index !== -1) {
    jsondata[index] = { ...jsondata[index], ...updatedTask };
    fs.writeFile(dataFilePath, JSON.stringify(jsondata), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error writing to data.json");
      } else {
        res.send(`Task with ID ${taskId} successfully updated`);
      }
    });
  } else {
    res.status(404).send(`Task with ID ${taskId} not found`);
  }
})
app.delete("/api/userdelete/:id",(req,res)=>{
  // console.log(jsondata);
  const taskId = Number(req.params.id);
  const index = jsondata.findIndex((item) => item.id === taskId);
  if (index !== -1) {
    jsondata.splice(index, 1);
    fs.writeFile(dataFilePath, JSON.stringify(jsondata), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error writing to data.json");
      } else {
        res.send(`Task with ID ${taskId} successfully deleted`);
      }
    });
  } else {
    res.status(404).send(`Task with ID ${taskId} not found`);
  }
})
app.listen(3000, (req, res) => {
  console.log("Server is listening from port 3000");
});














