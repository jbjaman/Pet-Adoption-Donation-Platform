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

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Make this user Admin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008080",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is admin now`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handleBanUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Ban this user",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008080",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `You Banned ${user.name}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Administration
          </p>

          <h1 className="mt-1 text-2xl font-extrabold text-slate-800">
            All Users
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage user roles and account access.
          </p>
        </div>

        <div className="w-fit rounded-xl bg-teal-50 px-4 py-3">
          <p className="text-xs font-semibold text-teal-700">Total Users</p>
          <p className="text-2xl font-extrabold text-teal-900">{user.length}</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  #
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  User
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Email
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Role
                </th>
                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {user.map((item, index) => (
                <tr key={item._id} className="transition hover:bg-slate-50/70">
                  <td className="px-5 py-4 text-sm font-semibold text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-bold text-slate-800">{item.name}</p>
                        <p className="text-xs text-slate-400">Paw member</p>
                      </div>
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
                    ) : item.role === "ban" ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                        <FaUserSlash />
                        Banned
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                        User
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      {item.role === "admin" ? (
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-slate-50">
                          <FaUserShield />
                        </span>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(item)}
                          title="Make Admin"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-200 text-teal-700 transition hover:bg-teal-600 hover:text-white"
                        >
                          <FaUserGear />
                        </button>
                      )}

                      {item.role === "ban" ? (
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500 text-slate-50">
                          <FaUserSlash />
                        </span>
                      ) : (
                        <button
                          onClick={() => handleBanUser(item)}
                          title="Ban User"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-500 hover:text-white"
                        >
                          <FaUserSlash />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {user.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="font-bold text-slate-700">No users found</p>
            <p className="mt-1 text-sm text-slate-400">
              There are currently no users to display.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllUsers;
