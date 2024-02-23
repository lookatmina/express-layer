import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to Mina Server 🫶",
  })
);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

export default app;