import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaUserGraduate } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const EducationalWorkshop = () => {
  const axiosSecure = UseAxiosPublic();

  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courses");
      return res.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Paw | Education</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 max-w-2xl">
            <span className="rounded-full bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-teal-700">
              Learn & Grow
            </span>

            <h1 className="mt-4 text-3xl font-extrabold text-slate-800 sm:text-4xl">
              Educational Workshops
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              Learn practical pet care skills and become a more confident and
              responsible pet parent.
            </p>
          </div>

          {/* Courses */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course._id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4">
                    {course.endcourse === "true" ? (
                      <span className="rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                        Finished
                      </span>
                    ) : (
                      <span className="rounded-full bg-teal-700/90 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                        Available
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="line-clamp-1 text-xl font-bold text-slate-800">
                    {course.name}
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <FaUserGraduate className="text-teal-700" />
                    <span>{course.instructor}</span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs font-medium text-slate-400">
                        Location
                      </p>

                      <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                        <FaLocationDot className="text-teal-700" />
                        {course.location}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs font-medium text-slate-400">
                        Duration
                      </p>

                      <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                        <FiClock className="text-teal-700" />
                        {course.duration} Days
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    {course.endcourse === "true" ? (
                      <button
                        disabled
                        className="w-full cursor-not-allowed rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-400"
                      >
                        Course Finished
                      </button>
                    ) : (
                      <NavLink
                        to={`/education/${course._id}`}
                        className="block"
                      >
                        <button className="w-full rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800">
                          Enroll Now
                        </button>
                      </NavLink>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {courses.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <p className="text-lg font-bold text-slate-700">
                No workshops available
              </p>

              <p className="mt-2 text-sm text-slate-400">
                New educational workshops will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EducationalWorkshop;
