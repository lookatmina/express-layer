import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to Mina Server 🫶",
  })
);

// 회원가입
app.post("/users/signup", (req, res) =>
  res.status(200).send({
    message: "회원가입 api 입니다.",
  })
);

// 로그인
app.post("/users/signin", (req, res) =>
  res.status(200).send({
    message: "로그인 api 입니다.",
  })
);

// 프로필 조회
app.get("/users/me", (req, res) =>
  res.status(200).send({
    message: "프로필 조회 api 입니다.",
  })
);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

export default app;