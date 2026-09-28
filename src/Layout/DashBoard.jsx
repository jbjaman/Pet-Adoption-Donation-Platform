import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaBookOpen,
  FaBullhorn,
  FaClipboardList,
  FaDonate,
  FaGraduationCap,
  FaUsers,
} from "react-icons/fa";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { MdAdminPanelSettings, MdOutlinePets, MdPets } from "react-icons/md";
import { NavLink, Outlet, useLoaderData, useNavigate } from "react-router-dom";

import UseAuthor from "../Hooks/UseAuthor";
import Navbar from "../Shared/Navbar/Navbar";

const DashBoard = () => {
  const { user, logOut } = UseAuthor();
  const navigate = useNavigate();
  const loadUser = useLoaderData();
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const logUser = loadUser.filter((myemail) => myemail.email === user.email);

  const isAdmin = logUser[0]?.role === "admin";

  const mainMenu = [
    {
      to: "/dashboard/addpet",
      label: "Add Pet",
      icon: <MdPets />,
    },
    {
      to: "/dashboard/mypets",
      label: "My Pets",
      icon: <MdOutlinePets />,
    },
    {
      to: "/dashboard/mydonation",
      label: "My Donation",
      icon: <FaDonate />,
    },
    {
      to: "/dashboard/mycampaigns",
      label: "My Campaigns",
      icon: <FaBullhorn />,
    },
    {
      to: "/dashboard/createcampaign",
      label: "Create Campaign",
      icon: <FaClipboardList />,
    },
    {
      to: "/dashboard/adoptionreq",
      label: "Adoption Request",
      icon: <FaClipboardList />,
    },
    {
      to: "/dashboard/createcourse",
      label: "Create Course",
      icon: <FaGraduationCap />,
    },
    {
      to: "/dashboard/mycourses",
      label: "My Courses",
      icon: <FaBookOpen />,
    },
    {
      to: "/dashboard/enrolledcourses",
      label: "Enrolled Courses",
      icon: <FaGraduationCap />,
    },
  ];

  const adminMenu = [
    {
      to: "/dashboard/allusers",
      label: "All Users",
      icon: <FaUsers />,
    },
    {
      to: "/dashboard/allpets",
      label: "All Pets",
      icon: <MdPets />,
    },
    {
      to: "/dashboard/alldonation",
      label: "All Donations",
      icon: <FaDonate />,
    },
    {
      to: "/dashboard/allcourses",
      label: "All Courses",
      icon: <FaBookOpen />,
    },
  ];

  const MenuItem = ({ item }) => (
    <NavLink
      to={item.to}
      onClick={() => setMobileMenu(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
          isActive
            ? "bg-teal-700 text-white shadow-sm"
            : "text-slate-600 hover:bg-teal-50 hover:text-teal-700"
        }`
      }
    >
      <span className="text-lg">{item.icon}</span>
      <span>{item.label}</span>
    </NavLink>
  );

  return (
    <>
      <Helmet>
        <title>Paw | Dashboard</title>
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-slate-50 pt-[76px]">
        {/* Mobile dashboard menu */}
        <div className="border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700"
          >
            <span className="flex items-center gap-2">
              <FiMenu />
              Dashboard Menu
            </span>

            {mobileMenu ? <FiX /> : null}
          </button>

          {mobileMenu && (
            <div className="mt-3 space-y-1">
              {mainMenu.map((item) => (
                <MenuItem key={item.to} item={item} />
              ))}

              {isAdmin && (
                <>
                  <div className="my-3 flex items-center gap-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <MdAdminPanelSettings className="text-lg" />
                    Administration
                  </div>

                  {adminMenu.map((item) => (
                    <MenuItem key={item.to} item={item} />
                  ))}
                </>
              )}

              <button
                onClick={handleLogOut}
                className="mt-3 flex w-full items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="mx-auto flex max-w-[1600px]">
          {/* Desktop sidebar */}
          <aside className="sticky top-[76px] hidden h-[calc(100vh-76px)] w-64 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-4 lg:block">
            <div className="mb-6 rounded-2xl bg-gradient-to-br from-teal-700 to-teal-900 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-100">
                Dashboard
              </p>

              <p className="mt-2 truncate text-lg font-bold">
                {user.displayName}
              </p>

              <p className="mt-1 truncate text-xs text-teal-100">
                {user.email}
              </p>
            </div>

            <nav className="space-y-1">
              {mainMenu.map((item) => (
                <MenuItem key={item.to} item={item} />
              ))}
            </nav>

            {isAdmin && (
              <>
                <div className="my-5 border-t border-slate-100 pt-5">
                  <div className="mb-2 flex items-center gap-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <MdAdminPanelSettings className="text-lg" />
                    Administration
                  </div>

                  <div className="space-y-1">
                    {adminMenu.map((item) => (
                      <MenuItem key={item.to} item={item} />
                    ))}
                  </div>
                </div>
              </>
            )}

            <button
              onClick={handleLogOut}
              className="mt-6 flex w-full items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
            >
              <FiLogOut />
              Logout
            </button>
          </aside>

          {/* Main dashboard content */}
          <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
