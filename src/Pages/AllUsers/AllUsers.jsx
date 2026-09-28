import { useQuery } from "@tanstack/react-query";
import { FaUserGear } from "react-icons/fa6";
import { FaUserShield } from "react-icons/fa6";
import { FaUserSlash } from "react-icons/fa6";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
//////////////////////////////////////////////////////////////////
// if i use tanstack query table
// const userColumns = [
//     {
//         header: 'Serial',
//         accessorKey: '_id',
//     },
//     {
//         header: 'Name',
//         accessorKey: 'name',
//     },
//     {
//         header: 'Email',
//         accessorKey: 'email',
//     },
//     {
//         header: 'Role',
//         accessorKey: 'role',
//     },

// ]

// return (
//     <>
//         <h1>Total User: {user.length}</h1>
//         <Table data={user} columns={userColumns}></Table>
//     </>
// )

// }

/////////////////////////////////////////////////////////////////////////////////

const AllUsers = () => {

    const axiosSecure = UseAxiosSecure();
    const { data: user = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "Make this user Admin",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#008080",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users/admin/${user._id}`)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `${user.name} is admin now`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });

                            }
                        })

                }
            })
    }

    const handleBanUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "Ban this user",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#008080",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users/${user._id}`)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `You Banned ${user.name}`,
                                });

                            }
                        })

                }
            })
    }

    return (
        <>
            <div className="">
                <table className="text-center w-full ">

                    <thead className=" bg-slate-100 text-xl text-teal-800">
                        <tr>
                            <th>SL No.</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-900">
                        {
                            user.map((user, index) =>
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td className="flex justify-center"><div className="mask mask-squircle w-12 h-12">
                                        <img src={user.image} />
                                    </div>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role === 'admin' ? <span className="text-2xl text-teal-800 flex justify-center"><FaUserShield></FaUserShield></span> :
                                        <button className="border border-teal-800 hover:text-teal-800 px-4 py-1 rounded-lg text-xl" onClick={() => handleMakeAdmin(user)}><FaUserGear></FaUserGear></button>
                                    }
                                    </td>
                                    <td>{user.role === 'ban' ?
                                        <span className="text-2xl text-red-600 flex justify-center"><FaUserSlash></FaUserSlash></span> :
                                        <button className="border border-red-500 hover:text-red-500 px-4 py-1 rounded-lg text-xl " onClick={() => handleBanUser(user)}>
                                            <FaUserSlash></FaUserSlash>
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
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </>
    )
}
export default AllUsers;