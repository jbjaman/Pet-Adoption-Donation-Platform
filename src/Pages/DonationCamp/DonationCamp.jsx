import { Helmet } from "react-helmet-async";
import { FaSackDollar } from "react-icons/fa6";
import { FaHandHoldingDollar } from "react-icons/fa6";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { FaHourglassEnd } from "react-icons/fa";


const DonationCamp = () => {
    const axiosSecure = UseAxiosPublic();
    const { data: donations = [] } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donations');
            return res.data;
        }
    });

    return (
        <>
            <Helmet><title>Paw | Donation Camp</title></Helmet>
            <div className="pt-32 min-h-screen px-10">
                <div className="grid grid-cols-3 my-3 gap-3 ">
                    {
                        donations.map((don) =>
                            <div key={don._id} className=" shadow-md shadow-slate-400 rounded-3xl">
                                <div className=" w-full">
                                    <img className="rounded-3xl rounded-b-none" src={don.image} alt="" />
                                </div>
                                <div className=" text-slate-800 bg-teal-50 w-full rounded-3xl px-5 py-2">
                                    <p className="text-3xl font-extrabold ">{don.name}</p>
                                    <p className="text-base my-3 flex items-center gap-3"><FaHourglassEnd></FaHourglassEnd>{don.lastdate}</p>
                                    <div className="flex justify-between my-4 items-center">
                                        <p className="flex items-center text-base gap-3"><FaSackDollar></FaSackDollar>{don.maxdonation}</p>
                                        <p className="flex items-center text-lg gap-2"><FaHandHoldingDollar></FaHandHoldingDollar>100</p>
                                    </div>
                                    {
                                        don.donstatus === "false" ?
                                            <button disabled className="w-full rounded-lg border border-teal-800  text-base font-bold text-slate-800 px-3 py-1">Paused</button> :
                                            <NavLink to={`/dtncampdetails/${don._id}`}><button className="w-full rounded-lg border border-teal-800 hover:border-2 text-base font-bold text-slate-800 px-3 py-1">View Details</button></NavLink>

                                    }

                                </div>
                            </div>



                        )
                    }
                    {/* <div className=" grid grid-cols-3 shadow-md shadow-slate-400 rounded-3xl">
                        <div>
                            <img className=" rounded-l-3xl" src="https://i.ibb.co/k0DRKpv/dog1.png" alt="" />
                        </div>
                        <div className="col-span-2 text-slate-800 bg-teal-50 w-full rounded-r-3xl px-5 py-2">
                            <p className="text-3xl font-extrabold ">{donations.length}</p>
                            <p className="text-xl my-3">Last Date</p>
                            <div className="flex justify-between my-4 items-center">
                                <p className="flex items-center text-base gap-3"><FaSackDollar></FaSackDollar>3000</p>
                                <p className="flex items-center text-lg gap-2"><FaHandHoldingDollar></FaHandHoldingDollar>500</p>
                            </div>
                            <button className="w-full rounded-lg border border-teal-800 hover:border-2 text-base font-bold text-slate-800 px-3 py-1">View Details</button>
                        </div>
                    </div> */}
                    {/* <div className=" grid grid-cols-3 shadow-md shadow-slate-400 rounded-3xl">
                        <div>
                            <img className=" rounded-l-3xl" src="https://i.ibb.co/5BhfV28/cat1.png" alt="" />
                        </div>
                        <div className="col-span-2 text-slate-800 bg-teal-50 w-full rounded-r-3xl px-5 py-2">
                            <p className="text-3xl font-extrabold ">Chole</p>
                            <p className="text-xl my-3">Last Date</p>
                            <div className="flex justify-between my-4 items-center">
                                <p className="flex items-center text-base gap-3"><FaSackDollar></FaSackDollar>5000</p>
                                <p className="flex items-center text-lg gap-2"><FaHandHoldingDollar></FaHandHoldingDollar>3500</p>
                            </div>
                            <button className="w-full rounded-lg border border-teal-800 hover:border-2 text-base font-bold text-slate-800 px-3 py-1">View Details</button>
                        </div>
                    </div> */}

                </div>
            </div>
        </>

    );
};

export default DonationCamp;