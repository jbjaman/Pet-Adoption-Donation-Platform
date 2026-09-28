import { NavLink } from "react-router-dom";

const CallAction = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
          <div className="sm:row-span-2">
            <img
              className="h-full min-h-[260px] w-full rounded-3xl object-cover shadow-md transition duration-300 hover:scale-[1.01]"
              src="https://i.ibb.co/LR7YKNr/petad1.png"
              alt="Pet adoption"
            />
          </div>

          <div>
            <img
              className="h-full min-h-[180px] w-full rounded-3xl object-cover shadow-md"
              src="https://i.ibb.co/fX5yJk7/petad2.png"
              alt="Pet care"
            />
          </div>

          <div>
            <img
              className="h-full min-h-[180px] w-full rounded-3xl object-cover shadow-md"
              src="https://i.ibb.co/yscLhXm/petad3.png"
              alt="Happy pet"
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="mb-5 h-1 w-20 rounded-full bg-teal-700" />

          <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
            Pet Adoption
          </p>

          <h2 className="mt-3 text-4xl font-extrabold leading-tight text-teal-950 sm:text-5xl">
            Planning to
            <br />
            Adopt a Pet?
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600">
            Dogs make for the best friends, and it&apos;s only right that we
            celebrate them for all the joy and love they&apos;ve given us.
            Whether you are looking for a playful companion or a calm friend, we
            can help you find the right match.
          </p>

          <NavLink
            to="/petlist"
            className="mt-7 inline-flex items-center rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
          >
            How it Works
            <span className="ml-2">→</span>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default CallAction;
