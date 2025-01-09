const store = {};

exports.getStore = function () {
  return store;
};

exports.updateStore = function ({ key, value }) {
  store[key] = value;
};
