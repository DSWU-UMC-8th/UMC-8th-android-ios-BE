import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {checkUserExist, addUser, getUserByUserId} from "../repository/repository.js";
import {responseFromUser} from "../dtos/dtos.js";
import e from "express";

// 회원가입 
export const register = async (user) => {
    
    // 아이디 중복 체크 
    const isUserExist = await checkUserExist(user.username);
    if (isUserExist) {
        throw new Error("이미 존재하는 아이디입니다.");
    }
    
    user.password = await bcrypt.hash(user.password, 10); // 비밀번호 암호화

    // 사용자 추가 
    const userData = await addUser({
        username: user.username,
        password: user.password,
        email: user.email,
        nickname: user.nickname,
    });

    return responseFromUser(userData);
}

// 로그인 
export const login = async (user) => {
    // 아이디 존재 여부 확인  
    const userId = await checkUserExist(user.username);
    if (!userId) {
        throw new Error("존재하지 않는 아이디입니다.");
    }

    const dbUser = await getUserByUserId(userId);

    // 비밀번호 일치 여부 확인
    const isPasswordValid = await bcrypt.compare(user.password, dbUser.password); // 사용자가 입력한 비밀번호(평문)와 DB에 저장된 비밀번호(해시) 비교
    if (!isPasswordValid) {
        throw new Error("비밀번호가 일치하지 않습니다.");
    }

    // JWT 토큰 생성
    const token = jwt.sign(
        {id: user.id, username: user.username},
        process.env.JWT_SECRET_KEY, // 비밀키
        {expiresIn: process.env.JWT_EXPIRES_IN} // 만료 시간
    );

    return {
        token: token,
        user: responseFromUser(dbUser),
    }
}