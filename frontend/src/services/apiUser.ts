import { userSchema } from "@/schemas/auth.zod";
import createAxiosInstance from "@/utils/axios.utils";

const api = createAxiosInstance();

export async function getCurrentUser() {
  const res = await api.get("api/users/me");
  return userSchema.parse(res.data);
}

export async function getUser(userId: string) {
  const res = await api.get(`api/users/:${userId}`);
  return userSchema.parse(res.data);
}
