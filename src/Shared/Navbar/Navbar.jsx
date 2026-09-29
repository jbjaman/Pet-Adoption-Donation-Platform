import { useContext, useState } from "react";
import { BiDonateHeart } from "react-icons/bi";
import { FaPaw } from "react-icons/fa";
import { FiHome, FiMenu, FiX } from "react-icons/fi";
import { PiGraduationCapBold } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
        setMobileMenu(false);
      })
      .catch((error) => console.log(error));
  };

  const navItems = [
    {
      to: "/",
      label: "Home",
      icon: <FiHome />,
    },
    {
      to: "/petlist",
      label: "Pet Listing",
      icon: <FaPaw />,
    },
    {
      to: "/dtncamp",
      label: "Donation",
      icon: <BiDonateHeart />,
    },
    {
      to: "/education",
      label: "Education",
      icon: <PiGraduationCapBold />,
    },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3"
          onClick={() => setMobileMenu(false)}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50">
            <img
              src="https://i.ibb.co/bdCZb5J/petlogo.png"
              alt="Paw logo"
              className="h-8 w-8 object-contain"
            />
          </div>

          <div className="hidden sm:block">
            <p className="text-xl font-extrabold leading-none text-slate-800">
              Paw
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700">
              Pet Care & Adoption
            </p>
          </div>
        </NavLink>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  isActive
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-teal-700"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop user area */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <NavLink
                to="/dashboard/addpet"
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:border-teal-200 hover:bg-teal-50"
              >
                <div className="h-9 w-9 overflow-hidden rounded-full bg-slate-100">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="max-w-[120px]">
                  <p className="truncate text-sm font-bold text-slate-800">
                    {user.displayName}
                  </p>
                  <p className="text-[11px] text-teal-700">Dashboard</p>
                </div>
              </NavLink>

              <button
                onClick={handleLogOut}
                className="rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="rounded-xl px-4 py-2.5 text-sm font-bold text-teal-700 transition hover:bg-teal-50"
              >
                Log In
              </NavLink>

              <NavLink
                to="/signup"
                className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-xl text-slate-700 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenu ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg lg:hidden">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${
                    isActive ? "bg-teal-50 text-teal-700" : "text-slate-600"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-3 border-t border-slate-100 pt-3">
            {user ? (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                >
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-teal-700">Open Dashboard</p>
                  </div>
                </NavLink>

                <button
                  onClick={handleLogOut}
                  className="mt-2 w-full rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="rounded-xl border border-teal-200 px-4 py-3 text-center text-sm font-bold text-teal-700"
                >
                  Log In
                </NavLink>

                <NavLink
                  to="/signup"
                  onClick={() => setMobileMenu(false)}
                  className="rounded-xl bg-teal-700 px-4 py-3 text-center text-sm font-bold text-white"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
