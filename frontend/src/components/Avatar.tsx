import tw from "@/utils/string.utils";
import AvatarMale from "@images/avatar-male.svg";
import clsx from "clsx";

function Avatar({ size = "medium", className }: AvatarProps) {
  const avatarSize = {
    small: "35rem",
    medium: "40rem",
    large: "70rem",
  };

  const baseStyles = tw`bg-accentPink-600 overflow-hidden rounded-full shadow-sm`;
  const styles = clsx(baseStyles, className);

  return (
    <img
      src={AvatarMale}
      alt="Your Profile Avatar"
      width={avatarSize[size]}
      height={avatarSize[size]}
      className={styles}
    />
  );
}

type AvatarProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

export default Avatar;
