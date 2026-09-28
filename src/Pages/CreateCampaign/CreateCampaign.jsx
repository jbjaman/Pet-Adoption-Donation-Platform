import { FaImage } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { CgDetailsLess } from "react-icons/cg";
import { CgDetailsMore } from "react-icons/cg";
import { SiPetsathome } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const CreateCampaign = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxiosSecure();


    const onSubmit = async (data) => {
        console.log(data);
        console.log(data.image[0].lastModifiedDate);
        console.log(user.email);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
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
                donstatus: true
            }

            const addDonList = await axiosSecure.post('/donations', addCamp);
            console.log(addDonList.data);
            if (addDonList.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'Campaign is added to the List',
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
                                <SiPetsathome className="text-4xl text-teal-800"></SiPetsathome>
                                <div className="w-full">
                                    <input type="text"  {...register("name", { required: true })} placeholder="Name" className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
                                    {errors.name && (
                                        <p>name is required</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-5 mb-3">
                                <FaSackDollar className="text-3xl text-teal-800"></FaSackDollar>
                                <div className="w-full">
                                    <input type="text"  {...register("maxdonation", { required: true })} placeholder="Max Donation" className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
                                    {errors.maxdonation && (
                                        <p>donation is required</p>
                                    )}</div>
                            </div>


                        </div>
                        <div>
                            <div className="flex items-center gap-5 mb-3">
                                <FaImage className="text-3xl text-teal-800"></FaImage>
                                <div className="w-full">
                                    <input type="file" {...register("image", { required: true })} placeholder="Image" className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
                                    {errors.image && (
                                        <p>image is required</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-5 mb-3">
                                <FaCalendarAlt className="text-3xl text-teal-800"></FaCalendarAlt>
                                <div className="w-full">
                                    <input type="date"  {...register("lastdate", { required: true })} placeholder="Last Date" className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
                                    {errors.lastdate && (
                                        <p>last date is required</p>
                                    )}</div>
                            </div>

                        </div>
                        <div className="flex items-center gap-5 mb-3">
                            <CgDetailsLess className="text-4xl text-teal-800"></CgDetailsLess>
                            <div className="w-full">
                                <input type="text" {...register("shortdescription", { required: true })} placeholder="Short Description" className="w-full py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" />
                                {errors.shortdescription && (
                                    <p>field is required</p>
                                )}</div>
                        </div>
                        <div className="col-span-2  flex items-center gap-5 mb-3 ">
                            <CgDetailsMore className="text-4xl text-teal-800"></CgDetailsMore>
                            <div className="w-full">
                                <textarea {...register("longdescription", { required: true })} className="w-full h-16 py-3 border-b-2 focus:border-b-4 outline-none text-slate-900 text-2xl font-medium bg-teal-50  border-teal-800 placeholder:text-slate-900" placeholder="Long Description"></textarea>
                                {errors.longdescription && (
                                    <p>field is required</p>
                                )}</div>
                        </div>
                    </div>
                    <div className="">
                        <input className="w-full py-2 px-3 text-2xl text-slate-100 rounded-lg font-bold hover:border-teal-800 hover:bg-transparent border-2 border-teal-800 hover:text-teal-700 bg-teal-800" type="submit" value="Submit" />
                    </div>
                </form>
            </div >
        </div >
    );
};

export default CreateCampaign;