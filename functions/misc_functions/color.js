const colors = require("../../json_files/colors.json");

module.exports.getHouseColor = house => {
  let color;

  if (house === "Gryffindor") {
    color = colors.gryffindor_red;
  } else if (house === "Hufflepuff") {
    color = colors.hufflepuff_yellow;
  } else if (house === "Ravenclaw") {
    color = colors.ravenclaw_blue;
  } else if (house === "Slytherin") {
    color = colors.slytherin_green;
  }

  return color;
};
