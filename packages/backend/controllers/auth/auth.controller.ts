import { Request, Response } from 'express'
import { registerUser } from './register'
import { loginUser } from './login'

// function to register user
export async function register(req: Request, res: Response) {
  const result = await registerUser(req.body)

  return res.status(result.status).json(result.body)
}

// function to login user
export async function login(req: Request, res: Response) {
  const result = await loginUser(req.body)

  return res
    .status(result.status)
    .cookie('auth', result.body.token, {
      httpOnly: true,
      sameSite: 'none',
    })
    .json({ user: result.body.user })
}
