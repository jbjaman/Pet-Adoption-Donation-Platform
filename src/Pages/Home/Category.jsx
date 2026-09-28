import { GiRabbitHead } from "react-icons/gi";
import { LuCat } from "react-icons/lu";
import { TbDog } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const Category = () => {
  const pets = [
    {
      name: "Bruce",
      age: "3 years",
      image: "https://i.ibb.co/NjgMrZs/card1.png",
      icon: <TbDog />,
    },
    {
      name: "Tom",
      age: "3 years",
      image: "https://i.ibb.co.com/NNFfBNY/tom.png",
      icon: <LuCat />,
    },
    {
      name: "Bella",
      age: "2 years",
      image: "https://i.ibb.co/HxVskCG/card3.png",
      icon: <GiRabbitHead />,
    },
  ];

  return (
    <section className="mx-4 rounded-3xl bg-gradient-to-b from-slate-100 to-teal-50 p-5 sm:mx-6 sm:p-8 lg:mx-auto lg:max-w-7xl lg:p-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
            Find Your Companion
          </p>

          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-teal-950 sm:text-4xl lg:text-5xl">
            Pets Available
            <br className="hidden sm:block" />
            For Adoption
          </h2>

          <div className="mt-4 h-1 w-20 rounded-full bg-teal-700" />
        </div>

        <NavLink
          to="/petlist"
          className="inline-flex w-fit items-center rounded-xl border border-teal-700 px-5 py-3 text-sm font-bold text-teal-700 transition hover:bg-teal-700 hover:text-white"
        >
          See More
          <span className="ml-2">→</span>
        </NavLink>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {pets.map((pet) => (
          <div
            key={pet.name}
            className="group relative overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative aspect-[4/4.5] overflow-hidden">
              <img
                src={pet.image}
                alt={pet.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 to-transparent p-5 pt-20">
                <h3 className="text-2xl font-extrabold text-white">
                  {pet.name}
                </h3>

                <p className="mt-1 text-sm font-semibold text-slate-200">
                  {pet.age}
                </p>
              </div>

              <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-2xl text-teal-800 shadow-md backdrop-blur-sm">
                {pet.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
