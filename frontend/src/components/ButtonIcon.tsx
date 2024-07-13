import clsx from "clsx";

function ButtonIcon({
  onClick,
  disabled,
  hoverTwColor,
  className,
  children,
}: ButtonIconProps) {
  const hoverColor = hoverTwColor ?? "hover:bg-zinc-200";
  const baseStyles = `rounded-lg p-2 transition ${hoverColor} [&_svg]:h-5
  [&_svg]:w-5 [&_svg]:text-primary-900`;

  const classNames = clsx(baseStyles, className);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={classNames}
    >
      {children}
    </button>
  );
}

type ButtonIconProps = {
  onClick: () => void;
  disabled?: boolean;
  hoverTwColor?: string;
  className?: string;
  children: React.ReactNode;
};

export default ButtonIcon;
