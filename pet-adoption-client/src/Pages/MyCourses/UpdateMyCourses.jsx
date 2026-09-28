// import { useContext } from "react";
// import { AuthContext } from "../../Providers/AuthProvider";
// import { useForm } from "react-hook-form";
// import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
// import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
// import { useLoaderData } from "react-router-dom";
// import Swal from "sweetalert2";
// import { PiGraduationCapBold } from "react-icons/pi";
// import { FaImage, FaUserGraduate } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { FiClock } from "react-icons/fi";
// import { CgDetailsMore } from "react-icons/cg";

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const UpdateMyCourses = () => {
//     const { user } = useContext(AuthContext);
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const axiosPublic = UseAxiosPublic();
//     const axiosSecure = UseAxiosSecure();
//     const loadedAllCourses = useLoaderData();

//     const onSubmit = async (data) => {
//         console.log(data);
//         console.log(user.email);
//         const imageFile = { image: data.image[0] }
//         const res = await axiosPublic.post(image_hosting_api, imageFile, {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             }
//         });
//         if (res.data.success) {
//             const addCourse = {
//                 name: data.name,
//                 instructor: data.instructor,
//                 duration: data.duration,
//                 location: data.location,
//                 outline: data.outline,
//                 image: res.data.data.display_url,
//             }

//             const addCourseList = await axiosSecure.patch(`/courses/${loadedAllCourses._id}`, addCourse);
//             console.log(addCourseList.data);
//             if (addCourseList.data.modifiedCount > 0) {
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
//                             <div className="flex items-center gap-5 mb-3">
//                                 <PiGraduationCapBold className="text-4xl text-teal-800"></PiGraduationCapBold>
//                                 <input type="text"  {...register("name", { required: true })} defaultValue={loadedAllCourses.name} placeholder="Course Name" className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
//                                 {errors.name && (
//                                     <p>name is required</p>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-5 mb-3">
//                             <FaUserGraduate className="text-4xl text-teal-800"></FaUserGraduate>
//                             <input type="text"  {...register("instructor", { required: true })} placeholder="Instructor" defaultValue={loadedAllCourses.instructor} className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
//                             {errors.instructor && (
//                                 <p>name is required</p>
//                             )}

//                         </div>
//                         <div className="mr-10">
//                             <div className="flex items-center gap-5 mb-3">
//                                 <FaLocationDot className="text-3xl text-teal-800"></FaLocationDot>
//                                 <input type="text"  {...register("location", { required: true })} placeholder="Online/Offline" defaultValue={loadedAllCourses.location} className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
//                                 {errors.location && (
//                                     <p>location is required</p>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-5 mb-3">
//                             <FaImage className="text-3xl text-teal-800"></FaImage>
//                             <input type="file" {...register("image", { required: true })} placeholder="Pet Image" className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
//                             {errors.image && (
//                                 <p>image is required</p>
//                             )}
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-2">

//                         <div className="mr-10">
//                             <div className="flex items-center gap-5 mb-3">
//                                 <FiClock className="text-3xl text-teal-800"></FiClock>
//                                 <select defaultValue={loadedAllCourses.duration} {...register("duration", { required: true })} className="w-full py-3 border-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900">
//                                     <option value="1">1</option>
//                                     <option value="2">2</option>
//                                     <option value="3">3</option>
//                                     <option value="4">4</option>
//                                     <option value="5">5</option>
//                                 </select>
//                                 {errors.duration && (
//                                     <p>duration is required</p>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="col-span-2  flex items-center gap-5 mb-3 ">
//                             <CgDetailsMore className="text-4xl text-teal-800"></CgDetailsMore>
//                             <textarea {...register("outline", { required: true })} className="w-full h-16 py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" defaultValue={loadedAllCourses.outline} placeholder="Course Outline"></textarea>
//                             {errors.outline && (
//                                 <p>field is required</p>
//                             )}
//                         </div>
//                     </div>
//                     <div className="">
//                         <input className="w-full py-2 px-3 text-2xl text-slate-100 rounded-lg font-bold hover:border-teal-800 hover:bg-transparent border-2 border-teal-800 hover:text-teal-700 bg-teal-800" type="submit" value="Submit" />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UpdateMyCourses;

// ---------------------------------->

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CgDetailsMore } from "react-icons/cg";
import { FaImage, FaUserGraduate } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { PiGraduationCapBold } from "react-icons/pi";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateMyCourses = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = UseAxiosSecure();
  const loadedAllCourses = useLoaderData();

  const onSubmit = async (data) => {
    console.log(data);
    console.log(user.email);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const addCourse = {
        name: data.name,
        instructor: data.instructor,
        duration: data.duration,
        location: data.location,
        outline: data.outline,
        image: res.data.data.display_url,
      };

      const addCourseList = await axiosSecure.patch(
        `/courses/${loadedAllCourses._id}`,
        addCourse,
      );
      console.log(addCourseList.data);
      if (addCourseList.data.modifiedCount > 0) {
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
              <div className="flex items-center gap-5 mb-3">
                <PiGraduationCapBold className="text-4xl text-teal-800"></PiGraduationCapBold>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  defaultValue={loadedAllCourses.name}
                  placeholder="Course Name"
                  className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900"
                />
                {errors.name && <p>name is required</p>}
              </div>
            </div>
            <div className="flex items-center gap-5 mb-3">
              <FaUserGraduate className="text-4xl text-teal-800"></FaUserGraduate>
              <input
                type="text"
                {...register("instructor", { required: true })}
                placeholder="Instructor"
                defaultValue={loadedAllCourses.instructor}
                className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900"
              />
              {errors.instructor && <p>name is required</p>}
            </div>
            <div className="mr-10">
              <div className="flex items-center gap-5 mb-3">
                <FaLocationDot className="text-3xl text-teal-800"></FaLocationDot>
                <input
                  type="text"
                  {...register("location", { required: true })}
                  placeholder="Online/Offline"
                  defaultValue={loadedAllCourses.location}
                  className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900"
                />
                {errors.location && <p>location is required</p>}
              </div>
            </div>
            <div className="flex items-center gap-5 mb-3">
              <FaImage className="text-3xl text-teal-800"></FaImage>
              <input
                type="file"
                {...register("image", { required: true })}
                placeholder="Pet Image"
                className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900"
              />
              {errors.image && <p>image is required</p>}
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="mr-10">
              <div className="flex items-center gap-5 mb-3">
                <FiClock className="text-3xl text-teal-800"></FiClock>
                <select
                  defaultValue={loadedAllCourses.duration}
                  {...register("duration", { required: true })}
                  className="w-full py-3 border-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                {errors.duration && <p>duration is required</p>}
              </div>
            </div>
            <div className="col-span-2  flex items-center gap-5 mb-3 ">
              <CgDetailsMore className="text-4xl text-teal-800"></CgDetailsMore>
              <textarea
                {...register("outline", { required: true })}
                className="w-full h-16 py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900"
                defaultValue={loadedAllCourses.outline}
                placeholder="Course Outline"
              ></textarea>
              {errors.outline && <p>field is required</p>}
            </div>
          </div>
          <div className="">
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

export default UpdateMyCourses;
