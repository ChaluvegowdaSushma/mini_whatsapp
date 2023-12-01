import APP from "express";
import routes from "./routes";

const app = new APP();
require("./config")(app);

const PORT = 3002;

const startServer = () => {
  app.listen(PORT);
  console.log(`Server started on Port ${PORT}`);
  routes(app);
};

startServer();
