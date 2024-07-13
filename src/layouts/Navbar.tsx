import {
  RiUser3Line,
  RiUser3Fill,
  RiHome2Line,
  RiHome2Fill,
  RiSearchLine,
  RiSearchFill,
} from "react-icons/ri";

import NavbarItem from "@/components/NavbarItem";

function Navbar() {
  const iconSize = "1.2rem";

  return (
    <nav className="flex border-t-2 border-primary-800">
      <NavbarItem
        to="/profile"
        item={<RiUser3Line size={iconSize} />}
        selectedItem={<RiUser3Fill size={iconSize} />}
      />
      <NavbarItem
        to="/"
        item={<RiHome2Line size={iconSize} />}
        selectedItem={<RiHome2Fill size={iconSize} />}
      />
      <NavbarItem
        to="/search"
        item={<RiSearchLine size={iconSize} />}
        selectedItem={<RiSearchFill size={iconSize} />}
      />
    </nav>
  );
}

export default Navbar;
