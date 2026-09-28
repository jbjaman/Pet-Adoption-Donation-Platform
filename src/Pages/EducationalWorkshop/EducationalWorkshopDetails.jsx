import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaLocationDot, FaUserGraduate } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { PiGraduationCapBold } from "react-icons/pi";
import { TbListDetails } from "react-icons/tb";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const EducationalWorkshopDetails = () => {
  const { user } = useContext(AuthContext);
  const loadCourseDetails = useLoaderData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = UseAxiosSecure();

  const onsubmit = async (data) => {
    const enrolledCourse = {
      coursename: data.coursename,
      courseemail: data.courseemail,
      coursenumber: data.coursenumber,
      courseaddress: data.courseaddress,
      finished: "false",
      owneremail: loadCourseDetails.email,
      courseimage: loadCourseDetails.image,
    };

    const addEnrolledList = await axiosSecure.post("/enrolled", enrolledCourse);

    if (addEnrolledList.data.insertedId) {
      reset();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Enrolled Done",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Paw | Course Details</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative min-h-[320px] lg:min-h-[600px]">
              <img
                src={loadCourseDetails.image}
                alt={loadCourseDetails.name}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white sm:left-8 sm:right-8">
                <span className="rounded-full bg-teal-700/90 px-3 py-1.5 text-xs font-bold backdrop-blur">
                  Educational Workshop
                </span>

                <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                  {loadCourseDetails.name}
                </h1>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xl text-teal-700">
                    <PiGraduationCapBold />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Course
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-800">
                      {loadCourseDetails.name}
                    </h2>
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <FaUserGraduate className="text-lg text-teal-700" />

                    <p className="mt-3 text-xs text-slate-400">Instructor</p>

                    <p className="mt-1 font-semibold text-slate-700">
                      {loadCourseDetails.instructor}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <FiClock className="text-lg text-teal-700" />

                    <p className="mt-3 text-xs text-slate-400">Duration</p>

                    <p className="mt-1 font-semibold text-slate-700">
                      {loadCourseDetails.duration} Days
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                    <FaLocationDot className="text-lg text-teal-700" />

                    <p className="mt-3 text-xs text-slate-400">Location</p>

                    <p className="mt-1 font-semibold text-slate-700">
                      {loadCourseDetails.location}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center gap-2">
                    <TbListDetails className="text-xl text-teal-700" />

                    <h3 className="font-bold text-slate-800">Course Outline</h3>
                  </div>

                  <p className="mt-3 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
                    {loadCourseDetails.outline}
                  </p>
                </div>
              </div>

              {/* Enroll */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <button
                  onClick={() =>
                    document.getElementById("enrollment_modal").showModal()
                  }
                  className="w-full rounded-xl bg-teal-700 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-teal-800"
                >
                  Enroll in This Course
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <dialog id="enrollment_modal" className="modal">
          <div className="modal-box max-w-lg rounded-3xl bg-white p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Enrollment Form
              </span>

              <h3 className="mt-2 text-2xl font-bold text-slate-800">
                Enroll Now
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Fill in your contact information to enroll in this course.
              </p>
            </div>

            <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Name
                </label>

                <input
                  type="text"
                  {...register("coursename", {
                    required: true,
                  })}
                  defaultValue={user.displayName}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-50"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Email
                </label>

                <input
                  type="text"
                  {...register("courseemail", {
                    required: true,
                  })}
                  defaultValue={user.email}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-50"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Phone Number
                </label>

                <input
                  type="text"
                  {...register("coursenumber", {
                    required: true,
                  })}
                  placeholder="Enter phone number"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-50"
                />

                {errors.coursenumber && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    Phone number is required.
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Address
                </label>

                <input
                  type="text"
                  {...register("courseaddress", {
                    required: true,
                  })}
                  placeholder="Enter your address"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-50"
                />

                {errors.courseaddress && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    Address is required.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
              >
                Confirm Enrollment
              </button>
            </form>

            <div className="mt-4">
              <form method="dialog">
                <button className="w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                  Close
                </button>
              </form>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default EducationalWorkshopDetails;
