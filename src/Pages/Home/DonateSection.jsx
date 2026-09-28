import { FaDonate } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const DonateSection = () => {
  const campaigns = [
    {
      title: "Paws for a Cause",
      image: "https://i.ibb.co/qyHjKx1/don1.png",
      description:
        "Join our pet donation drive and support adoption initiatives.",
    },
    {
      title: "Give a Paw Up",
      image: "https://i.ibb.co/9yH19Tn/don2.png",
      description:
        "Support adoption and help pets find loving families and permanent homes.",
    },
    {
      title: "Pet Rescue Mission",
      image: "https://i.ibb.co/tsyDyTk/don3.png",
      description:
        "Help provide essential medical care for injured or sick animals.",
    },
    {
      title: "Sweet Homes",
      image: "https://i.ibb.co/thg9Wqx/campaign1.png",
      description:
        "Support nutritious food and shelter for pets awaiting forever homes.",
    },
  ];

  return (
    <section className="mx-4 rounded-3xl bg-teal-50 p-5 sm:mx-6 sm:p-8 lg:mx-auto lg:max-w-7xl lg:p-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
            Make A Difference
          </p>

          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-teal-950 sm:text-4xl lg:text-5xl">
            Donate To Give Pets
            <br className="hidden sm:block" />A Second Chance
          </h2>

          <div className="mt-4 h-1 w-20 rounded-full bg-teal-700" />
        </div>

        <NavLink
          to="/dtncamp"
          className="inline-flex w-fit items-center rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
        >
          Share Love
          <span className="ml-2">→</span>
        </NavLink>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {campaigns.map((campaign) => (
          <div
            key={campaign.title}
            className="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="grid sm:grid-cols-2">
              <div className="overflow-hidden">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-full"
                />
              </div>

              <div className="flex flex-col justify-center p-5 sm:p-6">
                <h3 className="text-xl font-extrabold text-slate-800">
                  {campaign.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {campaign.description}
                </p>

                <NavLink
                  to="/dtncamp"
                  className="mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-teal-700 text-teal-700 transition hover:bg-teal-700 hover:text-white"
                  aria-label={`Donate to ${campaign.title}`}
                >
                  <FaDonate />
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DonateSection;
