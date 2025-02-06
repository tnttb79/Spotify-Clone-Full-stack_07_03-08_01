import { links } from "../assets/constants";
import { logo } from "../assets";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

const NavLinks = () => (
  <div className="flex flex-col">
    {links.map((link) => (
      <NavLink
        key={link.to}
        to={link.to}
        className="flex flex-row justify-start items-center my-2 text-sm font-medium text-gray-400 hover:text-cyan-400"
      >
        <link.icon className="w-6 h-6 mr-2" />
        {link.name}
      </NavLink>
    ))}
  </div>
);
const Sidebar = () => {
  const [mobileCollapse, setMobileCollapse] = useState(false);

  return (
    <>
      <div className="hidden md:flex flex-col w-[240px] px-4 py-10 bg-[#191624]">
        <img src={logo} className="w-full h-14 object-contain mb-5" />
        <NavLinks />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden absolute top-4 right-3">
        {!mobileCollapse ? (
          <HiOutlineMenu
            className="w-10 h-10 z-100 text-white"
            onClick={() => setMobileCollapse(true)}
          />
        ) : (
          <RiCloseLine
            className="w-10 h-10 z-100 text-white"
            onClick={() => setMobileCollapse(false)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-sm z-10 p-6 smooth-transition md:hidden ${
          !mobileCollapse && "hidden"
        }`}
      >
        <img
          src={logo}
          alt="logo"
          className="w-full h-14 object-contain mb-5"
        />
        <NavLinks />
      </div>
    </>
  );
};
export default Sidebar;
