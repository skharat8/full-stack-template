import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUserSession } from "@/services/apiAuth";
import type { UserLogin } from "@/schemas/auth.zod";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationFn: (loginData: UserLogin) => createUserSession(loginData),
    onSuccess: user => {
      queryClient.setQueryData(["user"], user);
      queryClient.setQueryData(["user", "isAuthenticated"], true);
      navigate("/", { replace: true });
    },
    onError: err => {
      console.error(err);
      toast.error(err.message, { style: { background: "pink" } });
    },
  });

  return { login, isLoginPending };
}

export default useLogin;
