import express from "express";
import userRouter from "./users/routes";
import shipmentRouter from "./shipments/routes";
import cors from "cors";

const app = express();
const port = 8080;

app.use(express.json());

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "PUT", "DELETE"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/shipments", shipmentRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
