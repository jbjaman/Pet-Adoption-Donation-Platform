import { useContext, useState } from "react";
import { BiDonateHeart } from "react-icons/bi";
import { FaBars, FaPaw, FaTimes, FaUserCircle } from "react-icons/fa";
import { FiBookOpen, FiGrid, FiHome, FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setOpen(false);
        navigate("/");
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
      label: "Find Pets",
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
      icon: <FiBookOpen />,
    },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-teal-50 text-teal-700"
        : "text-slate-600 hover:bg-slate-50 hover:text-teal-700"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="page-container">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-teal-50">
              <img
                src="https://i.ibb.co/bdCZb5J/petlogo.png"
                alt="Paw logo"
                className="h-9 w-9 object-contain"
              />
            </div>

            <div className="hidden sm:block">
              <p className="text-xl font-extrabold leading-none text-slate-900">
                Paw<span className="text-teal-600">Care</span>
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Find a friend
              </p>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop User Area */}
          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <>
                <NavLink
                  to="/dashboard/addpet"
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 transition hover:border-teal-100 hover:bg-teal-50"
                >
                  <div className="h-9 w-9 overflow-hidden rounded-full bg-teal-100">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="h-full w-full text-teal-600" />
                    )}
                  </div>

                  <div className="max-w-[130px]">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-slate-400">Dashboard</p>
                  </div>
                </NavLink>

                <button
                  onClick={handleLogOut}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-red-100 hover:bg-red-50 hover:text-red-500"
                  title="Logout"
                >
                  <FiLogOut />
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-teal-700"
                >
                  Log in
                </NavLink>

                <NavLink to="/signup" className="primary-btn px-5 py-2.5">
                  Get Started
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="border-t border-slate-100 py-4 lg:hidden">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={linkClass}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}

              {user ? (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className={linkClass}
                  >
                    <FiGrid />
                    Dashboard
                  </NavLink>

                  <button
                    onClick={handleLogOut}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-500 hover:bg-red-50"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </>
              ) : (
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="secondary-btn"
                  >
                    Log in
                  </NavLink>

                  <NavLink
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="primary-btn"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
