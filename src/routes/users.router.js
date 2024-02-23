import express from "express";
// 필요 없어진 의존성 모듈은 지운다.
// import jwt from "jsonwebtoken";
// import { prisma } from "../utils/prisma/index.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import UserController from "../controllers/users.controller.js";

const router = express.Router();

// 2. 컨트롤러를 가져와서 인스턴스를 생성한다.
const userController = new UserController();

// 회원가입 
// 1. try catch를 전부 연결할 컨트롤러로 옮긴다.
// 3. 가져온 controller 메서드로 연결시킨다.
router.post("/users/signup", userController.signup);

// 로그인
// 1. try catch를 전부 연결할 컨트롤러로 옮긴다.
// 3. 가져온 controller 메서드로 연결시킨다.
router.post("/users/signin", userController.signin);

// 프로필 조회
// 1. try catch를 전부 연결할 컨트롤러로 옮긴다.
// 3. 가져온 controller 메서드로 연결시킨다.
router.get("/users/me", authMiddleware, userController.getProfile);

export default router;
