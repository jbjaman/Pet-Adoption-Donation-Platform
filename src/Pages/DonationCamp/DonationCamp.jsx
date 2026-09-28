import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaHourglassEnd } from "react-icons/fa";
import { FaHandHoldingDollar, FaSackDollar } from "react-icons/fa6";
import { MdArrowForward, MdPauseCircleOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const DonationCamp = () => {
  const axiosSecure = UseAxiosPublic();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Paw | Donation Campaigns</title>
      </Helmet>

      <section className="min-h-screen bg-slate-50 px-4 py-28 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-7xl">
          <div className="max-w-2xl">
            <span className="mb-3 inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-teal-800">
              Make a Difference
            </span>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Support a Pet in Need
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Explore our donation campaigns and help provide food, treatment,
              shelter, and care for pets who need it most.
            </p>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl bg-white shadow-sm"
              >
                <div className="h-60 animate-pulse bg-slate-200" />
                <div className="space-y-4 p-6">
                  <div className="h-7 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                  <div className="h-10 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Campaign Cards */}
        {!isLoading && (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {donations.map((don) => (
              <article
                key={don._id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={don.image}
                    alt={don.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Status */}
                  <div className="absolute right-4 top-4">
                    {don.donstatus === "false" ? (
                      <span className="flex items-center gap-1.5 rounded-full bg-slate-900/85 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                        <MdPauseCircleOutline className="text-base" />
                        Paused
                      </span>
                    ) : (
                      <span className="rounded-full bg-teal-600/90 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                        Active
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h2 className="line-clamp-1 text-2xl font-extrabold text-slate-900">
                    {don.name}
                  </h2>

                  {/* Deadline */}
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-500">
                    <FaHourglassEnd className="text-teal-700" />
                    <span>Campaign ends: {don.lastdate}</span>
                  </div>

                  {/* Donation Info */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-teal-50 p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-700">
                        <FaSackDollar />
                        Goal
                      </div>

                      <p className="mt-1 text-lg font-extrabold text-slate-900">
                        {don.maxdonation}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                        <FaHandHoldingDollar />
                        Raised
                      </div>

                      <p className="mt-1 text-lg font-extrabold text-slate-900">
                        100
                      </p>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="mt-5">
                    {don.donstatus === "false" ? (
                      <button
                        disabled
                        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 font-bold text-slate-400"
                      >
                        <MdPauseCircleOutline className="text-xl" />
                        Campaign Paused
                      </button>
                    ) : (
                      <NavLink
                        to={`/dtncampdetails/${don._id}`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 font-bold text-white transition hover:bg-teal-800"
                      >
                        View Campaign
                        <MdArrowForward className="text-xl transition-transform group-hover:translate-x-1" />
                      </NavLink>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && donations.length === 0 && (
          <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <FaHandHoldingDollar className="mx-auto text-5xl text-teal-600" />

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              No donation campaigns available
            </h2>

            <p className="mt-2 text-slate-500">
              There are currently no active donation campaigns.
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default DonationCamp;
