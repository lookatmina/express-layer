import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma/index.js";
import UserService from "../services/users.service.js";

const userService = new UserService();
export default class UserController {
    // 회원가입 라우터랑 연결할 컨트롤러 메서드
    signup = async (req, res, next) => {
      try {
        // 이메일, 비밀번호, 이름을 받아서 회원가입을 시킨다.
        const { email, password, name } = req.body;

        // controller는 req.body로 받은 email, password, name을 서비스에 넘겨주고
        const user = await userService.signup(email, password, name);
        // response할 때 필요한 email, name 값을 서비스로 부터 받아서 response에 넣어주면 된다.
    
        // response로 생성된 user의 이메일과 이름을 돌려준다.
        return res.status(200).send({
          message: "회원가입 api 입니다.",
          data: {
            email: user.email,
            name: user.name
          }
        })
      } catch (e) {
        // 서비스에서 res.send하지 않고 error를 던지기 때문에 어떤 에러인지 확인하기 위해 수정함
        console.error(e)
        return res.status(500).send({
          message: "예기치 못한 서버 에러 발생",
          error: e.message
        })
      }
    };
  
    // 로그인 라우터랑 연결할 컨트롤러 메서드
    signin = async (req, res, next) => {
      try {
        // 이메일과 비밀번호를 받아서 로그인을 시킨다.
        const { email, password } = req.body;
        
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
    
        // 이메일로 user table에서 해당하는 user가 있는지 찾아본다.
        const user = await prisma.users.findFirst({
          where: {
            email
          }
        });
    
          // user가 없으면 가입되지 않은 user이므로 error를 발생시킨다.
        if (!user) {
          return res.status(400).send({
            message: '가입되지 않은 이메일입니다.'
          })
        }

        // user가 있으면 password가 맞는지 확인한다.
        // pawwword가 맞지 않으면 올바르지 않은 비밀번호이므로 error를 발생시킨다.
        if (user.password !== password) {
          return res.status(400).send({
            message: '비밀번호가 올바르지 않습니다.'
          })
        }
    
        // password가 맞으면 로그인이 완료된 것이므로 access token을 돌려준다.
        const accessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
          expiresIn: '12h',
        });
    
        // 쿠키에 accessToken 설정
        res.cookie('accessToken', accessToken)
        
        return res.status(200).send({
          message: "로그인 api 입니다.",
          data: {
            accessToken
          }
        })
      } catch (e) {
        return res.status(500).send({
          message: "예기치 못한 서버 에러 발생"
        })
      }
    };
  
    // 프로필 조회 라우터랑 연결할 컨트롤러 메서드
    getProfile = async (req, res, next) => {
      try {
        // 미들웨어에서 req.user를 설정해줬으니까 여기서 받아올 수 있음
        const { userId } = req.user;
    
        // 해당하는 userId로 user가 있는지 확인한다.
        const user = await prisma.users.findFirst({
          where: {
            userId
          }
        })
    
        // user가 있다면 이메일과 이름을 돌려준다.
        if (!user) {
          return res.status(400).send({
            message: '사용자가 존재하지 않습니다.'
          })
        }
        
        return res.status(200).send({
          message: "프로필 조회 api 입니다.",
          data: {
            email: user.email,
            name: user.name
          }
        })
      } catch (e) {
        return res.status(500).send({
          message: "예기치 못한 서버 에러 발생"
        })
      }
    };
  }