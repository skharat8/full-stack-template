import { useState } from "react";
import { Toaster } from "react-hot-toast";

import type { AuthType } from "@/data/types";
import AuthForm from "./AuthForm";
import AuthLink from "./AuthLink";
import styles from "./Auth.module.css";

function Auth() {
  const [authType, setAuthType] = useState<AuthType>("login");

  function onAuthToggle() {
    setAuthType((prevAuthType) =>
      prevAuthType === "login" ? "signup" : "login",
    );
  }

  return (
    <div className={styles.container}>
      <Toaster />
      <h2 className={styles.header}>{authType}</h2>
      <div className={styles.divider} />
      <AuthForm authType={authType} onAuthToggle={onAuthToggle} />
      <AuthLink authType={authType} onAuthToggle={onAuthToggle} />
    </div>
  );
}

export default Auth;
