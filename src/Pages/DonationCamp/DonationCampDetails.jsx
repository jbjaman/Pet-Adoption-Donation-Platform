import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import {
  FaCalendarDays,
  FaHandHoldingDollar,
  FaSackDollar,
} from "react-icons/fa6";
import { MdClose, MdSecurity } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const DonationCampDetails = () => {
  const { user } = useContext(AuthContext);
  const dondetails = useLoaderData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    console.log(data);
    console.log(user);
    console.log("ok");
  };

  return (
    <>
      <Helmet>
        <title>Paw | Pet Donation</title>
      </Helmet>

      <section className="min-h-screen bg-slate-50 px-4 py-28 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          {/* Main Card */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="grid lg:grid-cols-2">
              {/* Image */}
              <div className="relative min-h-[320px] lg:min-h-[600px]">
                <img
                  src={dondetails.image}
                  alt={dondetails.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block rounded-full bg-teal-600 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                    Donation Campaign
                  </span>

                  <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                    {dondetails.name}
                  </h1>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="mb-7">
                  <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
                    Help us make a difference
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    Support this campaign
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Every contribution can help provide better care and a safer
                    life for pets in need.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-teal-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-teal-700">
                      <FaSackDollar />
                      Donation Goal
                    </div>

                    <p className="mt-2 text-xl font-extrabold text-slate-900">
                      {dondetails.maxdonation}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <FaHandHoldingDollar />
                      Raised
                    </div>

                    <p className="mt-2 text-xl font-extrabold text-slate-900">
                      100
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                    <FaCalendarDays />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Last Date
                    </p>

                    <p className="font-bold text-slate-800">
                      {dondetails.lastdate}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-7">
                  <div className="flex items-center gap-2">
                    <TbListDetails className="text-2xl text-teal-700" />

                    <h3 className="text-lg font-bold text-slate-900">
                      About this campaign
                    </h3>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {dondetails.shortdescription}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {dondetails.longdescription}
                  </p>
                </div>

                {/* Donate Button */}
                <button
                  onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                  }
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3.5 text-base font-bold text-white transition hover:bg-teal-800"
                >
                  <FaHandHoldingDollar className="text-xl" />
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Modal */}
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box max-w-lg rounded-3xl bg-white p-0">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  Make a contribution
                </p>

                <h3 className="mt-1 text-2xl font-extrabold text-slate-900">
                  Donate to {dondetails.name}
                </h3>
              </div>

              <form method="dialog">
                <button className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900">
                  <MdClose className="text-xl" />
                </button>
              </form>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit(onsubmit)} className="p-6">
              {/* Amount */}
              <div>
                <label
                  htmlFor="amount"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Donation Amount
                </label>

                <input
                  id="amount"
                  type="number"
                  min="1"
                  {...register("amount", {
                    required: true,
                  })}
                  placeholder="Enter donation amount"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                />

                {errors.amount && (
                  <p className="mt-1 text-sm font-medium text-red-500">
                    Donation amount is required
                  </p>
                )}
              </div>

              {/* Credit Card */}
              <div className="mt-5">
                <label
                  htmlFor="card"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Credit Card
                </label>

                <input
                  id="card"
                  type="text"
                  placeholder="Enter card information"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                />
              </div>

              {/* Security Notice */}
              <div className="mt-5 flex gap-3 rounded-2xl bg-teal-50 p-4">
                <MdSecurity className="mt-0.5 shrink-0 text-xl text-teal-700" />

                <p className="text-xs leading-5 text-teal-800">
                  Your donation information is handled securely.
                </p>
              </div>

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3.5 font-bold text-white transition hover:bg-teal-800"
              >
                <FaHandHoldingDollar />
                Submit Donation
              </button>
            </form>
          </div>
        </dialog>
      </section>
    </>
  );
};

export default DonationCampDetails;
