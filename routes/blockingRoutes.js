/* Imports */
const express = require("express");
const { getStore, updateStore } = require("../store");

/* Initialize Router */
const blockRouter = express();

/* Block a User */
blockRouter.put("/user/blockUser/:fromUser/:toBlockUser", (req, res) => {
  const { fromUser, toBlockUser } = req.params;
  let users = getStore().users;
  if (!users[fromUser] || !users[toBlockUser])
    return res.status(404).send({ success: false, message: "User Not Found" });

  users[fromUser].blocked.push(toBlockUser);
  users[toBlockUser].followers = users[toBlockUser].followers.filter(
    (id) => id != fromUser
  );
  users[toBlockUser].following = users[toBlockUser].following.filter(
    (id) => id != fromUser
  );

  updateStore("users", users);
  res
    .status(200)
    .send({ success: true, message: "You blocked the user successfully" });
});

/* Get All blocked User by a particular user */
blockRouter.get("/user/getBlockedUsers/:forUser", (req, res) => {
  const { forUser } = req.params;
  let users = getStore().users;
  if (!users[forUser])
    return res.status(404).send({ success: false, message: "User Not Found" });

  res.status(200).send(users[forUser].blocked);
});

/* Unblock a user */
blockRouter.put("/user/unBlockUser/:fromUser/:toUnBlockUser", (req, res) => {
  const { fromUser, toUnBlockUser } = req.params;
  let users = getStore().users;
  if (!users[fromUser] || !users[toUnBlockUser])
    return res.status(404).send({ success: false, message: "User Not Found" });

  users[fromUser].blocked = users[fromUser].blocked.filter(
    (id) => id != toUnBlockUser
  );
  updateStore("users", users);
  res
    .status(200)
    .send({ success: true, message: "You UnBlocked the user successfully" });
});

module.exports = blockRouter;
