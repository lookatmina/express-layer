import { prisma } from "../utils/prisma/index.js";

export default class UserService {
  signup = async (email, password, name) => {
    // signup 컨트롤러의 비즈니스 로직

    // req.body validation
    if (!email) {
      // 이제 express의 req, res를 찾을 수 없게 되므로 res.status를 쓸 수 없어짐
      // parameter로 res를 가지고 들어오면 쓸 수는 있음
      // error를 던지는 형태로 바꿔주겠음
      throw new Error('email은 필수 입력값입니다.')
    }
    if (!password) {
      throw new Error('password는 필수 입력값입니다.')
    }
    if (!name) {
      throw new Error('name은 필수 입력값입니다.')
    }
    
    /////////////////////////////////////////// 프리즈마를 사용하는 부분은 레포지토리로 넘김
    // eamil 유효성 검사 (중복이 있으면 안됨)
    const alreadyUser = await prisma.users.findFirst({
      where: {
        email
      }
    });
    // prisma, @prisma/client 설치 후 명령어 실행: yarn prisma init
    /////////////////////////////////////////// 여기까지

    // user가 존재하면 email이 중복되는 것이기 때문에 error 발생
    if (alreadyUser) {
      throw new Error('존재하는 email입니다.')
    }
    
    /////////////////////////////////////////// 프리즈마를 사용하는 부분은 레포지토리로 넘김
    // user table에 user를 create한다.
    const user = await prisma.users.create({
      data: {
        email,
        password,
        name
      }
    })
    /////////////////////////////////////////// 여기까지

    return user
  };

  signin = async () => {
    // signin 컨트롤러의 비즈니스 로직
  };

  getProfile = async () => {
    // getProfile 컨트롤러의 비즈니스 로직
  };
}
