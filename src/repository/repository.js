// src/repository/repository.js

import pool from "../config/db.js";

//// 🔹 사용자 관련 함수 //// 

// 1. 아이디 중복 체크
export const checkUserExist = async (username) => {
  const conn = await pool.getConnection();
  try {
    const sql = "SELECT * FROM User WHERE username = ?";
    const [rows] = await conn.query(sql, [username]);
    return rows.length > 0 ? rows[0].id : null;
  } catch (err) {
    throw new Error(`아이디 중복 체크 중 오류 발생: ${err.message}`);
  } finally {
    conn.release();
  }
};

// 2. 사용자 추가
export const addUser = async (user) => {
  const conn = await pool.getConnection();
  try {
    const sql = `INSERT INTO User (username, password, email, nickname)
                 VALUES (?, ?, ?, ?)`;
    const [result] = await conn.query(sql, [
      user.username,
      user.password,
      user.email,
      user.nickname,
    ]);

    if (result.affectedRows <= 0) {
      throw new Error("회원가입에 실패했습니다.");
    }

    const [rows] = await conn.query("SELECT * FROM User WHERE id = ?", [result.insertId]);
    const newUser = rows[0];

    return {
      userId: newUser.id,
      username: newUser.username,
      email: newUser.email,
      nickname: newUser.nickname,
      createdAt: newUser.created_at,
    };
  } catch (err) {
    throw new Error(`사용자 추가 중 오류 발생: ${err.message}`);
  } finally {
    conn.release();
  }
};

// 3. 사용자 ID로 정보 가져오기
export const getUserByUserId = async (userId) => {
  const conn = await pool.getConnection();
  try {
    const sql = "SELECT * FROM User WHERE id = ?";
    const [rows] = await conn.query(sql, [userId]);

    if (rows.length <= 0) {
      throw new Error("존재하지 않는 사용자입니다.");
    }

    const user = rows[0];
    return {
      userId: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      nickname: user.nickname,
      status: user.status,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  } catch (err) {
    throw new Error(`사용자 정보 조회 중 오류 발생: ${err.message}`);
  } finally {
    conn.release();
  }
};

//// 🔹 리뷰 관련 함수 ////

// 4. 리뷰 등록
export const insertReview = async (userId, movieId, rating, content, spoiler) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      `INSERT INTO Review (user_id, movie_id, rating, content, is_spoiler, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [userId, movieId, rating, content, spoiler]
    );

    const reviewId = result.insertId;
    return { conn, reviewId };
  } catch (err) {
    await conn.rollback();
    conn.release();
    throw new Error(`리뷰 등록 중 오류 발생: ${err.message}`);
  }
};

// 5. 리뷰 감정 포인트 등록
export const insertReviewPoints = async (conn, reviewId, userId, movieId, pointIds) => {
  try {
    for (const pointId of pointIds) {
      await conn.query(
        `INSERT INTO Review_Point (review_id, id, movie_id, point_id)
         VALUES (?, ?, ?, ?)`,
        [reviewId, userId, movieId, pointId]
      );
    }

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw new Error(`감정 포인트 등록 중 오류 발생: ${err.message}`);
  } finally {
    conn.release();
  }
};
