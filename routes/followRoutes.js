/* Imports */
const express = require("express");
const { getStore, updateStore } = require("../store");
const { createNewRequest, Status } = require("../models/request");

/* Initialize Router */
const followRouter = express.Router();

/* Utility function to check if close friends */
const areCloseFriends = (users, user1, user2) => {
  if (
    users[user1].following.find((id) => id === user2) &&
    users[user1].followers.find((id) => id === user2)
  )
    return true;
  return false;
};

/* Generate a follow request */
followRouter.post("/user/requestFollow/:fromUser/:toFollowUser", (req, res) => {
  const { toFollowUser, fromUser } = req.params;
  let users = getStore().users;
  if (!users[toFollowUser] || !users[fromUser])
    return res.status(404).send({ success: false, message: "User Not Found" });

  if (users[toFollowUser].blocked.find((id) => id === fromUser))
    return res.status(403).send({
      success: false,
      message: "Cannot request to follow as the User has blocked you",
    });

  if (users[fromUser].blocked.find((id) => id === toFollowUser))
    return res.status(403).send({
      success: false,
      message: "Cannot request to follow as you have blocked the User",
    });

  let requests = getStore().followRequests;
  if (
    requests.find(
      (request) =>
        request.fromUserID === fromUser &&
        request.toUserID === toFollowUser &&
        request.status !== Status.REJECTED
    )
  )
    return res
      .status(400)
      .send({ success: false, message: "Duplicate Requests not allowed" });

  requests.push(createNewRequest(fromUser, toFollowUser));
  updateStore("followRequests", requests);
  res
    .status(200)
    .send({ success: true, message: "Follow request created successfully" });
});

/* Decide on the Follow Request */
followRouter.put("/user/requestDecision/:requestID", (req, res) => {
  const { requestID } = req.params;
  const { isAccepted } = req.body;
  if (typeof isAccepted !== "boolean")
    return res.status(400).send({
      success: false,
      message: "isAccepted query param should be a boolean",
    });

  let requests = getStore().followRequests;
  let targetIndex = requests.findIndex(
    (request) => request.requestID === requestID
  );
  if (targetIndex === -1)
    return res
      .status(404)
      .send({ success: false, message: "Request Not found" });

  const { fromUserID, toUserID } = requests[targetIndex];
  requests[targetIndex].status = isAccepted ? Status.ACCEPTED : Status.REJECTED;
  updateStore("followRequests", requests);

  if (isAccepted) {
    let users = getStore().users;
    users[fromUserID].following.push(toUserID);
    users[toUserID].followers.push(fromUserID);
    updateStore("users", users);
  }

  res
    .status(200)
    .send({ success: true, message: "Your Follow request has been processed" });
});

/* Get all pending Follow Requests */
followRouter.get("/user/getfollowRequests/:userID", (req, res) => {
  const { userID } = req.params;
  let requests = getStore().followRequests.filter(
    (request) =>
      request.toUserID === userID && request.status === Status.PENDING
  );
  res.status(200).send(requests);
});

/* Get all Followers */
followRouter.get("/user/getFollowers/:userID", (req, res) => {
  const { userID } = req.params;
  let users = getStore().users;
  if (!users[userID])
    return res.status(404).send({ success: false, message: "User Not Found" });

  let followersList = users[userID].followers.map((follower) => {
    let user = users[follower];
    if (!areCloseFriends(users, userID, follower)) delete user.birthDate;
    return user;
  });

  res.status(200).send(followersList);
});

/* Get all Following users */
followRouter.get("/user/getFollowing/:userID", (req, res) => {
  const { userID } = req.params;
  let users = getStore().users;
  if (!users[userID])
    return res.status(404).send({ success: false, message: "User Not Found" });

  let followingList = users[userID].following.map((id) => {
    let user = users[id];
    if (!areCloseFriends(users, userID, id)) delete user.birthDate;
    return user;
  });

  res.status(200).send(followingList);
});

module.exports = followRouter;
