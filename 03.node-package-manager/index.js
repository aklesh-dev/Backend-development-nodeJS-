const lodash = require("lodash");

const names = ["aklesh", "izumi", "raizel", "naruto"]

const capitialize = lodash.map(names, lodash.capitalize);

console.log(capitialize);