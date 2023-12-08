import { Response } from 'express';
import { getUser } from "../user/getUser";
import AuthenticatedRequest from "interfaces/request.interface";


export async function getMe(req: AuthenticatedRequest, res: Response) {
    const user = await getUser(req);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
}

// export async function getAllUser(req: Request, res: Response) {

// }