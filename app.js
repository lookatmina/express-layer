import express from "express";
import UsersRouter from "./src/routes/users.router.js";

const app = express();

app.use(express.json());

// users.router.js로 뺀 라우터들을 불러와서 연결만 해준다.
// 서버 최상위 도메인을 api로 설정하고 싶다. / => /api
// /users/signup => /api/users/signup 이렇게 변경됨
app.use("/api", [UsersRouter]);

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