import { describe, expect, it, vi } from "vitest";
import supertest from "supertest";
import mongoose from "mongoose";

import createServer from "../server";
import * as UserService from "../services/user.service";
import * as SessionService from "../services/session.service";
import StatusCode from "../data/enums";
import type { UserLogin } from "../schemas/session.zod";
import type { SafeDbUser } from "../schemas/user.zod";
import type { Session } from "../models/session.model";

const app = createServer();

const sessionId = new mongoose.Types.ObjectId().toString();
const userId = new mongoose.Types.ObjectId().toString();

const loginPayload: UserLogin = {
  email: "johndoe@gmail.com",
  password: "test_password",
};

// @ts-expect-error Not including common DB fields like createdAt
const user: SafeDbUser = {
  id: userId,
  username: "test_name",
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@gmail.com",
};

// @ts-expect-error Not including common DB fields like createdAt
const session: Session = {
  id: sessionId,
  user: userId,
  valid: true,
  userAgent: "",
};

describe("Session", () => {
  describe("Login Route", () => {
    it("If login details are valid, set cookies with signed JWT", async () => {
      const validatePasswordMock = vi
        .spyOn(UserService, "validatePassword")
        .mockResolvedValue({ valid: true, data: user });
      const createSessionMock = vi
        .spyOn(SessionService, "createSession")
        .mockResolvedValue(session);

      const { statusCode, headers } = await supertest(app)
        .post("/api/sessions/login")
        .send(loginPayload);

      const cookies = headers["set-cookie"];

      expect(statusCode).toBe(StatusCode.OK);
      expect(cookies[0]).toContain("AccessToken");
      expect(cookies[1]).toContain("RefreshToken");
      expect(createSessionMock.mock.calls.length).toBe(1);
      expect(createSessionMock).toHaveBeenCalledWith(userId, "");
      expect(validatePasswordMock).toHaveBeenCalledWith(
        loginPayload.email,
        loginPayload.password
      );
    });

    it("If credentials are invalid, return 401 status", async () => {
      const validatePasswordMock = vi
        .spyOn(UserService, "validatePassword")
        .mockResolvedValue({ valid: false, error: "Invalid credentials" });
      const createSessionMock = vi.spyOn(SessionService, "createSession");

      const { statusCode } = await supertest(app)
        .post("/api/sessions/login")
        .send(loginPayload);

      expect(statusCode).toBe(StatusCode.UNAUTHORIZED);
      expect(createSessionMock).not.toHaveBeenCalled();
      expect(validatePasswordMock).toHaveBeenCalledWith(
        loginPayload.email,
        loginPayload.password
      );
    });
  });
});
