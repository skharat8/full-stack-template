import Button from "@/components/Button";
import type { AuthType } from "@/data/types";

function AuthLink({ authType, onAuthToggle }: AuthLinkProps) {
  const linkTo = authType === "signup" ? "Login" : "Register";

  return (
    <p>
      {authType === "signup" ? "Already" : "Don't"} have an account?{" "}
      <Button variant="link" onClick={onAuthToggle}>
        {linkTo}
      </Button>
    </p>
  );
}

type AuthLinkProps = {
  authType: AuthType;
  onAuthToggle: () => void;
};

export default AuthLink;
