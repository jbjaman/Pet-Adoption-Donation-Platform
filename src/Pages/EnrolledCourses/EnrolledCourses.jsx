import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaGraduationCap } from "react-icons/fa";
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

  const myCourses = enrolled.filter(
    (coursereq) => coursereq.owneremail === user.email,
  );

  const handleSelectCourse = (course) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Course Completed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/enrolled/${course._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Finished",
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
      title: "Are you sure?",
      text: "You want to Unenrolled?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/enrolled/${course._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "Unenrolled",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Learning
          </p>

          <h1 className="mt-1 text-2xl font-extrabold text-slate-800">
            Enrolled Courses
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track the courses you have enrolled in.
          </p>
        </div>

        <div className="w-fit rounded-xl bg-teal-50 px-4 py-3">
          <p className="text-xs font-semibold text-teal-700">My Courses</p>

          <p className="text-2xl font-extrabold text-teal-900">
            {myCourses.length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  #
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Course
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
                  Complete
                </th>

                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                  Remove
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {myCourses.map((course, index) => (
                <tr
                  key={course._id}
                  className="transition hover:bg-slate-50/70"
                >
                  <td className="px-5 py-4 text-sm font-semibold text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        <img
                          src={course.courseimage}
                          alt={course.coursename}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-bold text-slate-800">
                          {course.coursename}
                        </p>

                        <p className="text-xs text-slate-400">
                          {course.finished === "true"
                            ? "Completed"
                            : "In progress"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {course.courseemail}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {course.coursenumber}
                  </td>

                  <td className="max-w-[200px] px-5 py-4 text-sm text-slate-600">
                    {course.courseaddress}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {course.finished === "false" ? (
                      <button
                        onClick={() => handleSelectCourse(course)}
                        title="Mark as completed"
                        className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl border border-teal-200 text-lg text-teal-700 transition hover:bg-teal-700 hover:text-white"
                      >
                        <TiTick />
                      </button>
                    ) : (
                      <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-lg text-teal-700">
                        <TiTick />
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    {course.finished === "true" ? (
                      <button
                        onClick={() => handleDeleteCourse(course)}
                        title="Unenroll"
                        className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-500 hover:text-white"
                      >
                        <RxCross2 />
                      </button>
                    ) : (
                      <span className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-red-300">
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
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-2xl text-teal-700">
              <FaGraduationCap />
            </div>

            <p className="mt-4 font-bold text-slate-700">No enrolled courses</p>

            <p className="mt-1 text-sm text-slate-400">
              Courses you enroll in will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EnrolledCourses;
