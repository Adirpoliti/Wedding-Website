import jwt from 'jsonwebtoken';

export function createJwtForUser(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}