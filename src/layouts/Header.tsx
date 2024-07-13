import type { PropsWithChildren } from "react";

import LogoutButton from "@/features/authentication/LogoutButton";
import Avatar from "@/components/Avatar";
import Logo from "@/components/Logo";
import styles from "./Header.module.css";

function Title({ children }: PropsWithChildren) {
  return (
    <h1 className="font-noticia text-2xl font-bold tracking-wide text-zinc-300">
      {children}
    </h1>
  );
}

function Header() {
  return (
    <header
      className={`${styles.linearGradient} flex items-center justify-between px-16px py-8px
        shadow-md`}
    >
      <Avatar size="small" />

      <div className="flex items-center gap-2">
        <Title>Twitter</Title>
        <Logo width="2.5rem" />
        <Title>Reborn</Title>
      </div>

      <LogoutButton />
    </header>
  );
}

export default Header;
