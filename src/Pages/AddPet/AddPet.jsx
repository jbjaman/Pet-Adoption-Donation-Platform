import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CgDetailsLess, CgDetailsMore } from "react-icons/cg";
import { FaImage, FaPaw } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SiPetsathome } from "react-icons/si";
import { TbLanguageKatakana } from "react-icons/tb";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPet = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const axiosPublic = UseAxiosPublic();
  const axiosSecure = UseAxiosSecure();

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
        const addPet = {
          name: data.name,
          age: data.age,
          category: data.category,
          location: data.location,
          shortdescription: data.shortdescription,
          longdescription: data.longdescription,
          image: res.data.data.display_url,
          time: data.image[0].lastModifiedDate,
          email: user.email,
          adopted: "false",
        };

        const addPetList = await axiosSecure.post("/pets", addPet);

        if (addPetList.data.insertedId) {
          reset();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.name} was added successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "We couldn't add this pet right now.",
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
          Pet listing
        </span>

        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Add a new pet
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Help a pet find a loving home by providing accurate information about
          them.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main form */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic info */}
            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Basic information
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Tell people about this pet.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
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
                      className="input-field pl-11"
                      placeholder="e.g. Bruno"
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
                      className="input-field pl-11"
                      placeholder="e.g. 2"
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
                      className="input-field pl-11"
                      placeholder="e.g. Dhaka"
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
                      defaultValue=""
                      {...register("category", {
                        required: true,
                      })}
                      className="input-field appearance-none pl-11"
                    >
                      <option disabled value="">
                        Select category
                      </option>

                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Rabbit">Rabbit</option>
                      <option value="Fish">Fish</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  {errors.category && (
                    <ErrorText>Category is required</ErrorText>
                  )}
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Description
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Give potential adopters useful information.
                </p>
              </div>

              <div className="space-y-5">
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
                      className="input-field pl-11"
                      placeholder="Friendly, playful and energetic..."
                    />
                  </div>

                  {errors.shortdescription && (
                    <ErrorText>Short description is required</ErrorText>
                  )}
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
                      rows="6"
                      className="input-field resize-none pl-11"
                      placeholder="Tell potential adopters about personality, habits, care needs..."
                    />
                  </div>

                  {errors.longdescription && (
                    <ErrorText>Full description is required</ErrorText>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Image */}
            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="font-extrabold text-slate-900">Pet photo</h2>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                Use a clear and friendly photo.
              </p>

              <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center transition hover:border-teal-300 hover:bg-teal-50/50">
                <FaImage className="text-4xl text-teal-500" />

                <span className="mt-4 text-sm font-bold text-slate-700">
                  Upload photo
                </span>

                <span className="mt-1 text-xs text-slate-400">
                  JPG, PNG or WEBP
                </span>

                <input
                  type="file"
                  accept="image/*"
                  {...register("image", {
                    required: true,
                  })}
                  className="hidden"
                />
              </label>

              {errors.image && <ErrorText>Pet image is required</ErrorText>}
            </section>

            {/* Submit */}
            <section className="rounded-2xl bg-teal-700 p-6 text-white shadow-xl shadow-teal-700/20">
              <FaPaw className="text-2xl text-teal-200" />

              <h2 className="mt-4 text-xl font-extrabold">Ready to list?</h2>

              <p className="mt-2 text-sm leading-6 text-teal-100">
                Your pet will become visible to people looking for their new
                best friend.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="mt-5 w-full rounded-xl bg-white py-3 font-bold text-teal-700 transition hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Adding pet..." : "Publish pet"}
              </button>
            </section>
          </aside>
        </div>
      </form>
    </div>
  );
};

export default AddPet;
