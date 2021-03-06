const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 2300;

connectDB();
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postsRoutes"));
app.use("/api/event", require("./routes/eventRoutes"));
// app.use("/api/event/interesstedEvent", require("./routes/eventRoutes"));
// app.use("/api/event/notInteresstedEvent", require("./routes/eventRoutes"));
app.use("/api/conversation", require("./routes/conversationRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server started on port ${port}`.yellow.bold)
);
