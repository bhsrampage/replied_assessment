const express = require("express");

const followRouter = express.Router();

followRouter.post("/user/requestFollow/:toFollowUser", (req, res) => {
  const toFollowUser = req.params.toFollowUser;
});

followRouter.put("/user/requestDecision", (req, res) => {
  const decision = req.query.isAllowed;
});

followRouter.get("/user/getfollowRequests", (req, res) => {});

followRouter.get("/user/getFollowers", (req, res) => {});

followRouter.get("/user/getFollowing", (req, res) => {});

module.exports = followRouter;
