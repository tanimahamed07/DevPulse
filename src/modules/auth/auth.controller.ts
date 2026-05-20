import type { Request, Response } from "express";

export const loginUser = (req: Request, res: Response) => {};

export const registerUser = (req: Request, res: Response) => {
  const { email, password } = req.body;
  
};

export const authController = {
  loginUser,
  registerUser,
};
