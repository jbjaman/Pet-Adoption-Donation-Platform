import { useQuery } from "@tanstack/react-query";
import { FaRegEdit } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { MdDelete, MdOutlinePause, MdPlayArrow } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const AllDonation = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    data: donations = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  const handlePauseDon = async (don) => {
    const result = await Swal.fire({
      title: "Pause this campaign?",
      text: "The campaign will no longer accept active donations.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, pause it",
      cancelButtonText: "Cancel",
    });

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

      const res = await axiosSecure.put(`/donations/${don._id}`, updateDon);

      if (res.data.modifiedCount > 0) {
        refetch();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Campaign Paused",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const handleDeleteDon = async (donat) => {
    const result = await Swal.fire({
      title: "Delete this campaign?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/donations/${donat._id}`);

      if (res.data.deletedCount > 0) {
        refetch();

        Swal.fire({
          title: "Deleted!",
          text: "Campaign has been deleted.",
          icon: "success",
          confirmButtonColor: "#0f766e",
        });
      }
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-800">
          <FaSackDollar />
          Campaign Administration
        </span>

        <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
          All Donation Campaigns
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage, update, pause, or delete donation campaigns.
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-700" />
          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading campaigns...
          </p>
        </div>
      )}

      {/* Desktop Table */}
      {!isLoading && (
        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 text-center">SL</th>

                  <th className="px-5 py-4 text-left">Campaign</th>

                  <th className="px-5 py-4 text-left">Goal</th>

                  <th className="px-5 py-4 text-left">Progress</th>

                  <th className="px-5 py-4 text-center">Status</th>

                  <th className="px-5 py-4 text-center">Update</th>

                  <th className="px-5 py-4 text-center">Delete</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {donations.map((donation, index) => (
                  <tr
                    key={donation._id}
                    className="transition hover:bg-teal-50/30"
                  >
                    <td className="px-5 py-5 text-center font-bold text-slate-500">
                      {index + 1}
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-xl">
                          <img
                            src={donation.image}
                            alt={donation.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div>
                          <p className="font-bold text-slate-900">
                            {donation.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {donation.lastdate}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5 font-bold text-slate-800">
                      ${donation.maxdonation}
                    </td>

                    <td className="min-w-[180px] px-5 py-5">
                      <div className="flex items-center gap-3">
                        <progress
                          className="progress progress-success h-2 w-full"
                          value={300}
                          max={donation.maxdonation}
                        />

                        <span className="text-xs font-bold text-slate-500">
                          300
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-5 text-center">
                      {donation.donstatus === true ? (
                        <button
                          onClick={() => handlePauseDon(donation)}
                          title="Pause campaign"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-teal-700 transition hover:bg-teal-700 hover:text-white"
                        >
                          <MdPlayArrow className="text-xl" />
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
                          <MdOutlinePause />
                          Paused
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-5 text-center">
                      <NavLink
                        to={`/dashboard/updatemycampaigns/${donation._id}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600 transition hover:bg-amber-500 hover:text-white"
                        title="Update campaign"
                      >
                        <FaRegEdit className="text-lg" />
                      </NavLink>
                    </td>

                    <td className="px-5 py-5 text-center">
                      <button
                        onClick={() => handleDeleteDon(donation)}
                        title="Delete campaign"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile / Tablet Cards */}
      {!isLoading && (
        <div className="grid gap-4 lg:hidden">
          {donations.map((donation, index) => (
            <article
              key={donation._id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={donation.image}
                    alt={donation.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-400">
                        #{index + 1}
                      </span>

                      <h2 className="mt-1 truncate text-lg font-extrabold text-slate-900">
                        {donation.name}
                      </h2>
                    </div>

                    {donation.donstatus === true ? (
                      <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-bold text-teal-700">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">
                        Paused
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    Ends: {donation.lastdate}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-slate-50 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-500">Goal</span>

                  <span className="font-extrabold text-slate-900">
                    ${donation.maxdonation}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-3">
                  <progress
                    className="progress progress-success h-2 flex-1"
                    value={300}
                    max={donation.maxdonation}
                  />

                  <span className="text-xs font-bold text-slate-500">300</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {donation.donstatus === true ? (
                  <button
                    onClick={() => handlePauseDon(donation)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 py-2.5 text-xs font-bold text-teal-700 transition hover:bg-teal-700 hover:text-white"
                  >
                    <MdPlayArrow className="text-lg" />
                    Pause
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex cursor-not-allowed items-center justify-center gap-1.5 rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-slate-400"
                  >
                    <MdOutlinePause className="text-lg" />
                    Paused
                  </button>
                )}

                <NavLink
                  to={`/dashboard/updatemycampaigns/${donation._id}`}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 py-2.5 text-xs font-bold text-amber-600 transition hover:bg-amber-500 hover:text-white"
                >
                  <FaRegEdit />
                  Update
                </NavLink>

                <button
                  onClick={() => handleDeleteDon(donation)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 py-2.5 text-xs font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  <MdDelete className="text-lg" />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllDonation;
