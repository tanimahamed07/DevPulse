import type { Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

export const loginUser = async (req: Request, res: Response) => {
  const result = await authService.loginUserService(req.body);
  if (!result) {
    if (!result) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Failed to login user. Please check your inputs.",
        data: null,
      });
    }
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: result,
  });
  // res.status(200).json({
  //   success: true,
  //   message: "Login successful",
  //   data: result,
  // });
};

export const registerUser = async (req: Request, res: Response) => {
  const result = await authService.registerUserService(req.body);

  if (!result) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Failed to register user. Please check your inputs.",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
};

export const authController = {
  loginUser,
  registerUser,
};
