import { NavLink } from "react-router-dom";

function NavbarItem({ to, item, selectedItem }: NavbarItemProps) {
  const baseStyles = `flex flex-grow items-center justify-center border-r-2 border-primary-800 py-10px
  text-primary-50 hover:text-primary-50 hover:bg-accentPink-700`;

  const inactiveStyles = `${baseStyles} bg-primary-500`;
  const activeStyles = `${baseStyles} bg-accentPink-700 `;

  function getNavLinkStyles({ isActive }: { isActive: boolean }) {
    return isActive ? activeStyles : inactiveStyles;
  }

  return (
    <NavLink to={to} className={getNavLinkStyles}>
      {({ isActive }) => (isActive ? selectedItem : item)}
    </NavLink>
  );
}

type NavbarItemProps = {
  to: string;
  item: React.ReactElement;
  selectedItem: React.ReactElement;
};

export default NavbarItem;
