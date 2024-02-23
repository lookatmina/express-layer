import express from "express";

const router = express.Router();

// 회원가입
router.post("/users/signup", (req, res) =>{
  // 이메일, 비밀번호, 이름을 받아서 회원가입을 시킨다.
  const { email, password, name } = req.body;
  // req.body validation
  if (!email) {
    return res.status(400).send({
      message: 'email은 필수 입력값입니다.'
    })
  }
  if (!password) {
    return res.status(400).send({
      message: 'password는 필수 입력값입니다.'
    })
  }
  if (!name) {
    return res.status(400).send({
      message: 'name은 필수 입력값입니다.'
    })
  }

  // eamil 유효성 검사 (중복이 있으면 안됨)
  const alreadyUser = {}; // prisma를 통해 user를 findFirst하는 함수 작성 예정
  
  // user가 존재하면 email이 중복되는 것이기 때문에 error 발생
  if (alreadyUser) {
    return res.status(400).send({
      message: '존재하는 email입니다.'
    })
  }
  // user table에 user를 create한다.
  const user = { email, password, name }; // prisma로 create 함수 작성 예정

  // response로 생성된 user의 이메일과 이름을 돌려준다.
  return res.status(200).send({
    message: "회원가입 api 입니다.",
    data: {
      email: user.email,
      name: user.name
    }
  })
});

// 로그인
router.post("/users/signin", (req, res) =>
  // 이메일과 비밀번호를 받아서 로그인을 시킨다.
  // req.body validation
  // 이메일로 user table에서 해당하는 user가 있는지 찾아본다.
  // user가 없으면 가입되지 않은 user이므로 error를 발생시킨다.
  // user가 있으면 password가 맞는지 확인한다.
  // password가 맞으면 로그인이 완료된 것이므로 access token을 돌려준다.
  // pawwword가 맞지 않으면 올바르지 않은 비밀번호이므로 error를 발생시킨다.
  res.status(200).send({
    message: "로그인 api 입니다.",
  })
);

// 프로필 조회
router.get("/users/me", (req, res) =>
  // access token으로 userId를 확인한다.
  // 해당하는 userId로 user가 있는지 확인한다.
  // user가 있다면 이메일과 이름을 돌려준다.
  res.status(200).send({
    message: "프로필 조회 api 입니다.",
  })
);

export default router;
