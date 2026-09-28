import { FaUserGraduate } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Education = () => {
  const workshops = [
    {
      title: "Paws & Learn",
      image: "https://i.ibb.co/C0YxQ6Q/edu4.png",
      description:
        "Engaging and informative workshops about responsible pet ownership.",
    },
    {
      title: "Adopt & Thrive",
      image: "https://i.ibb.co/LJGFjHW/edu3.png",
      description:
        "Insightful workshops to guide you through life with your newly adopted pet.",
    },
    {
      title: "Training Tails",
      image: "https://i.ibb.co/VYyXtgb/education2.png",
      description:
        "Elevate your bond with your adopted pet through expert-led workshops.",
    },
    {
      title: "Pet Care 101",
      image: "https://i.ibb.co/VqbNbN4/petedu4.png",
      description:
        "Learn the essential knowledge needed for a lifetime of joy with your furry friends.",
    },
  ];

  return (
    <section className="mx-4 mb-12 rounded-3xl bg-teal-50 p-5 sm:mx-6 sm:p-8 lg:mx-auto lg:mb-16 lg:max-w-7xl lg:p-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
            Learn & Grow
          </p>

          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-teal-950 sm:text-4xl lg:text-5xl">
            The Ultimate
            <br />
            Workshop Series
          </h2>

          <div className="mt-4 h-1 w-20 rounded-full bg-teal-700" />
        </div>

        <NavLink
          to="/education"
          className="inline-flex w-fit items-center rounded-xl border border-teal-700 px-5 py-3 text-sm font-bold text-teal-700 transition hover:bg-teal-700 hover:text-white"
        >
          Learn From the Best
          <span className="ml-2">→</span>
        </NavLink>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {workshops.map((workshop) => (
          <div
            key={workshop.title}
            className="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="grid sm:grid-cols-2">
              <div className="overflow-hidden">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-full"
                />
              </div>

              <div className="flex flex-col justify-center p-5 sm:p-6">
                <h3 className="text-xl font-extrabold text-slate-800">
                  {workshop.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {workshop.description}
                </p>

                <NavLink
                  to="/education"
                  className="mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-teal-700 text-teal-700 transition hover:bg-teal-700 hover:text-white"
                  aria-label={`Learn about ${workshop.title}`}
                >
                  <FaUserGraduate />
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
