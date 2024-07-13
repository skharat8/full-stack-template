import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "@/components/Logo";
import Auth from "@/features/authentication/Auth";
import useUser from "@/hooks/useUser";

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="centered-container">
      <h1 className="main-title">A modern Twitter experience</h1>
      <Logo marginBottom="1.5em" hasHoverEffect />
      <Auth />
    </div>
  );
}

export default Login;
