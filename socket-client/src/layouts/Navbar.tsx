import React from "react";
import { Link, NavLink, useLocation } from "react-router";

function Navbar() {
  // landing page

  const trackLink = useLocation().pathname;

  const links = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Find", path: "/find" },
    { id: 3, name: "How Work", path: "/how-work" },
    { id: 4, name: "Donation", path: "/donation" },
  ];

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
                 {links.map((item, key) => (
              <div key={item.id} className="flex items-center gap-x-10 gap-8">
                <Link
                  className={`${
                    item.path === trackLink
                      ? " text-green-500 font-medium"
                      : "text-black font-medium"
                  }`}
                  to={item.path}
                >
                  {item.name}
                </Link>
              </div>
            ))}
             

            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
             {links.map((item, key) => (
              <div key={item.id} className="flex items-center gap-x-10 gap-8">
                <Link
                  className={`${
                    item.path === trackLink
                      ? " text-green-500 font-medium"
                      : "text-black font-medium ml-8"
                  }`}
                  to={item.path}
                >
                  {item.name}
                </Link>
              </div>
            ))}
        
         
          </ul>
    
        </div>

        <div className="navbar-end">
          <a className="btn">Log out</a>


          
        </div>
      </div>
    </div>
  );
}

export default Navbar;
