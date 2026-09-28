import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { FaPaw, FaRegEdit } from "react-icons/fa";
import { FiHeart, FiMapPin, FiSearch } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const MyPets = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const [search, setSearch] = useState("");

  const { data: pets = [], refetch } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pets");
      return res.data;
    },
  });

  const myPets = pets.filter(
    (pet) =>
      pet.email === user?.email &&
      (pet.name?.toLowerCase().includes(search.toLowerCase()) ||
        pet.category?.toLowerCase().includes(search.toLowerCase())),
  );

  const handleAdoption = async (pet) => {
    Swal.fire({
      title: "Mark as adopted?",
      text: `${pet.name} will be marked as adopted.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Confirm",
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
            title: "Marked as adopted",
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
            text: "Pet removed successfully.",
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
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="section-label">
            <FiHeart />
            Your listings
          </span>

          <h1 className="text-3xl font-extrabold text-slate-900">My Pets</h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage the pets you&apos;ve listed for adoption.
          </p>
        </div>

        <NavLink to="/dashboard/addpet" className="primary-btn">
          <FaPaw />
          Add new pet
        </NavLink>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-teal-50 p-4">
          <p className="text-xs font-semibold text-teal-600">Total</p>
          <p className="mt-1 text-2xl font-extrabold text-teal-800">
            {myPets.length}
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4">
          <p className="text-xs font-semibold text-emerald-600">Available</p>
          <p className="mt-1 text-2xl font-extrabold text-emerald-700">
            {myPets.filter((pet) => pet.adopted === "false").length}
          </p>
        </div>

        <div className="col-span-2 rounded-2xl bg-slate-100 p-4 sm:col-span-1">
          <p className="text-xs font-semibold text-slate-500">Adopted</p>
          <p className="mt-1 text-2xl font-extrabold text-slate-700">
            {myPets.filter((pet) => pet.adopted === "true").length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
        <FiSearch className="ml-2 text-slate-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your pets..."
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
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
              {myPets.map((pet) => (
                <tr key={pet._id} className="transition hover:bg-slate-50">
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
                          {pet.age} years
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
                    <span className="flex items-center gap-1 text-sm text-slate-500">
                      <FiMapPin />
                      {pet.location}
                    </span>
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
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white disabled:opacity-30"
                      >
                        <FaPaw />
                      </button>

                      <NavLink
                        to={`/dashboard/updatemypets/${pet._id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white"
                      >
                        <FaRegEdit />
                      </NavLink>

                      <button
                        onClick={() => handleDeletePet(pet)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white"
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

      {/* Mobile */}
      <div className="grid gap-4 md:hidden">
        {myPets.map((pet) => (
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
                <h3 className="font-bold text-slate-900">{pet.name}</h3>

                <p className="mt-1 text-xs text-slate-400">
                  {pet.age} years • {pet.category}
                </p>

                <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                  <FiMapPin />
                  {pet.location}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                disabled={pet.adopted === "true"}
                onClick={() => handleAdoption(pet)}
                className="rounded-lg bg-teal-50 py-2 text-teal-700 disabled:opacity-30"
              >
                <FaPaw className="mx-auto" />
              </button>

              <NavLink
                to={`/dashboard/updatemypets/${pet._id}`}
                className="rounded-lg bg-amber-50 py-2 text-center text-amber-600"
              >
                <FaRegEdit className="mx-auto" />
              </NavLink>

              <button
                onClick={() => handleDeletePet(pet)}
                className="rounded-lg bg-red-50 py-2 text-red-500"
              >
                <MdDelete className="mx-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {myPets.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <FaPaw className="mx-auto text-4xl text-slate-200" />

          <h3 className="mt-4 font-bold text-slate-700">
            You haven&apos;t listed any pets
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Add a pet and help them find their new home.
          </p>

          <NavLink to="/dashboard/addpet" className="primary-btn mt-5">
            Add your first pet
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default MyPets;
