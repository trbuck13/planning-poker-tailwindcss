import React, { useState, useContext, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "providers/Session";

const Navbar = () => {
  const { user, logoutMethod } = useContext(SessionContext);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (!user?.displayName) setAnchorEl(null);
  }, [user]);

  return (
    <>
      <header class="pb-24 bg-gradient-to-r from-light-blue-800 to-cyan-600">
        <nav className="">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link
                    to="/"
                    className="text-white font-bold text-lg tracking-wider"
                  >
                    Point 👆
                  </Link>
                </div>
              </div>
              {user?.displayName && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="ml-3 relative">
                    <div>
                      <button
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        type="button"
                        className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        id="user-menu"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          src={user.photoURL}
                          className="h-8 w-8 rounded-full"
                          alt={user.displayName}
                          title={user.displayName}
                        />
                      </button>
                    </div>
                    <div
                      className={`${
                        anchorEl ? "block" : "hidden"
                      } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <a
                        onClick={() => logoutMethod()}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default memo(Navbar);
