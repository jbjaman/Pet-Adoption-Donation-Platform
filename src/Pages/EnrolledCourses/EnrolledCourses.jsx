import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const EnrolledCourses = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const { data: enrolled = [], refetch } = useQuery({
    queryKey: ["enrolled"],
    queryFn: async () => {
      const res = await axiosSecure.get("/enrolled");
      return res.data;
    },
  });

  const handleSelectCourse = (course) => {
    Swal.fire({
      title: "Complete this course?",
      text: "The course will be marked as completed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Complete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/enrolled/${course._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Course Completed",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handleDeleteCourse = (course) => {
    Swal.fire({
      title: "Unenroll from this course?",
      text: "Your enrollment will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Unenroll",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/enrolled/${course._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();

            Swal.fire({
              title: "Unenrolled",
              text: "You have been unenrolled from the course.",
              icon: "success",
              confirmButtonColor: "#0f766e",
            });
          }
        });
      }
    });
  };

  const myCourses = enrolled.filter(
    (course) => course.owneremail === user.email,
  );

  const completedCourses = myCourses.filter(
    (course) => course.finished === "true",
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
          Learning
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              My Enrolled Courses
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Track your enrolled courses and completion status.
            </p>
          </div>

          <div className="flex w-fit gap-2">
            <span className="rounded-full bg-teal-50 px-3 py-2 text-xs font-bold text-teal-700">
              {myCourses.length} Total
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">
              {completedCourses.length} Completed
            </span>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">#</th>
                <th className="px-5 py-4">Course</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Phone</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4 text-center">Complete</th>
                <th className="px-5 py-4 text-center">Remove</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {myCourses.map((course, index) => (
                <tr key={course._id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 overflow-hidden rounded-xl bg-slate-100">
                        <img
                          src={course.courseimage}
                          alt={course.coursename}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {course.coursename}
                        </p>

                        <span
                          className={`mt-1 inline-block rounded-full px-2.5 py-1 text-[11px] font-bold ${
                            course.finished === "true"
                              ? "bg-slate-100 text-slate-600"
                              : "bg-teal-50 text-teal-700"
                          }`}
                        >
                          {course.finished === "true"
                            ? "Completed"
                            : "In Progress"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {course.courseemail}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {course.coursenumber}
                  </td>

                  <td className="max-w-[180px] px-5 py-4 text-sm text-slate-600">
                    {course.courseaddress}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {course.finished === "false" ? (
                      <button
                        onClick={() => handleSelectCourse(course)}
                        title="Mark as completed"
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
                    {course.finished === "true" ? (
                      <button
                        onClick={() => handleDeleteCourse(course)}
                        title="Unenroll"
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

        {myCourses.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="font-semibold text-slate-700">No enrolled courses</p>

            <p className="mt-1 text-sm text-slate-400">
              Your enrolled courses will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {myCourses.map((course, index) => (
          <div
            key={course._id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex gap-4">
              <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={course.courseimage}
                  alt={course.coursename}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-slate-800">
                      {course.coursename}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Course #{index + 1}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      course.finished === "true"
                        ? "bg-slate-100 text-slate-600"
                        : "bg-teal-50 text-teal-700"
                    }`}
                  >
                    {course.finished === "true" ? "Completed" : "In Progress"}
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-sm text-slate-500">
                  <p>{course.courseemail}</p>
                  <p>{course.coursenumber}</p>
                  <p>{course.courseaddress}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3 border-t border-slate-100 pt-4">
              {course.finished === "false" ? (
                <button
                  onClick={() => handleSelectCourse(course)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  <TiTick className="text-xl" />
                  Complete
                </button>
              ) : (
                <div className="flex flex-1 items-center justify-center rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-500">
                  Completed
                </div>
              )}

              {course.finished === "true" && (
                <button
                  onClick={() => handleDeleteCourse(course)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600"
                >
                  <RxCross2 className="text-lg" />
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}

        {myCourses.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <p className="font-semibold text-slate-700">No enrolled courses</p>

            <p className="mt-1 text-sm text-slate-400">
              Your enrolled courses will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
