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
      title: "Are you sure?",
      text: "I want to Accept",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/adoption/${adp._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Adopted Confirm",
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
      title: "Are you sure?",
      text: "You want to Cancel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/adoption/${adp._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "Canceled the Request",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const requests = adoption.filter(
    (adpreq) => adpreq.owneremail === user.email,
  );

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
          Adoption Management
        </p>

        <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">
              Adoption Requests
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review adoption requests submitted for your pets.
            </p>
          </div>

          <div className="w-fit rounded-xl bg-teal-50 px-4 py-2">
            <span className="text-sm font-bold text-teal-700">
              {requests.length} Request{requests.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  #
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Pet
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Applicant
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Email
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Phone
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Location
                </th>
                <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  Decision
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {requests.map((item, index) => (
                <tr key={item._id} className="transition hover:bg-slate-50/70">
                  <td className="px-5 py-4 text-sm font-semibold text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-xl bg-slate-100">
                        <img
                          src={item.petimage}
                          alt={item.adpname}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <span className="font-bold text-slate-800">
                        {item.adpname}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 font-semibold text-slate-700">
                    {item.adpname}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {item.adpemail}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {item.adpnumber}
                  </td>

                  <td className="max-w-[180px] px-5 py-4 text-sm text-slate-600">
                    {item.adpaddress}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                      {item.adpreq === "true" ? (
                        <>
                          <button
                            onClick={() => handleSelectAdp(item)}
                            title="Accept"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-200 text-lg text-teal-700 transition hover:bg-teal-700 hover:text-white"
                          >
                            <TiTick />
                          </button>

                          <button
                            onClick={() => handleDeleteAdp(item)}
                            title="Cancel"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-500 hover:text-white"
                          >
                            <RxCross2 />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-lg text-teal-700">
                            <TiTick />
                          </span>

                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-400">
                            <RxCross2 />
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {requests.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="font-bold text-slate-700">No adoption requests</p>
            <p className="mt-1 text-sm text-slate-400">
              New requests will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdoptionReq;
