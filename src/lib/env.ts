function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const versesApiUrl = getEnv('VERSES_API');
export const usersApiUrl = getEnv('USERS_API');
export const jwtSecret = getEnv('JWT_SECRET');

export const encodedJwtKey = new TextEncoder().encode(jwtSecret);
