import type { Request, Response } from "express";
import { issuesService } from "./issues.service";
import sendResponse from "../../utils/sendResponse";

const createIssues = async (req: Request, res: Response) => {
  const { title, description, type } = req.body;
  const reporterId = req.user?.id;

  if (!reporterId) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized! User session not found.",
    });
  }
  const result = await issuesService.createIssuesService({
    title,
    description,
    type,
    reporter_id: reporterId,
  });
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Issue created successfully",
    data: result,
  });
};

export const issuesController = {
  createIssues,
};
