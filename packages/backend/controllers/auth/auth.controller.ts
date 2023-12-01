import { Request, Response } from 'express';
import { registerUser} from './register'


// function to register user
export async function register(req: Request, res: Response) {

    const result = await registerUser(req.body)

    return res.status(result.status).json(result.body);
    
}
