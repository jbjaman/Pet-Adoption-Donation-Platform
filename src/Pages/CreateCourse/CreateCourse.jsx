import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CgDetailsMore } from "react-icons/cg";
import { FaImage } from "react-icons/fa";
import { FaLocationDot, FaUserGraduate } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { PiGraduationCapBold } from "react-icons/pi";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateCourse = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosPublic = UseAxiosPublic();
  const axiosSecure = UseAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const addCourse = {
        name: data.name,
        instructor: data.instructor,
        duration: data.duration,
        location: data.location,
        outline: data.outline,
        image: res.data.data.display_url,
        email: user.email,
        endcourse: "false",
      };

      const addCourseList = await axiosSecure.post("/courses", addCourse);

      if (addCourseList.data.insertedId) {
        reset();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Course is added to the List",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
          Education Management
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-800">
          Create New Course
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Add a new educational workshop with course information, instructor
          details and an image.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Course Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Course Name
            </label>

            <div className="relative">
              <PiGraduationCapBold className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-teal-700" />

              <input
                type="text"
                {...register("name", {
                  required: true,
                })}
                placeholder="Enter course name"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-50"
              />
            </div>

            {errors.name && (
              <p className="mt-1 text-xs font-medium text-red-500">
                Course name is required.
              </p>
            )}
          </div>

          {/* Instructor */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Instructor
            </label>

            <div className="relative">
              <FaUserGraduate className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-teal-700" />

              <input
                type="text"
                {...register("instructor", {
                  required: true,
                })}
                placeholder="Instructor name"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-50"
              />
            </div>

            {errors.instructor && (
              <p className="mt-1 text-xs font-medium text-red-500">
                Instructor is required.
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Location
            </label>

            <div className="relative">
              <FaLocationDot className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-teal-700" />

              <input
                type="text"
                {...register("location", {
                  required: true,
                })}
                placeholder="Online / Offline"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-50"
              />
            </div>

            {errors.location && (
              <p className="mt-1 text-xs font-medium text-red-500">
                Location is required.
              </p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Total Duration
            </label>

            <div className="relative">
              <FiClock className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-teal-700" />

              <select
                defaultValue="default"
                {...register("duration", {
                  required: true,
                })}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-50"
              >
                <option disabled value="default">
                  Select duration
                </option>
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="4">4 Days</option>
                <option value="5">5 Days</option>
              </select>
            </div>

            {errors.duration && (
              <p className="mt-1 text-xs font-medium text-red-500">
                Duration is required.
              </p>
            )}
          </div>

          {/* Image */}
          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Course Image
            </label>

            <div className="relative">
              <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-teal-700" />

              <input
                type="file"
                {...register("image", {
                  required: true,
                })}
                className="w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-600 outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-teal-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-teal-500 focus:border-teal-600 focus:bg-white"
              />
            </div>

            {errors.image && (
              <p className="mt-1 text-xs font-medium text-red-500">
                Course image is required.
              </p>
            )}
          </div>

          {/* Outline */}
          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Course Outline
            </label>

            <div className="relative">
              <CgDetailsMore className="absolute left-4 top-4 text-xl text-teal-700" />

              <textarea
                {...register("outline", {
                  required: true,
                })}
                placeholder="Describe the course outline..."
                className="min-h-36 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm leading-6 text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-50"
              />
            </div>

            {errors.outline && (
              <p className="mt-1 text-xs font-medium text-red-500">
                Course outline is required.
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <button
            type="submit"
            className="w-full rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md sm:w-auto sm:min-w-[180px]"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
