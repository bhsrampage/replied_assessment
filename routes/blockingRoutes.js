const express = require("express");
const { getStore, updateStore } = require("../store");

const blockRouter = express();

blockRouter.put("/user/blockUser/:fromUser/:toBlockUser", (req, res) => {
  const { fromUser, toBlockUser } = req.params;
  let users = getStore().users;
  if (!users[fromUser] || !users[toBlockUser])
    return res.status(404).send({ success: false, message: "User Not Found" });

  users[fromUser].blocked.push(toBlockUser);
  updateStore("users", users);
  res
    .status(200)
    .send({ success: true, message: "You blocked the user successfully" });
});

blockRouter.get("/user/getBlockedUsers/:forUser", (req, res) => {
  const { forUser } = req.params;
  let users = getStore().users;
  if (!users[forUser])
    return res.status(404).send({ success: false, message: "User Not Found" });

  res.status(200).send(users[forUser].blocked);
});

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
