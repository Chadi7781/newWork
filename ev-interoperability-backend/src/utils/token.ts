// src/utils/token.utils.ts

import * as jwt from "jsonwebtoken";

export function generateActivationToken(userId: string): string {
  // Replace 'your-secret-key' with a secret key for signing the token
  const secretKey = "abceeee";

  // Set the expiration time for the token (e.g., 1 day)
  const expiresIn = "1h";

  // Generate the activation token
  const token = jwt.sign({ userId }, secretKey, { expiresIn });

  return token;
}
