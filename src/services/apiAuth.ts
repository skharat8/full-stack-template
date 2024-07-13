import { userSchema } from "@/schemas/auth.zod";
import type { User, UserLogin, UserSignup } from "@/schemas/auth.zod";
import createAxiosInstance from "@/utils/axios.utils";

const api = createAxiosInstance();

export async function createUser(data: UserSignup): Promise<User> {
  const res = await api.post("api/users", data);
  // TODO: Handle displaying zod errors
  return userSchema.parse(res.data);
}

export async function createUserSession(data: UserLogin): Promise<User> {
  const res = await api.post("api/sessions/login", data);
  return userSchema.parse(res.data);
}

export async function deleteUserSession() {
  await api.delete("api/sessions/logout");
}
