import bcrypt from "bcrypt";

import {checkUserExist, addUser} from "../repository/repository.js";
import {responseFromUser} from "../dtos/dtos.js";

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

