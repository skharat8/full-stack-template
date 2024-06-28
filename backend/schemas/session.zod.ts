import { z } from "zod";
import { createUserSchema } from "./user.zod";

const userSignupSchema = createUserSchema.shape.body;
const userLoginSchema = userSignupSchema.pick({ email: true, password: true });

const createSessionSchema = z.object({ body: userLoginSchema });

type UserLogin = z.infer<typeof userLoginSchema>;

export type { UserLogin };
export { createSessionSchema };
