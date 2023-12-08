import jwt from 'jsonwebtoken';


// function to generate token
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateToken(user: any) {
    return jwt.sign({id: user.id}, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
}

export function decodeToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export function verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return false;
        return decoded;
    });
}