module.exports.foundItem = (limit, found) => {
  if (found < limit) {
    return true;
  } else {
    return false;
  }
};
