export const bodyToRegister = (body) => {
    return {
        username: body.username, // 사용자 아이디 
        password: body.password, // 평문'
        passwordConfirm: body.passwordConfirm, // 비밀번호 확인용 
        email: body.email,
        nickname: body.nickname,
    }
}

export const responseFromUser = (user) => {
    return {
        userId: user.userId,
        username: user.username,
        email: user.email,
        nickname: user.nickname,
    }
}

export const bodyToLogin = (body) => {
    return {
        username: body.username,
        password: body.password,
    }
}