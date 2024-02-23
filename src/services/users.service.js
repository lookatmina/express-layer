import { prisma } from "../utils/prisma/index.js";

export default class UserService {
  signup = async (email, password, name) => {
    // signup 컨트롤러의 비즈니스 로직

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
    const alreadyUser = await prisma.users.findFirst({
      where: {
        email
      }
    });
    // prisma, @prisma/client 설치 후 명령어 실행: yarn prisma init
    
    // user가 존재하면 email이 중복되는 것이기 때문에 error 발생
    if (alreadyUser) {
      return res.status(400).send({
        message: '존재하는 email입니다.'
      })
    }
        
    // user table에 user를 create한다.
    const user = await prisma.users.create({
      data: {
        email,
        password,
        name
      }
    })

    return user
  };

  signin = async () => {
    // signin 컨트롤러의 비즈니스 로직
  };

  getProfile = async () => {
    // getProfile 컨트롤러의 비즈니스 로직
  };
}
