
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdPlayArrow } from "react-icons/md";
import { MdOutlinePause } from "react-icons/md";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const AllDonation = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: donations = [], refetch } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donations');
            return res.data;
        }
    });

    const handlePauseDon = async (don) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Stop the Donation",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                const updateDon = {
                    name: don.name,
                    maxdonation: don.maxdonation,
                    lastdate: don.lastdate,
                    shortdescription: don.shortdescription,
                    longdescription: don.longdescription,
                    image: don.image,
                    time: don.time,
                    email: don.email,
                    donstatus: "false"
                }
                const donUpdated = axiosSecure.put(`/donations/${don._id}`, updateDon)
                    .then(res => {
                        console.log(donUpdated.data);
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: 'Paused',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        })

    }

    const handleDeleteDon = donat => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/donations/${donat._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Campaign has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }





    return (
        <>
            <div className="">
                <table className="text-center w-full ">
                    <thead className=" bg-slate-100 text-sm text-teal-800">
                        <tr>
                            <th>SL No.</th>
                            <th>Name</th>
                            <th>Max Donation</th>
                            <th>Progress</th>
                            <th>Pause</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-900 h-12">
                        {
                            donations.map((donations, index) =>
                                <tr key={donations._id}>
                                    <th>{index + 1}</th>
                                    <td>{donations.name}</td>
                                    <td>{donations.maxdonation}</td>
                                    <td><progress className="progress progress-success" value={300} max={donations.maxdonation}></progress></td>
                                    <td>
                                        {donations.donstatus === true ?
                                            <button onClick={() => handlePauseDon(donations)} className="border border-teal-800 hover:text-teal-800 px-4 py-1 rounded-lg text-sm" ><MdPlayArrow></MdPlayArrow>
                                            </button> : <button disabled className=" text-teal-800 px-4 py-1 rounded-lg text-sm" ><MdOutlinePause></MdOutlinePause>
                                            </button>
                                        }
                                    </td>
                                    <td>

                                        <NavLink to={`/dashboard/updatemycampaigns/${donations._id}`}>   <button className="border border-yellow-800 hover:text-yellow-800 px-4 py-1 rounded-lg text-sm" >
                                            <FaRegEdit></FaRegEdit>
                                        </button>
                                        </NavLink>
                                    </td>
                                    <td>
                                        {


                                            <button onClick={() => handleDeleteDon(donations)} className="border border-red-500 hover:text-red-500 px-4 py-1 rounded-lg text-sm " >
                                                <MdDelete></MdDelete>
                                            </button>
                                        }
                                    </td>

                                </tr>

                            )
                        }

                    </tbody>
                    {/* foot */}
                    <tfoot className="bg-slate-100 text-sm rounded-2xl">
                        <tr>
                            <th>SL No.</th>
                            <th>Name</th>
                            <th>Max Donation</th>
                            <th>Progress</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>

                        </tr>
                    </tfoot>

                </table>
            </div>
        </>
    );
};

export default AllDonation;