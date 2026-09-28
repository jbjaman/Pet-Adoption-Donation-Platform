import { useQuery } from "@tanstack/react-query";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdOutlinePause, MdPlayArrow } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const AllDonation = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: donations = [], refetch } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  const handlePauseDon = async (don) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Stop the Donation",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const updateDon = {
          name: don.name,
          maxdonation: don.maxdonation,
          lastdate: don.lastdate,
          shortdescription: don.shortdescription,
          longdescription: don.longdescription,
          image: don.image,
          time: don.time,
          email: don.email,
          donstatus: "false",
        };

        axiosSecure.put(`/donations/${don._id}`, updateDon).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Paused",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handleDeleteDon = (donat) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donations/${donat._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "Campaign has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Administration
          </p>

          <h1 className="mt-1 text-2xl font-extrabold text-slate-800">
            All Donations
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage active and paused donation campaigns.
          </p>
        </div>

        <div className="w-fit rounded-xl bg-teal-50 px-4 py-3">
          <p className="text-xs font-semibold text-teal-700">Campaigns</p>

          <p className="text-2xl font-extrabold text-teal-900">
            {donations.length}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  #
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Campaign
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Target
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Progress
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {donations.map((item, index) => (
                <tr key={item._id} className="transition hover:bg-slate-50/70">
                  <td className="px-5 py-4 text-sm font-semibold text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 overflow-hidden rounded-xl bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-bold text-slate-800">{item.name}</p>
                        <p className="text-xs text-slate-400">
                          Donation campaign
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                    {item.maxdonation}/=
                  </td>

                  <td className="px-5 py-4">
                    <div className="min-w-[150px]">
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="font-semibold text-slate-500">
                          Progress
                        </span>
                        <span className="font-bold text-teal-700">280/=</span>
                      </div>

                      <progress
                        className="h-2 progress progress-success w-full overflow-hidden rounded-full"
                        value={280}
                        max={item.maxdonation}
                      />
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    {item.donstatus === true ? (
                      <span className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
                        Paused
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      {item.donstatus === true ? (
                        <button
                          onClick={() => handlePauseDon(item)}
                          title="Pause"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-200 text-teal-700 transition hover:bg-teal-700 hover:text-white"
                        >
                          <MdPlayArrow />
                        </button>
                      ) : (
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                          <MdOutlinePause />
                        </span>
                      )}

                      <NavLink
                        to={`/dashboard/updatemycampaigns/${item._id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-200 text-amber-600 transition hover:bg-amber-500 hover:text-white"
                        title="Update"
                      >
                        <FaRegEdit />
                      </NavLink>

                      <button
                        onClick={() => handleDeleteDon(item)}
                        title="Delete"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-500 hover:text-white"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {donations.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="font-bold text-slate-700">No donation campaigns</p>

            <p className="mt-1 text-sm text-slate-400">
              Donation campaigns will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllDonation;
