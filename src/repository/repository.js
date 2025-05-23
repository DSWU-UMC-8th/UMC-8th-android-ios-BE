import pool from "../db.config.js"; // 이름 없이 불러오기 

// 아이디 중복 체크 
export const checkUserExist = async (username) => {
    let db;
    try{
        db = await pool.getConnection();
        const sql = "SELECT * FROM User WHERE username = ?";
        const [rows] = await db.query(sql, [username]);
        return rows.length > 0;

    } catch (err) {
        throw new Error(`아이디 중복 체크 중 오류 발생: (${err})`);
    } finally {
        db.release();
    }
}

// 사용자 추가 
export const addUser = async (user) => {
    let db;
    try{
        db = await pool.getConnection();
        const sql = "INSERT INTO User (username, password, email, nickname) VALUES (?, ?, ?, ?)";
        const [rows] = await db.query(sql, [user.username, user.password, user.email, user.nickname]);

        if (rows.affectedRows <= 0) {
            throw new Error("회원가입에 실패했습니다.");
        }   
        return {
            userId: rows.insertId,
            username: rows.username,
            email: rows.email,
            nickname: rows.nickname,
            createdAt: rows.created_at,
        };
    } catch (err) {
        throw new Error(`사용자 추가 중 오류 발생: (${err})`);
    } finally {
        db.release();
    }

}