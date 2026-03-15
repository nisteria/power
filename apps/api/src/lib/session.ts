// Session Service - JWT Management
export function createSessionToken(userId: string): string {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );
}

export function verifySession(token: string): any {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
}

export function refreshToken(token: string): string | null {
  const payload = jwt.decode(token);
  if (!payload) return null;
  return createSessionToken(payload.userId);
}