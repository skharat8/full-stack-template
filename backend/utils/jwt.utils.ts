import jwt from "jsonwebtoken";
import type { CookieOptions } from "express";

import logger from "./logger";
import convertDurationToMs from "./datetime.utils";

type JwtVerificationResult = {
  valid: boolean;
  expired: boolean;
  decodedToken?: string | jwt.JwtPayload;
};

// Sign the JWT with a private key
function signJwt(
  object: Record<string, unknown>,
  options?: jwt.SignOptions,
): string {
  if (!process.env.PRIVATE_KEY) throw Error("Missing private key");

  return jwt.sign(object, process.env.PRIVATE_KEY as jwt.Secret, {
    ...(options && options),
    algorithm: "RS256",
  });
}

// Verify the JWT with a public key
function verifyJwt(token: string): JwtVerificationResult {
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.PUBLIC_KEY as jwt.Secret,
    );

    return { valid: true, expired: false, decodedToken };
  } catch (err) {
    logger.error(err);

    if (err instanceof jwt.TokenExpiredError) {
      return {
        valid: false,
        expired: true,
      };
    }

    return {
      valid: false,
      expired: false,
    };
  }
}

function getCookieOptions(age: string | undefined): CookieOptions {
  const ageInMs = convertDurationToMs(age ?? "");

  return {
    maxAge: ageInMs,
    httpOnly: true, // Prevent XSS attacks (cross-site scripting)
    sameSite: "strict", // Prevent CSRF attacks (cross-site request forgery)
    secure: process.env.NODE_ENV !== "development",
  };
}

export { signJwt, verifyJwt, getCookieOptions };
