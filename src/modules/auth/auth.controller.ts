import type { Request, Response } from "express";
import { authService } from "./auth.service";

export const loginUser = async (req: Request, res: Response) => {
  const result = await authService.loginUserService(req.body);
  if (!result) {
    return res.status(400).json({
      success: false,
      message: "Failed to login user. Please check your inputs.",
      data: null,
    });
  }
  res.status(201).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const result = await authService.registerUserService(req.body);

  if (!result) {
    return res.status(400).json({
      success: false,
      message: "Failed to register user. Please check your inputs.",
      data: null,
    });
  }
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
};

export const authController = {
  loginUser,
  registerUser,
};
