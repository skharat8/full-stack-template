import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUser } from "@/services/apiAuth";
import type { UserSignup } from "@/schemas/auth.zod";

function useSignup() {
  const { mutate: signup, isPending: isSignupPending } = useMutation({
    mutationFn: (signupData: UserSignup) => createUser(signupData),
    onSuccess: () => {
      toast.success("Account successfully created! Please log in", {
        duration: 5000,
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error(
        "Failed to create new account! Username or email already exists",
        { style: { background: "pink" } },
      );
    },
  });

  return { signup, isSignupPending };
}

export default useSignup;
