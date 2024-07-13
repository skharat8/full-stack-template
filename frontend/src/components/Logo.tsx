import logo from "@images/app-logo-96x96.png";
import tw from "@/utils/string.utils";

function Logo({
  width = "3.9rem",
  marginBottom = "",
  hasHoverEffect = false,
}: LogoProps) {
  let hoverStyles = "";
  if (hasHoverEffect) {
    hoverStyles = tw`transform transition duration-300 will-change-transform hover:scale-110
    hover:transform hover:drop-shadow-logo`;
  }

  return (
    <img
      className={hoverStyles}
      style={{ width, marginBottom }}
      src={logo}
      alt="Main App Logo"
    />
  );
}

type LogoProps = {
  width?: string;
  marginBottom?: string;
  hasHoverEffect?: boolean;
};

export default Logo;
