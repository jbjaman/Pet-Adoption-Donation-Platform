import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CgDetailsMore } from "react-icons/cg";
import { FaImage, FaUserGraduate } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { PiGraduationCapBold } from "react-icons/pi";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateMyCourses = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosPublic = UseAxiosPublic();
  const axiosSecure = UseAxiosSecure();
  const loadedAllCourses = useLoaderData();

  const onSubmit = async (data) => {
    const imageFile = {
      image: data.image[0],
    };

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
      };

      const addCourseList = await axiosSecure.patch(
        `/courses/${loadedAllCourses._id}`,
        addCourse,
      );

      if (addCourseList.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <section className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50">
            <PiGraduationCapBold className="text-2xl text-teal-700" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Course Management
            </p>

            <h1 className="mt-1 text-2xl font-extrabold text-slate-800">
              Update Course
            </h1>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Update the course information and save your changes.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic information */}
          <div>
            <div className="mb-4">
              <h2 className="text-base font-extrabold text-slate-800">
                Course Information
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Keep the course details clear and easy to understand.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Course Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Course Name
                </label>

                <div className="relative">
                  <PiGraduationCapBold className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-teal-700" />

                  <input
                    type="text"
                    {...register("name", {
                      required: true,
                    })}
                    defaultValue={loadedAllCourses.name}
                    placeholder="Course Name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-50"
                  />
                </div>

                {errors.name && (
                  <p className="mt-1 text-xs font-semibold text-red-500">
                    Course name is required
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
                    defaultValue={loadedAllCourses.instructor}
                    placeholder="Instructor"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-50"
                  />
                </div>

                {errors.instructor && (
                  <p className="mt-1 text-xs font-semibold text-red-500">
                    Instructor is required
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
                    defaultValue={loadedAllCourses.location}
                    placeholder="Online / Offline"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-50"
                  />
                </div>

                {errors.location && (
                  <p className="mt-1 text-xs font-semibold text-red-500">
                    Location is required
                  </p>
                )}
              </div>

              {/* Duration */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Duration
                </label>

                <div className="relative">
                  <FiClock className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-teal-700" />

                  <select
                    defaultValue={loadedAllCourses.duration}
                    {...register("duration", {
                      required: true,
                    })}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-50"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>

                {errors.duration && (
                  <p className="mt-1 text-xs font-semibold text-red-500">
                    Duration is required
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="border-t border-slate-100 pt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Course Image
            </label>

            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-teal-400 hover:bg-teal-50/30">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <FaImage />
                </div>

                <input
                  type="file"
                  {...register("image", {
                    required: true,
                  })}
                  className="w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-teal-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-800"
                />
              </div>
            </div>

            {errors.image && (
              <p className="mt-1 text-xs font-semibold text-red-500">
                Course image is required
              </p>
            )}
          </div>

          {/* Outline */}
          <div className="border-t border-slate-100 pt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Course Outline
            </label>

            <div className="relative">
              <CgDetailsMore className="absolute left-4 top-4 text-xl text-teal-700" />

              <textarea
                {...register("outline", {
                  required: true,
                })}
                defaultValue={loadedAllCourses.outline}
                placeholder="Describe what students will learn..."
                className="min-h-[150px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm leading-6 text-slate-800 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-50"
              />
            </div>

            {errors.outline && (
              <p className="mt-1 text-xs font-semibold text-red-500">
                Course outline is required
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="border-t border-slate-100 pt-6">
            <button
              type="submit"
              className="w-full rounded-xl bg-teal-700 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md sm:w-auto"
            >
              Update Course
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateMyCourses;
