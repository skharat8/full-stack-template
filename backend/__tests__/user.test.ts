import { describe, expect, it, vi } from "vitest";
import supertest from "supertest";
import mongoose from "mongoose";

import createServer from "../server";
import StatusCode from "../data/enums";
import * as UserService from "../services/user.service";
import type { SafeDbUser, UserSignup } from "../schemas/user.zod";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const signupPayload: UserSignup = {
  username: "test_name",
  password: "test_password",
  passwordConfirmation: "test_password",
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@gmail.com",
};

// @ts-expect-error Not including common DB fields like createdAt
const responsePayload: SafeDbUser = {
  id: userId,
  username: "test_name",
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@gmail.com",
};

describe("User", () => {
  describe("Create user route", () => {
    it("If all fields are valid, return 201 status with payload", async () => {
      const createUserMock = vi
        .spyOn(UserService, "createUser")
        .mockResolvedValue(responsePayload);

      // eslint-disable-next-line
      const { statusCode, body } = await supertest(app)
        .post("/api/users")
        .send(signupPayload);

      expect(statusCode).toBe(StatusCode.CREATED);
      expect(body).toEqual(responsePayload);
      expect(createUserMock.mock.calls.length).toBe(1);
      expect(createUserMock).toHaveBeenCalledWith(signupPayload);
    });

    it("If password and password confirmation don't match, return 400 status", async () => {
      const createUserMock = vi
        .spyOn(UserService, "createUser")
        .mockResolvedValue(responsePayload);

      const badPayload = { ...signupPayload, password: "oops" };

      const { statusCode } = await supertest(app)
        .post("/api/users")
        .send(badPayload);

      expect(statusCode).toBe(StatusCode.BAD_REQUEST);
      expect(createUserMock).not.toHaveBeenCalled();
    });

    it("If any fields are missing, return 400 status", async () => {
      const createUserMock = vi
        .spyOn(UserService, "createUser")
        .mockResolvedValue(responsePayload);

      const { username, ...incompletePayload } = signupPayload;

      const { statusCode } = await supertest(app)
        .post("/api/users")
        .send(incompletePayload);

      expect(statusCode).toBe(StatusCode.BAD_REQUEST);
      expect(createUserMock).not.toHaveBeenCalled();
    });

    it("If user service fails to create a new user, return 409 status", async () => {
      const createUserMock = vi
        .spyOn(UserService, "createUser")
        .mockRejectedValue(
          new mongoose.mongo.MongoError("Failed to create new user!")
        );

      const { statusCode } = await supertest(app)
        .post("/api/users")
        .send(signupPayload);

      expect(statusCode).toBe(StatusCode.CONFLICT);
      expect(createUserMock).toHaveBeenCalled();
    });
  });
});
