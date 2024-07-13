import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

import useUser from "@/hooks/useUser";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { isPending, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !isAuthenticated) navigate("/login");
  }, [isPending, isAuthenticated, navigate]);

  if (isPending) return <HashLoader color="#b63b63" />;

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
