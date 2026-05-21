import type { Request } from "express";
import { pool } from "../../db";

const createIssuesService = async (
  payload: { title: string; description: string; type: string , reporter_id: number },
) => {
const { title, description, type, reporter_id } = payload;

  const newIssue = await pool.query(
    `INSERT INTO issues (title, description, type, reporter_id) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, title, description, type, status, reporter_id, created_at, updated_at`,
    [title, description, type, reporter_id],
  );

  return newIssue.rows[0];
};

export const issuesService = {
  createIssuesService,
};
