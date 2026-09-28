import { useQuery } from "@tanstack/react-query";
import { FaRegEdit, FaUserGraduate } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const AllCourses = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: courses = [], refetch } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courses");
      return res.data;
    },
  });

  const handleFinishedCourse = async (course) => {
    Swal.fire({
      title: "Finish this course?",
      text: "The course will be marked as finished.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Finish",
    }).then((result) => {
      if (result.isConfirmed) {
        const updateCourse = {
          name: course.name,
          instructor: course.instructor,
          duration: course.duration,
          location: course.location,
          outline: course.outline,
          image: course.image,
          email: course.email,
          endcourse: "true",
        };

        axiosSecure.put(`/courses/${course._id}`, updateCourse).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Course Finished",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handleDeletecourse = (course) => {
    Swal.fire({
      title: "Delete this course?",
      text: "This course will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/courses/${course._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "This course has been deleted.",
              icon: "success",
              confirmButtonColor: "#0f766e",
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
            Course Management
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
            All Courses
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage courses, completion status and course details.
          </p>
        </div>

        <div className="w-fit rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
          {courses.length} {courses.length === 1 ? "Course" : "Courses"}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">#</th>
                <th className="px-5 py-4">Course</th>
                <th className="px-5 py-4">Duration</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-center">Finish</th>
                <th className="px-5 py-4 text-center">Edit</th>
                <th className="px-5 py-4 text-center">Delete</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {courses.map((course, index) => (
                <tr key={course._id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 overflow-hidden rounded-xl bg-slate-100">
                        <img
                          src={course.image}
                          alt={course.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {course.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {course.instructor}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {course.duration}
                  </td>

                  <td className="px-5 py-4">
                    {course.endcourse === "true" ? (
                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                        Finished
                      </span>
                    ) : (
                      <span className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
                        Running
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {course.endcourse === "false" ? (
                      <button
                        onClick={() => handleFinishedCourse(course)}
                        title="Finish course"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-teal-700 transition hover:bg-teal-700 hover:text-white"
                      >
                        <FaUserGraduate />
                      </button>
                    ) : (
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                        <FaUserGraduate />
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <NavLink to={`/dashboard/updatemycourses/${course._id}`}>
                      <button
                        title="Edit course"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-700 transition hover:bg-amber-600 hover:text-white"
                      >
                        <FaRegEdit />
                      </button>
                    </NavLink>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => handleDeletecourse(course)}
                      title="Delete course"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {courses.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="font-semibold text-slate-700">No courses found</p>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {courses.map((course, index) => (
          <div
            key={course._id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex gap-4">
              <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={course.image}
                  alt={course.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-slate-800">{course.name}</p>

                    <p className="mt-1 text-xs text-slate-500">
                      {course.instructor}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-slate-400">
                    #{index + 1}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-500">{course.duration}</p>

                <div className="mt-2">
                  {course.endcourse === "true" ? (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      Finished
                    </span>
                  ) : (
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                      Running
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
              {course.endcourse === "false" ? (
                <button
                  onClick={() => handleFinishedCourse(course)}
                  className="flex items-center justify-center gap-1 rounded-xl bg-teal-700 px-2 py-2.5 text-xs font-semibold text-white"
                >
                  <FaUserGraduate />
                  Finish
                </button>
              ) : (
                <div className="rounded-xl bg-slate-100 px-2 py-2.5 text-center text-xs font-semibold text-slate-400">
                  Finished
                </div>
              )}

              <NavLink
                to={`/dashboard/updatemycourses/${course._id}`}
                className="flex items-center justify-center gap-1 rounded-xl bg-amber-50 px-2 py-2.5 text-xs font-semibold text-amber-700"
              >
                <FaRegEdit />
                Edit
              </NavLink>

              <button
                onClick={() => handleDeletecourse(course)}
                className="flex items-center justify-center gap-1 rounded-xl bg-red-50 px-2 py-2.5 text-xs font-semibold text-red-600"
              >
                <MdDelete />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
