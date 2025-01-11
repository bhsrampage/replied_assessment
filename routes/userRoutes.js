/* Imports */
const express = require("express");
const { getStore, updateStore } = require("../store");
const shorthash = require("shorthash");
const { createNewUser } = require("../models/user");

/* Initialize Router */
const userRouter = express.Router();

/* Create New User */
userRouter.post("/user/newUser", (req, res) => {
  let temp = getStore().users;

  const { email, birthDate } = req.body;
  if (!email || !birthDate)
    return res
      .status(400)
      .send({ success: false, message: "Incomplete fields in body" });

  let id = shorthash.unique(email);
  if (temp[id])
    return res
      .status(400)
      .send({ success: false, message: "User already exists with this email" });

  temp[id] = createNewUser(birthDate, email);
  updateStore("users", temp);
  res.status(200).send({ success: true, message: "User created successfully" });
});

/* Send all Users */
userRouter.get("/user/all", (req, res) => {
  res.status(200).send(Object.values(getStore().users));
});

module.exports = userRouter;
