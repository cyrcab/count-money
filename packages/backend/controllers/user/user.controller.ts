import { Response } from 'express';
import { getUser, getUsers } from "../user/getUser";
import { updateUser } from "../user/updateUser";
import AuthenticatedRequest from "interfaces/request.interface";
import { deleteUser } from '../user/deleteUser';


export async function getMe(req: AuthenticatedRequest, res: Response) {
    const user = await getUser(req);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    return res.status(200).json(user);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getAllUser(req: AuthenticatedRequest, res: Response) {
    const users = await getUsers();
    if (!users) return res.status(404).json({ msg: 'Users not found' });
    return res.status(200).json(users);
}

export async function updateUserController(req: AuthenticatedRequest, res: Response) {
    const user = await updateUser(req);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    return res.status(200).json(user);
}

export async function deleteUserController(req: AuthenticatedRequest, res: Response) {
    const result = await deleteUser(req);
    if (!result) return res.status(404).json({ msg: 'Error' });
    return res.status(200).json(result);
}