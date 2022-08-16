

const homeRoute = require("./homeRoute/home");
const loginRoute = require("./login/login.route");
const adminRoute = require("./adminRoute/adminRoute");
const managementRoute = require("./managementRoute/managementRoute");
const userRoute = require("./user/userRoute");
function route(app) {




  
  app.use("/login", loginRoute);

  app.use("/management", managementRoute);

  app.use("/admin", adminRoute);

  app.use("/user", userRoute);

  app.use("/", homeRoute);



}

module.exports = route;
