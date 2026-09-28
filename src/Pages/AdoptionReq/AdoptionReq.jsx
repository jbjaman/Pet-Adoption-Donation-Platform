import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const AdoptionReq = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const { data: adoption = [], refetch } = useQuery({
    queryKey: ["adoption"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adoption");
      return res.data;
    },
  });

  const handleSelectAdp = (adp) => {
    Swal.fire({
      title: "Accept adoption request?",
      text: "This will confirm the adoption request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/adoption/${adp._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Adoption Confirmed",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handleDeleteAdp = (adp) => {
    Swal.fire({
      title: "Cancel this request?",
      text: "This adoption request will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/adoption/${adp._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();

            Swal.fire({
              title: "Request Cancelled",
              text: "The adoption request has been cancelled.",
              icon: "success",
              confirmButtonColor: "#0f766e",
            });
          }
        });
      }
    });
  };

  const myRequests = adoption.filter(
    (adpreq) => adpreq.owneremail === user.email,
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
          Adoption Management
        </p>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Adoption Requests
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review and manage adoption requests for your pets.
            </p>
          </div>

          <div className="w-fit rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
            {myRequests.length}{" "}
            {myRequests.length === 1 ? "Request" : "Requests"}
          </div>
        </div>
      </div>

      {/* Desktop / tablet table */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">#</th>
                <th className="px-5 py-4">Profile</th>
                <th className="px-5 py-4">Applicant</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4 text-center">Accept</th>
                <th className="px-5 py-4 text-center">Cancel</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {myRequests.map((item, index) => (
                <tr key={item._id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td className="px-5 py-4">
                    <div className="h-12 w-12 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
                      <img
                        src={item.petimage}
                        alt={item.adpname}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">
                      {item.adpname}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">Applicant</p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm text-slate-700">{item.adpemail}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {item.adpnumber}
                    </p>
                  </td>

                  <td className="max-w-[180px] px-5 py-4 text-sm text-slate-600">
                    {item.adpaddress}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {item.adpreq === "true" ? (
                      <button
                        onClick={() => handleSelectAdp(item)}
                        title="Accept request"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-xl text-teal-700 transition hover:bg-teal-700 hover:text-white"
                      >
                        <TiTick />
                      </button>
                    ) : (
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xl text-slate-400">
                        <TiTick />
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {item.adpreq === "true" ? (
                      <button
                        onClick={() => handleDeleteAdp(item)}
                        title="Cancel request"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-lg text-red-600 transition hover:bg-red-600 hover:text-white"
                      >
                        <RxCross2 />
                      </button>
                    ) : (
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg text-slate-400">
                        <RxCross2 />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {myRequests.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="text-lg font-semibold text-slate-700">
              No adoption requests
            </p>
            <p className="mt-1 text-sm text-slate-400">
              New requests will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="space-y-4 md:hidden">
        {myRequests.map((item, index) => (
          <div
            key={item._id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={item.petimage}
                  alt={item.adpname}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-slate-800">{item.adpname}</p>
                    <p className="text-xs text-slate-400">
                      Request #{index + 1}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.adpreq === "true"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-teal-50 text-teal-700"
                    }`}
                  >
                    {item.adpreq === "true" ? "Pending" : "Accepted"}
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-sm text-slate-600">
                  <p>{item.adpemail}</p>
                  <p>{item.adpnumber}</p>
                  <p>{item.adpaddress}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3 border-t border-slate-100 pt-4">
              {item.adpreq === "true" ? (
                <>
                  <button
                    onClick={() => handleSelectAdp(item)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
                  >
                    <TiTick className="text-xl" />
                    Accept
                  </button>

                  <button
                    onClick={() => handleDeleteAdp(item)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                  >
                    <RxCross2 className="text-lg" />
                    Cancel
                  </button>
                </>
              ) : (
                <div className="w-full rounded-xl bg-teal-50 px-4 py-2.5 text-center text-sm font-semibold text-teal-700">
                  Adoption Accepted
                </div>
              )}
            </div>
          </div>
        ))}

        {myRequests.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <p className="font-semibold text-slate-700">No adoption requests</p>
            <p className="mt-1 text-sm text-slate-400">
              New requests will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionReq;
