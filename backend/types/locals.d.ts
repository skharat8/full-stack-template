import type { SafeDbUser } from "../schemas/user.zod";

// Define an interface for data stored in res.locals
declare global {
  namespace Express {
    interface Locals {
      user?: SafeDbUser;
      sessionId?: string;
    }
  }
}
