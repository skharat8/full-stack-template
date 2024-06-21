import jwt from "jsonwebtoken";
import logger from "./logger";

type JwtVerificationResult = {
  valid: boolean;
  expired: boolean;
  decodedToken?: string | jwt.JwtPayload;
};

// Sign the JWT with a private key
const signJwt = (
  object: Record<string, unknown>,
  options?: jwt.SignOptions
): string => {
  if (!process.env.PRIVATE_KEY) throw Error("Missing private key");

  return jwt.sign(object, process.env.PRIVATE_KEY as jwt.Secret, {
    ...(options && options),
    algorithm: "RS256",
  });
};

// Verify the JWT with a public key
const verifyJwt = (token: string): JwtVerificationResult => {
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.PUBLIC_KEY as jwt.Secret
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
};

export { signJwt, verifyJwt };
