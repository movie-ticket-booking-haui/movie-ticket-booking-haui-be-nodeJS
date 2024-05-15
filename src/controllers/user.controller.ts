import { pgPool  } from "../models/dbPostgres.js";
import { Request, Response } from "express";
// get all users from PostgreSQL
const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await pgPool.query('SELECT * FROM public."User"');
        const users = result.rows;
        res.status(200).json({
            message: "get Users in postgres successsful",
            data: users
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export{getUsers}