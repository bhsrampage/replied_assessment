const shorthash = require("shorthash");

/*
const Request = {
    requestID:String,
    fromUserID: String,
    toUserID: String,
    status: Status
}
*/
exports.Status = {
  PENDING: "pending",
  REJECTED: "rejected",
  ACCEPTED: "accepted",
};

exports.createNewRequest = (fromUserID, toUserID) => {
  let temp = {
    requestID: shorthash.unique(fromUserID + toUserID),
    fromUserID,
    toUserID,
    status: this.Status.PENDING,
  };

  return temp;
};
