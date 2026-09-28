
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AdoptionReq = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const { data: adoption = [], refetch } = useQuery({
        queryKey: ['adoption'],
        queryFn: async () => {
            const res = await axiosSecure.get('/adoption');
            return res.data;
        }
    });

    const handleSelectAdp = adp => {
        Swal.fire({
            title: "Are you sure?",
            text: "I want to Accept",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/adoption/${adp._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: 'Adopted Confirm',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        })
    }






    const handleDeleteAdp = adp => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Cancel?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/adoption/${adp._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Canceled the Request",
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
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Location</th>
                            <th>Yes</th>
                            <th>No</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-900">
                        {
                            adoption.filter(adpreq => adpreq.owneremail === user.email).map((adoption, index) =>
                                <tr key={adoption._id}>
                                    <th>{index + 1}</th>
                                    <td><div className="mask mask-squircle w-12 h-12">
                                        <img src={adoption.petimage} />
                                    </div></td>
                                    <td>{adoption.adpname}</td>
                                    <td>{adoption.adpemail}</td>
                                    <td>{adoption.adpnumber}</td>
                                    <td>{adoption.adpaddress}</td>
                                    <td>
                                        {
                                            adoption.adpreq === 'true' ?
                                                <button onClick={() => handleSelectAdp(adoption)} className="border border-teal-800 hover:text-teal-800 px-4 py-1 rounded-lg text-base" >
                                                    <TiTick></TiTick>
                                                </button> : <button disabled className=" border-teal-800 px-4 py-1 rounded-lg text-teal-800" >
                                                    <TiTick></TiTick>
                                                </button>}
                                    </td>
                                    <td>{
                                        adoption.adpreq === 'true' ?
                                            <button onClick={() => handleDeleteAdp(adoption)} className="border border-red-500 hover:text-red-500 px-4 py-1 rounded-lg text-base " >
                                                <RxCross2></RxCross2>
                                            </button> :
                                            <button disabled className=" text-red-500 px-4 py-1 text-base " >
                                                <RxCross2></RxCross2>
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
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Location</th>
                            <th>Yes</th>
                            <th>No</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </>
    );
};

export default AdoptionReq;