import jwt from 'jsonwebtoken';


// function to generate token
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateToken(user: any) {
    return jwt.sign({id: user.id}, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
}