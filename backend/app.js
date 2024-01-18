const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const itemsPerPage = 6;
const jsondata = require("../mockdata.json");
const dataFilePath = path.resolve(__dirname, "../mockdata.json");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.get("/api/users", (req, res) => {
  const page = req.query.page || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = jsondata.slice(startIndex, endIndex);
  res.json({
    totalItems: jsondata.length,
    currentPage: page,
    totalPages: Math.ceil(jsondata.length / itemsPerPage),
    users: paginatedData
  });
  // res.json(require("../mockdata.json"));
});
app.get("/api/user/:id", (req, res) => {
  const id = Number(req.params.id);
  const userwithid = jsondata.find((user) => user.id === id);
  res.json(userwithid);
});
app.post("/api/createuser", (req, res) => {
  const body = req.body;
  // console.log("body", body);
  const newid = jsondata[jsondata.length - 1].id;
  // console.log(newid);
  jsondata.push({ ...body, id: newid + 1 });
  fs.writeFile(dataFilePath, JSON.stringify(jsondata), (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Data successfully write in JSON File");
    }
  });
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














