import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CgDetailsLess, CgDetailsMore } from "react-icons/cg";
import { FaImage, FaPaw } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SiPetsathome } from "react-icons/si";
import { TbLanguageKatakana } from "react-icons/tb";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateMyPets = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosPublic = UseAxiosPublic();
  const axiosSecure = UseAxiosSecure();

  const loadedAllPets = useLoaderData();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const imageFile = {
        image: data.image[0],
      };

      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const updatedPet = {
          name: data.name,
          age: data.age,
          category: data.category,
          location: data.location,
          shortdescription: data.shortdescription,
          longdescription: data.longdescription,
          image: res.data.data.display_url,
          time: data.image[0].lastModifiedDate,
        };

        const updatePetList = await axiosSecure.patch(
          `/pets/${loadedAllPets._id}`,
          updatedPet,
        );

        if (updatePetList.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Pet updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: "Something went wrong while updating the pet.",
      });
    } finally {
      setLoading(false);
    }
  };

  const ErrorText = ({ children }) => (
    <p className="mt-1 text-xs font-semibold text-red-500">{children}</p>
  );

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <span className="section-label">
          <FaPaw />
          Pet management
        </span>

        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Update {loadedAllPets.name}
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Keep the pet information accurate and up to date.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form */}
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-lg font-extrabold text-slate-900">
                Pet information
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Update the information below.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Pet name
                  </label>

                  <div className="relative">
                    <SiPetsathome className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600" />

                    <input
                      type="text"
                      {...register("name", {
                        required: true,
                      })}
                      defaultValue={loadedAllPets.name}
                      className="input-field pl-11"
                    />
                  </div>

                  {errors.name && <ErrorText>Name is required</ErrorText>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Age
                  </label>

                  <div className="relative">
                    <TbLanguageKatakana className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600" />

                    <input
                      type="text"
                      {...register("age", {
                        required: true,
                      })}
                      defaultValue={loadedAllPets.age}
                      className="input-field pl-11"
                    />
                  </div>

                  {errors.age && <ErrorText>Age is required</ErrorText>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Location
                  </label>

                  <div className="relative">
                    <FaLocationDot className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600" />

                    <input
                      type="text"
                      {...register("location", {
                        required: true,
                      })}
                      defaultValue={loadedAllPets.location}
                      className="input-field pl-11"
                    />
                  </div>

                  {errors.location && (
                    <ErrorText>Location is required</ErrorText>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Category
                  </label>

                  <div className="relative">
                    <FaPaw className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600" />

                    <select
                      defaultValue={loadedAllPets.category}
                      {...register("category", {
                        required: true,
                      })}
                      className="input-field appearance-none pl-11"
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Rabbit">Rabbit</option>
                      <option value="Fish">Fish</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-lg font-extrabold text-slate-900">
                Description
              </h2>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Short description
                  </label>

                  <div className="relative">
                    <CgDetailsLess className="absolute left-4 top-4 text-xl text-teal-600" />

                    <input
                      type="text"
                      {...register("shortdescription", {
                        required: true,
                      })}
                      defaultValue={loadedAllPets.shortdescription}
                      className="input-field pl-11"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Full description
                  </label>

                  <div className="relative">
                    <CgDetailsMore className="absolute left-4 top-4 text-xl text-teal-600" />

                    <textarea
                      {...register("longdescription", {
                        required: true,
                      })}
                      defaultValue={loadedAllPets.longdescription}
                      rows="6"
                      className="input-field resize-none pl-11"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Image + submit */}
          <aside className="space-y-6">
            <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
              <img
                src={loadedAllPets.image}
                alt={loadedAllPets.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Current photo
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Upload a new image below if you want to replace it.
                </p>

                <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 transition hover:border-teal-300 hover:bg-teal-50">
                  <FaImage className="text-xl text-teal-600" />

                  <div>
                    <p className="text-sm font-bold text-slate-700">
                      Choose new image
                    </p>
                    <p className="text-xs text-slate-400">JPG, PNG or WEBP</p>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    {...register("image", {
                      required: true,
                    })}
                    className="hidden"
                  />
                </label>

                {errors.image && <ErrorText>New image is required</ErrorText>}
              </div>
            </section>

            <section className="rounded-2xl bg-teal-700 p-6 text-white shadow-xl shadow-teal-700/20">
              <FaPaw className="text-2xl text-teal-200" />

              <h2 className="mt-4 text-xl font-extrabold">Save your changes</h2>

              <p className="mt-2 text-sm leading-6 text-teal-100">
                Make sure all information is accurate before updating the
                listing.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="mt-5 w-full rounded-xl bg-white py-3 font-bold text-teal-700 transition hover:bg-teal-50 disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update pet"}
              </button>
            </section>
          </aside>
        </div>
      </form>
    </div>
  );
};

export default UpdateMyPets;
