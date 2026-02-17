const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Add this before your routes

let userData = [
  {
    id: 1,
    firstName: "Loganathan",
    lastName: "S",
    phone: "9876543210",
    email: "logu@gmail.com",
  },
  {
    id: 2,
    firstName: "Kumar",
    lastName: "R",
    phone: "9123456780",
    email: "kumar@gmail.com",
  },
  {
    id: 3,
    firstName: "Logan",
    lastName: "S",
    phone: "9876543210",
    email: "logu@gmail.com",
  },
  {
    id: 4,
    firstName: "sdf",
    lastName: "R",
    phone: "9123456780",
    email: "kumar@gmail.com",
  },
];

app.get("/users", (req, res) => {
  res.send(userData);
});

app.post("/users", (req, res) => {
  const newUser = { id: userData.length + 1, ...req.body };
  console.log(newUser);
  
  userData.push(newUser);
  res.send(newUser);
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = userData.findIndex((user) => user.id === id);
  if (index === -1) return res.status(404).send({ error: "User not found" });
  userData[index] = { ...userData[index], ...req.body };
  res.send(userData[index]);
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = userData.findIndex((user) => user.id === id);
  if (index === -1) return res.status(404).send({ error: "User not found" });
  const deletedUser = userData.splice(index, 1);
  res.send(deletedUser[0]);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
