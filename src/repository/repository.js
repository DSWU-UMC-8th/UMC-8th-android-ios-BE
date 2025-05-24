import pool from "../db.config.js"; // 이름 없이 불러오기 

// 아이디 중복 체크 
export const checkUserExist = async (username) => {
    let db;
    try{
        db = await pool.getConnection();
        const sql = "SELECT * FROM User WHERE username = ?";
        const [rows] = await db.query(sql, [username]);
        if (rows.length > 0) {
            return rows[0].id; 
        }
        else {
            return null; // 아이디가 존재하지 않는 경우
        }

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
        // 추가된 사용자 정보 가져오기
        const [users] = await db.query("SELECT * FROM User WHERE id = ?", [rows.insertId]);
        const newUser = users[0];

        return {
            userId: newUser.id,
            username: newUser.username,
            email: newUser.email,
            nickname: newUser.nickname,
            createdAt: newUser.created_at,
        };
    } catch (err) {
        throw new Error(`사용자 추가 중 오류 발생: (${err})`);
    } finally {
        db.release();
    }
}

// id로 사용자 정보 가져오기
export const getUserByUserId = async (userId) => {
    let db;
    try{
        db = await pool.getConnection();
        const sql = "SELECT * FROM User WHERE id = ?";
        const [rows] = await db.query(sql, [userId]);
        if (rows.length <= 0) {
            throw new Error("존재하지 않는 사용자입니다.");
        }
        return {
            userId: rows[0].id,
            username: rows[0].username,
            password: rows[0].password,
            email: rows[0].email,
            nickname: rows[0].nickname,
            status: rows[0].status,
            createdAt: rows[0].created_at,
            updatedAt: rows[0].updated_at,
        };
    } catch(err){
        throw new Error(`사용자 정보 조회 중 오류 발생: (${err})`);
    } finally {
        db.release();
    }
}