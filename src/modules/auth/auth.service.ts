import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../../db";

const registerUserService = async (payload: {
  email: string;
  name: string;
  password: string;
  role?: string;
}) => {
  const { email, name, password, role = "contributor" } = payload;

  const userCheck = await pool.query(
    `SELECT email FROM users WHERE email = $1`,
    [email],
  );

  if (userCheck.rows.length > 0) {
    throw new Error("Email is already registered!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await pool.query(
    `INSERT INTO users (name, email, password, role) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, name, email, role, created_at, updated_at`,
    [name, email, hashedPassword, role],
  );

  return newUser.rows[0];
};

export const authService = {
  registerUserService,
};
