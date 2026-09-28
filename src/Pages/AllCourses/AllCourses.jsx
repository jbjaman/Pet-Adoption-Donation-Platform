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
      title: "Are you sure?",
      text: "Finished",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
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
      title: "Are you sure?",
      text: "You want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/courses/${course._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "This Course has been deleted.",
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
            Administration
          </p>

          <h1 className="mt-1 text-2xl font-extrabold text-slate-800">
            All Courses
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage educational workshops and courses.
          </p>
        </div>

        <div className="w-fit rounded-xl bg-teal-50 px-4 py-3">
          <p className="text-xs font-semibold text-teal-700">Total Courses</p>

          <p className="text-2xl font-extrabold text-teal-900">
            {courses.length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  #
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Course
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Duration
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  Finish
                </th>

                <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  Update
                </th>

                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                  Delete
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {courses.map((course, index) => (
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
                          src={course.image}
                          alt={course.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-bold text-slate-800">
                          {course.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {course.instructor}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-600">
                    {course.duration}
                  </td>

                  <td className="px-5 py-4">
                    {course.endcourse === "true" ? (
                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
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
                        title="Mark as finished"
                        className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl border border-teal-200 text-teal-700 transition hover:bg-teal-600 hover:text-white"
                      >
                        <FaUserGraduate />
                      </button>
                    ) : (
                      <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-slate-50">
                        <FaUserGraduate />
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <NavLink
                      to={`/dashboard/updatemycourses/${course._id}`}
                      title="Update course"
                      className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl border border-amber-200 text-amber-600 transition hover:bg-amber-500 hover:text-white"
                    >
                      <FaRegEdit />
                    </NavLink>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleDeletecourse(course)}
                      title="Delete course"
                      className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-500 hover:text-white"
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
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-2xl text-teal-700">
              <FaUserGraduate />
            </div>

            <p className="mt-4 font-bold text-slate-700">No courses found</p>

            <p className="mt-1 text-sm text-slate-400">
              Courses will appear here when they are created.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllCourses;
