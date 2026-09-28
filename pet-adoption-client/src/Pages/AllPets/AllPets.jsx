import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaPaw, FaRegEdit } from "react-icons/fa";
import { FiMapPin, FiSearch, FiUsers } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const AllPets = () => {
  const axiosSecure = UseAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: pets = [], refetch } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pets");
      return res.data;
    },
  });

  const filteredPets = pets.filter((pet) => {
    const value = search.toLowerCase();

    return (
      pet.name?.toLowerCase().includes(value) ||
      pet.category?.toLowerCase().includes(value) ||
      pet.location?.toLowerCase().includes(value)
    );
  });

  const handleAdoption = async (pet) => {
    Swal.fire({
      title: "Mark this pet as adopted?",
      text: `${pet.name} will no longer appear as available.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, mark adopted",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatePet = {
          name: pet.name,
          age: pet.age,
          category: pet.category,
          location: pet.location,
          shortdescription: pet.shortdescription,
          longdescription: pet.longdescription,
          image: pet.image,
          time: pet.time,
          email: pet.email,
          adopted: "true",
        };

        const updated = await axiosSecure.put(`/pets/${pet._id}`, updatePet);

        if (updated.data.modifiedCount > 0) {
          refetch();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Pet marked as adopted",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const handleDeletePet = (pet) => {
    Swal.fire({
      title: "Delete this pet?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/pets/${pet._id}`);

        if (res.data.deletedCount > 0) {
          refetch();

          Swal.fire({
            title: "Deleted",
            text: "The pet has been removed.",
            icon: "success",
            confirmButtonColor: "#0f766e",
          });
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-teal-600">
            <FiUsers />
            Administration
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            All Pets
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage every pet listed on the platform.
          </p>
        </div>

        <div className="rounded-xl bg-teal-50 px-4 py-3">
          <p className="text-xs font-semibold text-teal-600">Total Pets</p>
          <p className="text-2xl font-extrabold text-teal-800">{pets.length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
        <FiSearch className="ml-2 text-lg text-slate-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by pet name, category or location..."
          className="w-full bg-transparent text-sm text-slate-700 outline-none"
        />
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Pet</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredPets.map((pet) => (
                <tr key={pet._id} className="transition hover:bg-slate-50/80">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="h-12 w-12 rounded-xl object-cover"
                      />

                      <div>
                        <p className="font-bold text-slate-800">{pet.name}</p>
                        <p className="text-xs text-slate-400">
                          {pet.age} years old
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                      {pet.category}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <FiMapPin />
                      {pet.location}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    {pet.adopted === "true" ? (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                        Adopted
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                        Available
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        disabled={pet.adopted === "true"}
                        onClick={() => handleAdoption(pet)}
                        title="Mark adopted"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-100 text-teal-600 transition hover:bg-teal-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <FaPaw />
                      </button>

                      <NavLink
                        to={`/dashboard/updatemypets/${pet._id}`}
                        title="Edit"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-100 text-amber-600 transition hover:bg-amber-500 hover:text-white"
                      >
                        <FaRegEdit />
                      </NavLink>

                      <button
                        onClick={() => handleDeletePet(pet)}
                        title="Delete"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-500 hover:text-white"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-4 md:hidden">
        {filteredPets.map((pet) => (
          <div
            key={pet._id}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="flex gap-4">
              <img
                src={pet.image}
                alt={pet.name}
                className="h-20 w-20 rounded-2xl object-cover"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900">{pet.name}</h3>

                    <p className="text-xs text-slate-400">
                      {pet.age} years • {pet.category}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                      pet.adopted === "true"
                        ? "bg-slate-100 text-slate-500"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {pet.adopted === "true" ? "Adopted" : "Available"}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                  <FiMapPin />
                  {pet.location}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                disabled={pet.adopted === "true"}
                onClick={() => handleAdoption(pet)}
                className="rounded-lg bg-teal-50 py-2 text-sm font-bold text-teal-700 disabled:opacity-30"
              >
                <FaPaw className="mx-auto" />
              </button>

              <NavLink
                to={`/dashboard/updatemypets/${pet._id}`}
                className="rounded-lg bg-amber-50 py-2 text-center text-sm font-bold text-amber-600"
              >
                <FaRegEdit className="mx-auto" />
              </NavLink>

              <button
                onClick={() => handleDeletePet(pet)}
                className="rounded-lg bg-red-50 py-2 text-sm font-bold text-red-500"
              >
                <MdDelete className="mx-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <FaPaw className="mx-auto text-4xl text-slate-200" />
          <p className="mt-3 font-bold text-slate-600">No pets found</p>
          <p className="mt-1 text-sm text-slate-400">Try a different search.</p>
        </div>
      )}
    </div>
  );
};

export default AllPets;
