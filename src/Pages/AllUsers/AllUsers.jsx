import { useQuery } from "@tanstack/react-query";
import { FaUserGear, FaUserShield, FaUserSlash } from "react-icons/fa6";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const AllUsers = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: user = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (selectedUser) => {
    Swal.fire({
      title: "Make this user an admin?",
      text: "The user will receive admin privileges.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${selectedUser._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${selectedUser.name} is an admin now`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handleBanUser = (selectedUser) => {
    Swal.fire({
      title: "Ban this user?",
      text: "This user will be marked as banned.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Ban User",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${selectedUser._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `You banned ${selectedUser.name}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
            Administration
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
            All Users
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage user roles and account access.
          </p>
        </div>

        <div className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          {user.length} {user.length === 1 ? "User" : "Users"}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">#</th>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Account</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {user.map((item, index) => (
                <tr key={item._id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <p className="font-semibold text-slate-800">
                        {item.name}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {item.email}
                  </td>

                  <td className="px-5 py-4">
                    {item.role === "admin" ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
                        <FaUserShield />
                        Admin
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(item)}
                        className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-white px-3 py-2 text-xs font-semibold text-teal-700 transition hover:bg-teal-700 hover:text-white"
                      >
                        <FaUserGear />
                        Make Admin
                      </button>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    {item.role === "ban" ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                        <FaUserSlash />
                        Banned
                      </span>
                    ) : (
                      <button
                        onClick={() => handleBanUser(item)}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                      >
                        <FaUserSlash />
                        Ban User
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {user.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="font-semibold text-slate-700">No users found</p>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {user.map((item, index) => (
          <div
            key={item._id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-slate-800">{item.name}</p>

                    <p className="mt-1 truncate text-sm text-slate-500">
                      {item.email}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-slate-400">
                    #{index + 1}
                  </span>
                </div>

                <div className="mt-3">
                  {item.role === "admin" ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
                      <FaUserShield />
                      Admin
                    </span>
                  ) : item.role === "ban" ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                      <FaUserSlash />
                      Banned
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      User
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              {item.role !== "admin" && item.role !== "ban" ? (
                <button
                  onClick={() => handleMakeAdmin(item)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-3 py-2.5 text-xs font-semibold text-white"
                >
                  <FaUserGear />
                  Make Admin
                </button>
              ) : (
                <div />
              )}

              {item.role !== "ban" ? (
                <button
                  onClick={() => handleBanUser(item)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-600"
                >
                  <FaUserSlash />
                  Ban User
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
