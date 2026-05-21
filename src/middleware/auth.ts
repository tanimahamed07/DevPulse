import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import { config } from "../config/env";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "jwt missing!",
      });
    }

    const decoded = jwt.verify(
      token as string,
      config.jwt_secret as string,
    ) as JwtPayload;

    const userData = await pool.query(`SELECT * FROM users WHERE id=$1`, [
      decoded.id,
    ]);

    const user = userData.rows[0];

    if (!user) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "User not found!",
      });
    }

    req.user = user;
    console.log("from middleware", req?.user);
    next();
  } catch (error) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Invalid or expired token!",
    });
  }
};
