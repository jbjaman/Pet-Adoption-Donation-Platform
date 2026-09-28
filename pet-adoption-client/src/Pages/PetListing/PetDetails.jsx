import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaPaw } from "react-icons/fa";
import { FiCalendar, FiHeart, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const PetDetails = () => {
  const { user } = useContext(AuthContext);
  const loadPetDetails = useLoaderData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = UseAxiosSecure();

  const onsubmit = async (data) => {
    const adoptionPet = {
      adpname: data.adpname,
      adpemail: data.adpemail,
      adpnumber: data.adpnumber,
      adpaddress: data.adpaddress,
      adpreq: "true",
      owneremail: loadPetDetails.email,
      petimage: loadPetDetails.image,
    };

    const addAdoptionList = await axiosSecure.post("/adoption", adoptionPet);

    if (addAdoptionList.data.insertedId) {
      reset();

      document.getElementById("adoption_modal")?.close();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Adoption request sent",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>PawCare | {loadPetDetails.name}</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-10 sm:py-14">
        <div className="page-container">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-slate-400">
            <FaPaw className="text-teal-600" />
            <span>Pets</span>
            <span>/</span>
            <span className="font-semibold text-slate-700">
              {loadPetDetails.name}
            </span>
          </div>

          {/* Main */}
          <div className="grid overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50 lg:grid-cols-2">
            {/* Image */}
            <div className="relative min-h-[420px] bg-slate-100 lg:min-h-[650px]">
              <img
                src={loadPetDetails.image}
                alt={loadPetDetails.name}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute left-5 top-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-teal-700 shadow-lg backdrop-blur">
                  <FaPaw />
                  {loadPetDetails.category}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5">
                <div className="rounded-2xl bg-slate-950/70 p-4 text-white backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-300">
                    Looking for a home
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold">
                    Meet {loadPetDetails.name}
                  </h2>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-teal-600">
                    About this pet
                  </p>

                  <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    {loadPetDetails.name}
                  </h1>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                  <FiHeart />
                </div>
              </div>

              {/* Meta */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <FiCalendar className="text-teal-600" />

                  <p className="mt-3 text-xs text-slate-400">Age</p>

                  <p className="mt-1 font-bold text-slate-800">
                    {loadPetDetails.age} years
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <FaPaw className="text-teal-600" />

                  <p className="mt-3 text-xs text-slate-400">Category</p>

                  <p className="mt-1 font-bold text-slate-800">
                    {loadPetDetails.category}
                  </p>
                </div>

                <div className="col-span-2 rounded-2xl bg-slate-50 p-4 sm:col-span-1">
                  <FiMapPin className="text-teal-600" />

                  <p className="mt-3 text-xs text-slate-400">Location</p>

                  <p className="mt-1 truncate font-bold text-slate-800">
                    {loadPetDetails.location}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <div className="flex items-center gap-2 text-slate-800">
                  <TbListDetails className="text-xl text-teal-600" />

                  <h2 className="font-bold">About {loadPetDetails.name}</h2>
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {loadPetDetails.shortdescription}
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {loadPetDetails.longdescription}
                </p>
              </div>

              {/* CTA */}
              <div className="mt-8 rounded-2xl bg-teal-50 p-5">
                <p className="font-bold text-teal-900">
                  Ready to give {loadPetDetails.name} a home?
                </p>

                <p className="mt-1 text-sm leading-6 text-teal-700/70">
                  Send an adoption request and the pet owner can review your
                  request.
                </p>

                <button
                  onClick={() =>
                    document.getElementById("adoption_modal").showModal()
                  }
                  className="primary-btn mt-4 w-full"
                >
                  <FaPaw />
                  Request Adoption
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adoption Modal */}
      <dialog id="adoption_modal" className="modal backdrop:bg-slate-950/60">
        <div className="modal-box max-w-lg rounded-3xl bg-white p-6 sm:p-8">
          <div className="mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <FaPaw />
            </div>

            <h3 className="mt-4 text-2xl font-extrabold text-slate-900">
              Adoption request
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Tell the owner a little about yourself.
            </p>
          </div>

          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Your name
              </label>

              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  {...register("adpname", {
                    required: true,
                  })}
                  defaultValue={user?.displayName}
                  className="input-field pl-11"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Email
              </label>

              <input
                type="email"
                {...register("adpemail", {
                  required: true,
                })}
                defaultValue={user?.email}
                className="input-field"
                placeholder="Email address"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Phone number
              </label>

              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  {...register("adpnumber", {
                    required: true,
                  })}
                  className="input-field pl-11"
                  placeholder="Phone number"
                />
              </div>

              {errors.adpnumber && (
                <p className="mt-1 text-xs font-semibold text-red-500">
                  Phone number is required
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Address
              </label>

              <textarea
                {...register("adpaddress", {
                  required: true,
                })}
                rows="3"
                className="input-field resize-none"
                placeholder="Where do you live?"
              />

              {errors.adpaddress && (
                <p className="mt-1 text-xs font-semibold text-red-500">
                  Address is required
                </p>
              )}
            </div>

            <button className="primary-btn w-full">
              <FaPaw />
              Send Request
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog" className="w-full">
              <button className="secondary-btn w-full">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PetDetails;
