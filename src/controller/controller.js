import { StatusCodes } from "http-status-codes";
import { bodyToRegister} from "../dtos/dtos.js";
import { register} from "../service/service.js";


export const handleRegister = async (req, res) => {
    console.log("회원가입 요청! ", req.body);
    try{
        const user = await register(bodyToRegister(req.body));
        
        res.status(StatusCodes.CREATED).json({
            isSuccess: "true",
            code: "201",
            message: "회원가입이 완료되었습니다.",
            result: user,
        });
    } catch (err){
        res.status(400).json({ error: err.message });
    }
}

export const handleLogin = async (req, res) => {
    console.log("로그인 요청! ", req.body);
    try{
        const user = await login(bodyToLogin(req.body));
        res.status(StatusCodes.OK).json({
            isSuccess: "true",
            code: "200",
            message: "로그인에 성공했습니다.",
            result: user,
        });
    } catch(err){
        res.status(400).json({error:err.message});
    } 
}