import { prisma } from "../utils/prisma/index.js";

export default class UserRepository {
  // 회원가입, 로그인, 프로필 조회 api에서 프리즈마를 사용하던 부분을 떠올림
  // email로 유저를 조회하거나
  // userId로 유저를 조회하거나
  // 유저를 생성하는 동작이 필요함

  getUserByEmail = async (email) => {
    const user = await prisma.users.findFirst({
      where: {
        email
      }
    });
    return user
  }

  getUserById = async () => {
    
  }

  createUser = async (email, password, name) => {
    const user = await prisma.users.create({
      data: {
        email,
        password,
        name
      }
    })
    return user
  }
}
