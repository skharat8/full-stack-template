import { RiLogoutBoxRLine } from "react-icons/ri";

import ButtonIcon from "@/components/ButtonIcon";
import SpinnerMini from "@/components/SpinnerMini";
import useLogout from "./useLogout";

function LogoutButton() {
  const { logout, isLogoutPending } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isLogoutPending}>
      {isLogoutPending ? <SpinnerMini /> : <RiLogoutBoxRLine />}
    </ButtonIcon>
  );
}

export default LogoutButton;
