import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/apiUser";

function useUser() {
  const queryClient = useQueryClient();

  const {
    data: user,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  queryClient.setQueryData(["user", "isAuthenticated"], isSuccess);
  const { data: isAuthenticated } = useQuery({
    queryKey: ["user", "isAuthenticated"],
  });

  return { user, isPending, isAuthenticated };
}

export default useUser;
