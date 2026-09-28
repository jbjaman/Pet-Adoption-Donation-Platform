import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { FaUserGraduate } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";
import { FiClock } from "react-icons/fi";
import { PiGraduationCapBold } from "react-icons/pi";


const EducationalWorkshopDetails = () => {
    const { user } = useContext(AuthContext);
    const loadCourseDetails = useLoaderData();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = UseAxiosSecure();
    const onsubmit = async (data) => {
        console.log("Button Clicked");

        const enrolledCourse = {
            coursename: data.coursename,
            courseemail: data.courseemail,
            coursenumber: data.coursenumber,
            courseaddress: data.courseaddress,
            finished: 'false',
            owneremail: loadCourseDetails.email,
            courseimage: loadCourseDetails.image

        }
        console.log(enrolledCourse);

        const addEnrolledList = await axiosSecure.post('/enrolled', enrolledCourse);
        console.log(addEnrolledList.data);
        if (addEnrolledList.data.insertedId) {
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Enrolled Done",
                showConfirmButton: false,
                timer: 1500
            });
        }
        console.log(addEnrolledList.data);

    }

    return (
        <>
            <Helmet>
                <title>Paw | Course Details</title>
            </Helmet>
            <div className="pt-32 min-h-screen px-10">
                <div className=" grid grid-cols-4 shadow-md shadow-slate-400 rounded-3xl">
                    <div className="">
                        <img className="h-full rounded-l-3xl" src={loadCourseDetails.image} alt="" />
                    </div>
                    <div className="col-span-3 text-slate-800 bg-teal-50 w-full rounded-r-3xl px-5 py-3 grid" >
                        <p className="text-3xl font-extrabold flex items-center gap-3"><PiGraduationCapBold></PiGraduationCapBold> {loadCourseDetails.name}</p>
                        <p className="text-xl my-2 flex items-center gap-3"><FaUserGraduate></FaUserGraduate> {loadCourseDetails.instructor}</p>
                        <p className="flex items-center text-lg gap-3"><FiClock></FiClock>{loadCourseDetails.duration} Days</p>
                        <p className="flex items-center text-lg gap-3 my-2"><FaLocationDot></FaLocationDot>{loadCourseDetails.location}</p>
                        <TbListDetails></TbListDetails>
                        <p className="text-lg my-2">
                            {loadCourseDetails.outline}
                        </p>

                        <button onClick={() => document.getElementById('my_modal_1').showModal()} className="w-full rounded-lg border border-teal-800 hover:border-2 text-base font-bold text-slate-800 px-3 py-1">Done</button>
                    </div>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box bg-slate-100">
                            <form onSubmit={handleSubmit(onsubmit)}>
                                <div className="grid  gap-3 m-2">
                                    <span className="font-bold  text-slate-900 text-xl">Name</span>
                                    <input type="text" {...register("coursename", { required: true })} defaultValue={user.displayName} placeholder="" className="p-2 px-3 rounded-lg text-xl bg-white text-slate-900 outline-none" />

                                </div>
                                <div className="grid  gap-3 m-2">
                                    <span className="font-bold  text-slate-900 text-xl">Email</span>
                                    <input type="text" {...register("courseemail", { required: true })} defaultValue={user.email} placeholder="" className="p-2 px-3 rounded-lg text-xl bg-white text-slate-900 outline-none" />

                                </div>
                                <div className="grid  gap-3 m-2">
                                    <span className="font-bold  text-slate-900 text-xl">Phone Number</span>
                                    <input type="text" {...register("coursenumber", { required: true })} placeholder="" className="p-2 px-3 rounded-lg text-xl bg-white text-slate-900 outline-none" />
                                    {errors.adpnumber && (
                                        <p>number is required</p>
                                    )}
                                </div>
                                <div className="grid  gap-3 m-2">
                                    <span className="font-bold  text-slate-900 text-xl">Address</span>
                                    <input type="text" {...register("courseaddress", { required: true })} placeholder="" className="p-2 px-3 rounded-lg text-xl bg-white text-slate-900 outline-none" />
                                    {errors.adpaddress && (
                                        <p>address is required</p>
                                    )}
                                </div>
                                <button className="border border-teal-800 mx-2 mt-2 py-2 px-3 rounded-lg text-slate-900 hover:bg-teal-800 hover:text-slate-100 ">SUBMIT</button>
                            </form>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="border border-teal-800 p-2 text-lg rounded-lg text-slate-900 hover:bg-teal-800 hover:text-slate-100 ">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>

            </div>
        </>
    );
};

export default EducationalWorkshopDetails;