import express from "express";

const router = express.Router();

// 회원가입
router.post("/users/signup", (req, res) =>
  res.status(200).send({
    message: "회원가입 api 입니다.",
  })
);

// 로그인
router.post("/users/signin", (req, res) =>
  res.status(200).send({
    message: "로그인 api 입니다.",
  })
);

// 프로필 조회
router.get("/users/me", (req, res) =>
  res.status(200).send({
    message: "프로필 조회 api 입니다.",
  })
);

export default router;
