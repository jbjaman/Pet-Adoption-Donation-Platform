// import { Helmet } from "react-helmet-async";
// import { FaPaw } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { SiPetsathome } from "react-icons/si";
// import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
// import { NavLink } from "react-router-dom";
// import { LuClock } from "react-icons/lu";

// const PetListing = () => {
//     const axiosSecure = UseAxiosPublic();
//     const { data: pets = [] } = useQuery({
//         queryKey: ['pets'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/pets');
//             return res.data;
//         }
//     });

//     return (
//         <>
//             <Helmet><title>Paw | PetList</title></Helmet>
//             <div className="pt-36 min-h-screen px-10">
//                 <div className="flex gap-5 ">
//                     <div className="flex items-center gap-5 mb-3">
//                         <SiPetsathome className="text-xl text-teal-800"></SiPetsathome>
//                         <input type="text" placeholder="Search" className=" py-2 border-b focus:border-b-2 outline-none text-slate-900 text-base font-medium bg-slate-100  border-teal-800 placeholder:text-slate-900" />
//                     </div>
//                     <div className="flex items-center gap-5 mb-3">
//                         <FaPaw className="text-lg text-teal-800"></FaPaw>
//                         <select defaultValue="default" className=" py-2  focus:border-b-2 outline-none text-slate-900 text-base font-medium bg-slate-100  border-teal-800 placeholder:text-slate-900">
//                             <option disabled value="default">Pet Category</option>
//                             <option value="Dog">Dog</option>
//                             <option value="Cat">Cat</option>
//                             <option value="Rabbit">Rabbit</option>
//                             <option value="Fish">Fish</option>
//                             <option value="Others">Others</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-3 my-3 gap-3">
//                     {
//                         pets.filter(ntadpt => ntadpt.adopted === 'false').map((pets) =>
//                             <div key={pets._id} className=" grid grid-cols-3 shadow-md shadow-slate-400 rounded-3xl">
//                                 <div>
//                                     <img className="h-full rounded-l-3xl" src={pets.image} alt="" />
//                                 </div>
//                                 <div className="col-span-2 text-slate-800 bg-teal-50 w-full rounded-r-3xl px-5 py-2">
//                                     <p className="text-3xl font-extrabold ">{pets.name}</p>
//                                     <div className="my-3 flex justify-between">
//                                         <p className="text-lg ">{pets.age} Years</p>
//                                         <p className="text-base flex items-center gap-2"><LuClock></LuClock>{pets.time.split('T')[0]}</p>
//                                     </div>

//                                     <div className="flex justify-between my-4 items-center">
//                                         <p className="flex items-center text-lg gap-3"><FaPaw></FaPaw>{pets.category}</p>
//                                         <p className="flex items-center text-lg gap-3"><FaLocationDot></FaLocationDot>{pets.location}</p>
//                                     </div>
//                                     <NavLink to={`/petdetails/${pets._id}`}><button className="w-full rounded-lg border border-teal-800 hover:border-2 text-base font-bold text-slate-800 px-3 py-1">Details</button></NavLink>
//                                 </div>
//                             </div>

//                         )
//                     }

//                 </div>
//             </div>
//         </>
//     );
// };

// export default PetListing;

// ---------------------------------------->

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaPaw } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { LuClock, LuSearch } from "react-icons/lu";
import { SiPetsathome } from "react-icons/si";
import { NavLink } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const PetListing = () => {
  const axiosSecure = UseAxiosPublic();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { data: pets = [] } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => (await axiosSecure.get("/pets")).data,
  });
  const visible = useMemo(
    () =>
      pets
        .filter((p) => p.adopted === "false")
        .filter(
          (p) =>
            !search || p.name?.toLowerCase().includes(search.toLowerCase()),
        )
        .filter((p) => category === "all" || p.category === category),
    [pets, search, category],
  );
  return (
    <>
      <Helmet>
        <title>Paw | Pet Listing</title>
      </Helmet>
      <main className="page-shell min-h-screen pb-20 pt-32">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[.2em] text-teal-700">
            Find your companion
          </p>
          <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Pets waiting for a home
          </h1>
          <p className="mt-3 max-w-2xl text-slate-500">
            Browse available pets and find a new friend who needs a little love.
          </p>
        </div>
        <div className="section-card mb-8 grid gap-3 rounded-2xl bg-white p-3 sm:grid-cols-[1fr_190px]">
          <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
            <LuSearch className="text-teal-700" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by pet name..."
              className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
            />
          </label>
          <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
            <FaPaw className="text-teal-700" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold outline-none"
            >
              <option value="all">All categories</option>
              <option>Dog</option>
              <option>Cat</option>
              <option>Rabbit</option>
              <option>Fish</option>
              <option>Others</option>
            </select>
          </label>
        </div>
        <div className="mb-5 flex items-center justify-between">
          <p className="font-bold text-slate-700">
            {visible.length} pets available
          </p>
        </div>
        {visible.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((p) => (
              <article
                key={p._id}
                className="pet-card overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg shadow-slate-900/5"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    src={p.image}
                    alt={p.name}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl font-extrabold text-slate-900">
                        {p.name}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-slate-500">
                        {p.age} years old
                      </p>
                    </div>
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                      {p.category}
                    </span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-2 text-sm font-semibold text-slate-500">
                    <span className="flex items-center gap-2">
                      <FaLocationDot className="text-teal-600" />
                      {p.location}
                    </span>
                    <span className="flex items-center justify-end gap-2">
                      <LuClock className="text-teal-600" />
                      {p.time?.split("T")[0]}
                    </span>
                  </div>
                  <NavLink
                    to={`/petdetails/${p._id}`}
                    className="mt-5 block rounded-xl bg-teal-700 py-3 text-center text-sm font-bold text-white transition hover:bg-teal-800"
                  >
                    View details
                  </NavLink>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <SiPetsathome className="mx-auto text-4xl text-teal-200" />
            <p className="mt-4 font-bold text-slate-700">No pets found</p>
            <p className="mt-1 text-sm text-slate-400">
              Try changing your search or category.
            </p>
          </div>
        )}
      </main>
    </>
  );
};
export default PetListing;
