import { Helmet } from "react-helmet-async";
import {
  FiBookOpen,
  FiDollarSign,
  FiHeart,
  FiHome,
  FiLogOut,
  FiPlusCircle,
  FiSend,
  FiUsers,
} from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { NavLink, Outlet, useLoaderData, useNavigate } from "react-router-dom";

import UseAuthor from "../Hooks/UseAuthor";
import Navbar from "../Shared/Navbar/Navbar";

const DashBoard = () => {
  const { user, logOut } = UseAuthor();
  const navigate = useNavigate();
  const loadUser = useLoaderData([]);

  const currentUser = loadUser?.find((item) => item.email === user?.email);

  const isAdmin = currentUser?.role === "admin";

  const handleLogOut = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  };

  const menuItems = [
    {
      label: "Add Pet",
      to: "/dashboard/addpet",
      icon: <FiPlusCircle />,
    },
    {
      label: "My Pets",
      to: "/dashboard/mypets",
      icon: <FiHeart />,
    },
    {
      label: "My Donations",
      to: "/dashboard/mydonation",
      icon: <FiDollarSign />,
    },
    {
      label: "My Campaigns",
      to: "/dashboard/mycampaigns",
      icon: <FiSend />,
    },
    {
      label: "Create Campaign",
      to: "/dashboard/createcampaign",
      icon: <FiPlusCircle />,
    },
    {
      label: "Adoption Requests",
      to: "/dashboard/adoptionreq",
      icon: <FiHeart />,
    },
    {
      label: "Create Course",
      to: "/dashboard/createcourse",
      icon: <FiBookOpen />,
    },
    {
      label: "My Courses",
      to: "/dashboard/mycourses",
      icon: <FiBookOpen />,
    },
    {
      label: "Enrolled Courses",
      to: "/dashboard/enrolledcourses",
      icon: <FiBookOpen />,
    },
  ];

  const adminItems = [
    {
      label: "All Users",
      to: "/dashboard/allusers",
      icon: <FiUsers />,
    },
    {
      label: "All Pets",
      to: "/dashboard/allpets",
      icon: <FiHeart />,
    },
    {
      label: "All Donations",
      to: "/dashboard/alldonation",
      icon: <FiDollarSign />,
    },
    {
      label: "All Courses",
      to: "/dashboard/allcourses",
      icon: <FiBookOpen />,
    },
  ];

  const navItemClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
      isActive
        ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20"
        : "text-slate-500 hover:bg-teal-50 hover:text-teal-700"
    }`;

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Paw | Dashboard</title>
      </Helmet>

      <Navbar />

      <div className="mx-auto flex max-w-[1600px]">
        {/* Sidebar */}
        <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] w-72 shrink-0 overflow-y-auto border-r border-slate-100 bg-white p-5 lg:block">
          {/* Profile */}
          <div className="mb-6 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 p-5 text-white">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-white/30 bg-white/10">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-bold">
                    {user?.displayName?.charAt(0)?.toUpperCase()}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate font-bold">
                  {user?.displayName || "User"}
                </p>

                <p className="truncate text-xs text-teal-100">
                  {isAdmin ? "Administrator" : "Pet lover"}
                </p>
              </div>
            </div>
          </div>

          {/* Main */}
          <div>
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Workspace
            </p>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={navItemClass}>
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Admin */}
          {isAdmin && (
            <div className="mt-7 border-t border-slate-100 pt-6">
              <div className="mb-3 flex items-center gap-2 px-3 text-slate-400">
                <MdAdminPanelSettings className="text-lg" />

                <p className="text-[11px] font-bold uppercase tracking-widest">
                  Administration
                </p>
              </div>

              <nav className="space-y-1">
                {adminItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className={navItemClass}>
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={handleLogOut}
            className="mt-7 flex w-full items-center gap-3 rounded-xl border border-red-100 px-3 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <FiLogOut />
            Logout
          </button>
        </aside>

        {/* Mobile sidebar / top nav */}
        <div className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-32px)] max-w-md -translate-x-1/2 items-center justify-around rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur lg:hidden">
          <NavLink
            to="/dashboard"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-teal-50 hover:text-teal-700"
          >
            <FiHome />
          </NavLink>

          <NavLink
            to="/dashboard/addpet"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-teal-50 hover:text-teal-700"
          >
            <FiPlusCircle />
          </NavLink>

          <NavLink
            to="/dashboard/mypets"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-teal-50 hover:text-teal-700"
          >
            <FiHeart />
          </NavLink>

          <NavLink
            to="/dashboard/mycourses"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-teal-50 hover:text-teal-700"
          >
            <FiBookOpen />
          </NavLink>

          <button
            onClick={handleLogOut}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-red-500 hover:bg-red-50"
          >
            <FiLogOut />
          </button>
        </div>

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="min-h-[calc(100vh-120px)] rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
