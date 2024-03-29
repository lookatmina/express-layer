import jwt from "jsonwebtoken";

export default async function (req, res, next) {
  try {
    console.log('auth middleware 입니다.')
    // access token으로 userId를 확인한다.
    const accessToken = req.cookies.accessToken;
    const tokenData = jwt.verify(accessToken, process.env.JWT_SECRET);
    
    // req.user에 값을 넣어줌
    req.user = {
      userId: tokenData.userId
    }
    
    next();
  } catch (e) {
    return res.status(500).send({
      message: "예기치 못한 서버 에러 발생"
    })
  }
}
