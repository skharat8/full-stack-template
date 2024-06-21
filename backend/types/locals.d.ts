import type { UserWithSession } from "../models/session.model";

// Define an interface for data stored in res.locals
declare global {
  namespace Express {
    interface Locals {
      user: UserWithSession;
    }
  }
}
