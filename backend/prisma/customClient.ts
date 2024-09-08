import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
}).$extends({
  query: {
    user: {
      async $allOperations({ operation, args, query }) {
        // Generate hashed password before saving to the database.
        if (
          (operation === "create" || operation === "update") &&
          args.data.password &&
          typeof args.data.password === "string"
        ) {
          const SALT_LENGTH = 10;
          args.data.password = await bcrypt.hash(
            args.data.password,
            SALT_LENGTH,
          );
        }

        return query(args);
      },
    },
  },
  result: {
    user: {
      fullName: {
        needs: { firstName: true, lastName: true },
        compute(user) {
          return `${user.firstName} ${user.lastName}`;
        },
      },

      isValidPassword: {
        needs: { password: true },
        compute(user) {
          return async (inputPassword: string): Promise<boolean> =>
            bcrypt.compare(inputPassword, user.password);
        },
      },
    },
  },
});

export default prisma;
