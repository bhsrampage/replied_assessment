const store = {
  users: {},
  followRequests: [],
};

exports.getStore = function () {
  return store;
};

exports.updateStore = function ({ key, value }) {
  store[key] = value;
};
