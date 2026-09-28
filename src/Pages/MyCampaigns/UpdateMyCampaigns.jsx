// import { FaImage } from "react-icons/fa";
// import { useForm } from "react-hook-form"
// import { CgDetailsLess } from "react-icons/cg";
// import { CgDetailsMore } from "react-icons/cg";
// import { SiPetsathome } from "react-icons/si";
// import { FaSackDollar } from "react-icons/fa6";
// import { FaCalendarAlt } from "react-icons/fa";
// import { useContext } from "react";
// import { AuthContext } from "../../Providers/AuthProvider";
// import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
// import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
// import { useLoaderData } from "react-router-dom";
// import Swal from "sweetalert2";

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const UpdateMyCampaigns = () => {
//     const { user } = useContext(AuthContext);
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const axiosPublic = UseAxiosPublic();
//     const axiosSecure = UseAxiosSecure();
//     const loadedoneCampaign = useLoaderData();

//     const onSubmit = async (data) => {
//         console.log(data);
//         console.log(data.image[0].lastModifiedDate);
//         console.log(user.email);
//         const imageFile = { image: data.image[0] }
//         const res = await axiosPublic.post(image_hosting_api, imageFile, {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             }
//         });
//         if (res.data.success) {
//             const addCampaign = {
//                 name: data.name,
//                 maxdonation: data.maxdonation,
//                 lastdate: data.lastdate,
//                 shortdescription: data.shortdescription,
//                 longdescription: data.longdescription,
//                 image: res.data.data.display_url,
//                 time: data.image[0].lastModifiedDate,

//             }

//             const addCampList = await axiosSecure.patch(`/donations/${loadedoneCampaign._id}`, addCampaign);
//             console.log(addCampList.data);
//             if (addCampList.data.modifiedCount > 0) {

//                 Swal.fire({
//                     position: "top-end",
//                     icon: "success",
//                     title: "Updated",
//                     showConfirmButton: false,
//                     timer: 1500
//                 });
//             }
//         }
//         console.log(res.data);
//     }

//     return (
//         <div>
//             <div className="mx-10 mt-5">
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="grid grid-cols-2">
//                         <div className="mr-10">
//                             <div className="flex items-center gap-5 mb-5">
//                                 <SiPetsathome className="text-4xl text-teal-800"></SiPetsathome>
//                                 <input type="text"  {...register("name", { required: true })} defaultValue={loadedoneCampaign.name} placeholder="Name" className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
//                                 {errors.name && (
//                                     <p>name is required</p>
//                                 )}
//                             </div>
//                             <div className="flex items-center gap-5 mb-5">
//                                 <FaSackDollar className="text-3xl text-teal-800"></FaSackDollar>
//                                 <input type="text"  {...register("maxdonation", { required: true })} defaultValue={loadedoneCampaign.maxdonation} placeholder="Max Donation" className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
//                                 {errors.location && (
//                                     <p>donation is required</p>
//                                 )}
//                             </div>

//                         </div>
//                         <div>
//                             <div className="flex items-center gap-5 mb-5">
//                                 <FaImage className="text-3xl text-teal-800"></FaImage>
//                                 <input type="file" {...register("image", { required: true })} placeholder="Image" className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
//                                 {errors.image && (
//                                     <p>image is required</p>
//                                 )}
//                             </div>
//                             <div className="flex items-center gap-5 mb-5">
//                                 <FaCalendarAlt className="text-3xl text-teal-800"></FaCalendarAlt>
//                                 <input type="date"  {...register("lastdate", { required: true })} defaultValue={loadedoneCampaign.lastdate} placeholder="Last Date" className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
//                                 {errors.age && (
//                                     <p>date is required</p>
//                                 )}
//                             </div>

//                         </div>
//                         <div className="flex items-center gap-5 mb-5">
//                             <CgDetailsLess className="text-4xl text-teal-800"></CgDetailsLess>
//                             <input type="text" {...register("shortdescription", { required: true })} defaultValue={loadedoneCampaign.shortdescription} placeholder="Short Description" className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
//                             {errors.shortdescription && (
//                                 <p>field is required</p>
//                             )}
//                         </div>
//                         <div className="col-span-2  flex items-center gap-5 mb-5 ">
//                             <CgDetailsMore className="text-4xl text-teal-800"></CgDetailsMore>
//                             <textarea {...register("longdescription", { required: true })} defaultValue={loadedoneCampaign.longdescription} className="w-full h-20 py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" placeholder="Long Description"></textarea>
//                             {errors.longdescription && (
//                                 <p>field is required</p>
//                             )}
//                         </div>
//                     </div>
//                     <div className=" mt-6">
//                         <input className="w-full py-2 px-3 text-2xl text-slate-100 rounded-lg font-bold hover:border-teal-800 hover:bg-transparent border-2 border-teal-800 hover:text-teal-700 bg-teal-800" type="submit" value="Submit" />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UpdateMyCampaigns;

// --------------------------------------->

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CgDetailsLess, CgDetailsMore } from "react-icons/cg";
import { FaCalendarAlt, FaImage } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
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

  const onSubmit = async (data) => {
    console.log(data);
    console.log(data.image[0].lastModifiedDate);
    console.log(user.email);
    const imageFile = { image: data.image[0] };
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
      console.log(addCampList.data);
      if (addCampList.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log(res.data);
  };

  return (
    <div>
      <div className="mx-10 mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2">
            <div className="mr-10">
              <div className="flex items-center gap-5 mb-5">
                <SiPetsathome className="text-4xl text-teal-800"></SiPetsathome>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  defaultValue={loadedoneCampaign.name}
                  placeholder="Name"
                  className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900"
                />
                {errors.name && <p>name is required</p>}
              </div>
              <div className="flex items-center gap-5 mb-5">
                <FaSackDollar className="text-3xl text-teal-800"></FaSackDollar>
                <input
                  type="text"
                  {...register("maxdonation", { required: true })}
                  defaultValue={loadedoneCampaign.maxdonation}
                  placeholder="Max Donation"
                  className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900"
                />
                {errors.location && <p>donation is required</p>}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-5 mb-5">
                <FaImage className="text-3xl text-teal-800"></FaImage>
                <input
                  type="file"
                  {...register("image", { required: true })}
                  placeholder="Image"
                  className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900"
                />
                {errors.image && <p>image is required</p>}
              </div>
              <div className="flex items-center gap-5 mb-5">
                <FaCalendarAlt className="text-3xl text-teal-800"></FaCalendarAlt>
                <input
                  type="date"
                  {...register("lastdate", { required: true })}
                  defaultValue={loadedoneCampaign.lastdate}
                  placeholder="Last Date"
                  className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900"
                />
                {errors.age && <p>date is required</p>}
              </div>
            </div>
            <div className="flex items-center gap-5 mb-5">
              <CgDetailsLess className="text-4xl text-teal-800"></CgDetailsLess>
              <input
                type="text"
                {...register("shortdescription", { required: true })}
                defaultValue={loadedoneCampaign.shortdescription}
                placeholder="Short Description"
                className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900"
              />
              {errors.shortdescription && <p>field is required</p>}
            </div>
            <div className="col-span-2  flex items-center gap-5 mb-5 ">
              <CgDetailsMore className="text-4xl text-teal-800"></CgDetailsMore>
              <textarea
                {...register("longdescription", { required: true })}
                defaultValue={loadedoneCampaign.longdescription}
                className="w-full h-20 py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900"
                placeholder="Long Description"
              ></textarea>
              {errors.longdescription && <p>field is required</p>}
            </div>
          </div>
          <div className=" mt-6">
            <input
              className="w-full py-2 px-3 text-2xl text-slate-100 rounded-lg font-bold hover:border-teal-800 hover:bg-transparent border-2 border-teal-800 hover:text-teal-700 bg-teal-800"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMyCampaigns;
