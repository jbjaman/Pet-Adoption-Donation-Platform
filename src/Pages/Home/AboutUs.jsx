const AboutUs = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
            Our Mission
          </p>

          <h2 className="mt-3 text-4xl font-extrabold leading-tight text-teal-950 sm:text-5xl">
            Our Goals
          </h2>

          <div className="mt-4 h-1 w-20 rounded-full bg-teal-700" />

          <p className="mt-6 text-base leading-7 text-slate-600">
            Our mission is simple yet profound — to provide a helping hand to
            our furry friends who cannot speak for themselves. We are committed
            to ensuring that every pet receives the care, love, and attention
            they deserve.
          </p>

          <p className="mt-5 text-base leading-7 text-slate-600">
            By fostering a sense of community and shared responsibility, Paw is
            more than just an organization. Through collaborative efforts and
            community engagement, we aim to build a network of support that
            extends beyond our immediate team.
          </p>

          <p className="mt-5 text-base leading-7 text-slate-600">
            At the heart of our organization is a deep passion for animals. Pets
            are beloved members of families, loyal companions, and a source of
            joy. This understanding fuels our determination to create a better
            future for animals who may have faced hardship or abandonment.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-teal-50" />

          <img
            className="relative w-full rounded-[2rem] object-cover shadow-lg"
            src="https://i.ibb.co/M1KxRwH/goals.png"
            alt="Our goals"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
