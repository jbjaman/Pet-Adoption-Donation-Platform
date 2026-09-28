import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { BiDonateHeart } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { MdOutlinePause, MdPlayArrow } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const MyCampaigns = () => {
  const { user } = useContext(AuthContext);
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

  const myCampaigns = donations.filter((mycamp) => mycamp.email === user.email);

  const handlePauseDon = (donation) => {
    Swal.fire({
      title: "Are you sure?",
      text: "I want to pause the campaign",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, pause it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/donations/${donation._id}`).then((res) => {
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
        });
      }
    });
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-800">
          <FaSackDollar />
          Your Campaigns
        </span>

        <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
          My Donation Campaigns
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage the campaigns you have created.
        </p>
      </div>

      {/* Summary */}
      {!isLoading && (
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Total Campaigns
            </p>

            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {myCampaigns.length}
            </p>
          </div>

          <div className="rounded-2xl border border-teal-100 bg-teal-50 p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-teal-600">
              Active
            </p>

            <p className="mt-2 text-3xl font-extrabold text-teal-800">
              {
                myCampaigns.filter((campaign) => campaign.donstatus === true)
                  .length
              }
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Paused
            </p>

            <p className="mt-2 text-3xl font-extrabold text-slate-700">
              {
                myCampaigns.filter((campaign) => campaign.donstatus !== true)
                  .length
              }
            </p>
          </div>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-700" />

          <p className="mt-4 text-sm text-slate-500">
            Loading your campaigns...
          </p>
        </div>
      )}

      {/* Desktop */}
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

                  <th className="px-5 py-4 text-center">View</th>

                  <th className="px-5 py-4 text-center">Status</th>

                  <th className="px-5 py-4 text-center">Update</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {myCampaigns.map((donation, index) => (
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
                            Ends: {donation.lastdate}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5 font-bold text-slate-800">
                      ${donation.maxdonation}
                    </td>

                    <td className="min-w-[180px] px-5 py-5">
                      <progress
                        className="progress progress-success h-2 w-full"
                        value={100}
                        max={donation.maxdonation}
                      />
                    </td>

                    <td className="px-5 py-5 text-center">
                      <button
                        type="button"
                        title="View donations"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-teal-700 transition hover:bg-teal-700 hover:text-white"
                      >
                        <BiDonateHeart className="text-xl" />
                      </button>
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
                        title="Update campaign"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600 transition hover:bg-amber-500 hover:text-white"
                      >
                        <FaRegEdit className="text-lg" />
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile / Tablet */}
      {!isLoading && (
        <div className="grid gap-4 lg:hidden">
          {myCampaigns.map((donation, index) => (
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
                  <p className="text-xs font-bold text-slate-400">
                    Campaign #{index + 1}
                  </p>

                  <h2 className="mt-1 truncate text-lg font-extrabold text-slate-900">
                    {donation.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Goal: ${donation.maxdonation}
                  </p>
                </div>

                {donation.donstatus === true ? (
                  <span className="h-fit rounded-full bg-teal-100 px-2.5 py-1 text-xs font-bold text-teal-700">
                    Active
                  </span>
                ) : (
                  <span className="h-fit rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">
                    Paused
                  </span>
                )}
              </div>

              <div className="mt-4">
                <div className="mb-2 flex justify-between text-xs font-semibold text-slate-500">
                  <span>Donation Progress</span>
                  <span>100</span>
                </div>

                <progress
                  className="progress progress-success h-2 w-full"
                  value={100}
                  max={donation.maxdonation}
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 py-2.5 text-xs font-bold text-teal-700"
                >
                  <BiDonateHeart className="text-lg" />
                  View
                </button>

                {donation.donstatus === true ? (
                  <button
                    onClick={() => handlePauseDon(donation)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-600"
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
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Empty */}
      {!isLoading && myCampaigns.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <FaSackDollar className="mx-auto text-5xl text-teal-600" />

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            No campaigns yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            You have not created any donation campaigns.
          </p>
        </div>
      )}
    </section>
  );
};

export default MyCampaigns;
