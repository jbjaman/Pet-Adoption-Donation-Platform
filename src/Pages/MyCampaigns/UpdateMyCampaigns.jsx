import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CgDetailsLess, CgDetailsMore } from "react-icons/cg";
import { FaCalendarAlt, FaImage } from "react-icons/fa";
import { FaCloudArrowUp, FaSackDollar } from "react-icons/fa6";
import { SiPetsathome } from "react-icons/si";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateMyCampaigns = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosPublic = UseAxiosPublic();
  const axiosSecure = UseAxiosSecure();

  const loadedoneCampaign = useLoaderData();

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
        const addCampaign = {
          name: data.name,
          maxdonation: data.maxdonation,
          lastdate: data.lastdate,
          shortdescription: data.shortdescription,
          longdescription: data.longdescription,
          image: res.data.data.display_url,
          time: data.image[0].lastModifiedDate,
        };

        const addCampList = await axiosSecure.patch(
          `/donations/${loadedoneCampaign._id}`,
          addCampaign,
        );

        if (addCampList.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Campaign Updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: "Unable to update the campaign. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }

    console.log(user);
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700">
            <FaRegEditIcon />
            Edit Campaign
          </span>

          <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Update Donation Campaign
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Update the information of your existing donation campaign.
          </p>
        </div>

        {/* Current Campaign */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
          <div className="h-24 w-full overflow-hidden rounded-xl sm:h-20 sm:w-28">
            <img
              src={loadedoneCampaign.image}
              alt={loadedoneCampaign.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
              Current Campaign
            </p>

            <h2 className="mt-1 truncate text-xl font-extrabold text-slate-900">
              {loadedoneCampaign.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current campaign information
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-teal-50/60 px-6 py-5 sm:px-8">
            <h2 className="text-xl font-bold text-slate-900">
              Campaign Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update the fields you want to change.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Name */}
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
                  defaultValue={loadedoneCampaign.name}
                  placeholder="Campaign name"
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
                  defaultValue={loadedoneCampaign.maxdonation}
                  placeholder="Maximum donation"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                />

                {errors.maxdonation && (
                  <p className="mt-1 text-sm font-medium text-red-500">
                    Donation goal is required.
                  </p>
                )}
              </div>

              {/* Date */}
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
                  defaultValue={loadedoneCampaign.lastdate}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                />

                {errors.lastdate && (
                  <p className="mt-1 text-sm font-medium text-red-500">
                    Campaign end date is required.
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
                  Replace Campaign Image
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
                      {selectedImage || "Choose a new image"}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Select an image to replace the current one
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
                    New campaign image is required.
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
                  defaultValue={loadedoneCampaign.shortdescription}
                  placeholder="Short description"
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
                  defaultValue={loadedoneCampaign.longdescription}
                  placeholder="Detailed campaign description"
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
                    Updating...
                  </>
                ) : (
                  <>
                    <FaCloudArrowUp />
                    Update Campaign
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

/*
 * Small local icon wrapper so the header does not need another icon import.
 */
const FaRegEditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-3.5 w-3.5"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L8 18l-4 1 1-4Z" />
  </svg>
);

export default UpdateMyCampaigns;
