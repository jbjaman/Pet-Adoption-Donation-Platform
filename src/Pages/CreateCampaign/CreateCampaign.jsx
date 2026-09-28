import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CgDetailsLess, CgDetailsMore } from "react-icons/cg";
import { FaCalendarAlt, FaImage } from "react-icons/fa";
import { FaCloudArrowUp, FaSackDollar } from "react-icons/fa6";
import { SiPetsathome } from "react-icons/si";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateCampaign = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosPublic = UseAxiosPublic();
  const axiosSecure = UseAxiosSecure();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const imageFile = {
        image: data.image[0],
      };

      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const addCamp = {
          name: data.name,
          maxdonation: data.maxdonation,
          lastdate: data.lastdate,
          shortdescription: data.shortdescription,
          longdescription: data.longdescription,
          image: res.data.data.display_url,
          time: data.image[0].lastModifiedDate,
          email: user.email,
          donstatus: true,
        };

        const addDonList = await axiosSecure.post("/donations", addCamp);

        if (addDonList.data.insertedId) {
          reset();
          setSelectedImage("");

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Campaign is added to the List",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Unable to create the campaign. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-slate-50 px-4 py-28 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <span className="inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-teal-800">
              Campaign Management
            </span>

            <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Create a Donation Campaign
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Share a campaign and help provide the care, treatment, food, or
              shelter that pets need.
            </p>
          </div>

          {/* Form Card */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-teal-50/60 px-6 py-5 sm:px-8">
              <h2 className="text-xl font-bold text-slate-900">
                Campaign Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Fill in the details below to publish your campaign.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Campaign Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"
                  >
                    <SiPetsathome className="text-lg text-teal-700" />
                    Campaign Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    {...register("name", {
                      required: true,
                    })}
                    placeholder="Enter campaign name"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  />

                  {errors.name && (
                    <p className="mt-1 text-sm font-medium text-red-500">
                      Campaign name is required.
                    </p>
                  )}
                </div>

                {/* Max Donation */}
                <div>
                  <label
                    htmlFor="maxdonation"
                    className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"
                  >
                    <FaSackDollar className="text-lg text-teal-700" />
                    Maximum Donation
                  </label>

                  <input
                    id="maxdonation"
                    type="text"
                    {...register("maxdonation", {
                      required: true,
                    })}
                    placeholder="Enter donation goal"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  />

                  {errors.maxdonation && (
                    <p className="mt-1 text-sm font-medium text-red-500">
                      Donation goal is required.
                    </p>
                  )}
                </div>

                {/* Last Date */}
                <div>
                  <label
                    htmlFor="lastdate"
                    className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"
                  >
                    <FaCalendarAlt className="text-lg text-teal-700" />
                    Campaign End Date
                  </label>

                  <input
                    id="lastdate"
                    type="date"
                    {...register("lastdate", {
                      required: true,
                    })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  />

                  {errors.lastdate && (
                    <p className="mt-1 text-sm font-medium text-red-500">
                      Last date is required.
                    </p>
                  )}
                </div>

                {/* Image */}
                <div>
                  <label
                    htmlFor="image"
                    className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"
                  >
                    <FaImage className="text-lg text-teal-700" />
                    Campaign Image
                  </label>

                  <label
                    htmlFor="image"
                    className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 transition hover:border-teal-500 hover:bg-teal-50"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                      <FaCloudArrowUp className="text-xl" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {selectedImage || "Choose campaign image"}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        JPG, PNG or other supported image
                      </p>
                    </div>
                  </label>

                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    {...register("image", {
                      required: true,
                      onChange: (event) => {
                        const file = event.target.files?.[0];

                        setSelectedImage(file?.name || "");
                      },
                    })}
                    className="hidden"
                  />

                  {errors.image && (
                    <p className="mt-1 text-sm font-medium text-red-500">
                      Campaign image is required.
                    </p>
                  )}
                </div>

                {/* Short Description */}
                <div className="lg:col-span-2">
                  <label
                    htmlFor="shortdescription"
                    className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"
                  >
                    <CgDetailsLess className="text-xl text-teal-700" />
                    Short Description
                  </label>

                  <input
                    id="shortdescription"
                    type="text"
                    {...register("shortdescription", {
                      required: true,
                    })}
                    placeholder="Write a short summary about this campaign"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  />

                  {errors.shortdescription && (
                    <p className="mt-1 text-sm font-medium text-red-500">
                      Short description is required.
                    </p>
                  )}
                </div>

                {/* Long Description */}
                <div className="lg:col-span-2">
                  <label
                    htmlFor="longdescription"
                    className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"
                  >
                    <CgDetailsMore className="text-xl text-teal-700" />
                    Detailed Description
                  </label>

                  <textarea
                    id="longdescription"
                    rows="6"
                    {...register("longdescription", {
                      required: true,
                    })}
                    placeholder="Explain why this campaign is needed and how donations will help..."
                    className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base leading-7 text-slate-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  />

                  {errors.longdescription && (
                    <p className="mt-1 text-sm font-medium text-red-500">
                      Detailed description is required.
                    </p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="mt-8 border-t border-slate-200 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-base font-bold text-white transition sm:w-auto sm:min-w-[220px] ${
                    isSubmitting
                      ? "cursor-not-allowed bg-teal-400"
                      : "bg-teal-700 hover:bg-teal-800"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating Campaign...
                    </>
                  ) : (
                    <>
                      <FaCloudArrowUp />
                      Create Campaign
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateCampaign;
