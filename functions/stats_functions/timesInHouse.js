module.exports.addTimeInHouse = (user, newHouse) => {
  if (newHouse === "Gryffindor") {
    user.timesGryffindor++;
  } else if (newHouse === "Hufflepuff") {
    user.timesHufflepuff++;
  } else if (newHouse === "Ravenclaw") {
    user.timesRavenclaw++;
  } else if (newHouse === "Slytherin") {
    user.timesSlytherin++;
  }

  return user;
};
