import { FaImage } from "react-icons/fa";
import { FaLocationDot, FaUserGraduate } from "react-icons/fa6";
import { PiGraduationCapBold } from "react-icons/pi";
import { FiClock } from "react-icons/fi";
import { CgDetailsMore } from "react-icons/cg";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateCourse = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);
        console.log(user.email);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const addCourse = {
                name: data.name,
                instructor: data.instructor,
                duration: data.duration,
                location: data.location,
                outline: data.outline,
                image: res.data.data.display_url,
                email: user.email,
                endcourse: 'false'
            }

            const addCourseList = await axiosSecure.post('/courses', addCourse);
            console.log(addCourseList.data);
            if (addCourseList.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Course is added to the List",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log(res.data);
    }
    return (
        <div>
            <div className="mx-10 mt-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2">
                        <div className="mr-10">
                            <div className="flex items-center gap-5 mb-3">
                                <PiGraduationCapBold className="text-4xl text-teal-800"></PiGraduationCapBold>
                                <div className="w-full">
                                    <input type="text"  {...register("name", { required: true })} placeholder="Course Name" className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
                                    {errors.name && (
                                        <p>name is required</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-5 mb-3">
                                <FaUserGraduate className="text-4xl text-teal-800"></FaUserGraduate>
                                <div>
                                    <input type="text"  {...register("instructor", { required: true })} placeholder="Instructor" className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
                                    {errors.instructor && (
                                        <p>name is required</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-5 mb-3">
                                <FaLocationDot className="text-3xl text-teal-800"></FaLocationDot>
                                <div>
                                    <input type="text"  {...register("location", { required: true })} placeholder="Online/Offline" className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
                                    {errors.location && (
                                        <p>location is required</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-5 mb-3">
                                <FaImage className="text-3xl text-teal-800"></FaImage>
                                <div className="w-full">
                                    <input type="file" {...register("image", { required: true })} placeholder="Pet Image" className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
                                    {errors.image && (
                                        <p>image is required</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-5 mb-3">
                                <FiClock className="text-3xl text-teal-800"></FiClock>
                                <div className="w-full">
                                    <select defaultValue="default" {...register("duration", { required: true })} className="w-full py-3 border-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900">
                                        <option disabled value="default" >Total Duration</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    {errors.duration && (
                                        <p>duration is required</p>
                                    )}
                                </div>
                            </div>

                        </div>
                        <div className="col-span-2  flex items-center gap-5 mb-3 ">
                            <CgDetailsMore className="text-4xl text-teal-800"></CgDetailsMore>
                            <div className="w-full">
                                <textarea {...register("outline", { required: true })} className="w-full h-16 py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" placeholder="Course Outline"></textarea>
                                {errors.outline && (
                                    <p>field is required</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <input className="w-full py-2 px-3 text-2xl text-slate-100 rounded-lg font-bold hover:border-teal-800 hover:bg-transparent border-2 border-teal-800 hover:text-teal-700 bg-teal-800" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCourse;