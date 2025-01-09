const express = require("express");

const blockRouter = express();

blockRouter.post("/user/blockUser/:toBlockUser", (req, res) => {
  const userToBlock = req.params.toBlockUser;
});

blockRouter.get("/user/getBlockedUsers", (req, res) => {});

blockRouter.post("/user/blockUser/:toUnBlockUser", (req, res) => {
  const userToUnblock = req.params.toUnBlockUser;
});

module.exports = blockRouter;
