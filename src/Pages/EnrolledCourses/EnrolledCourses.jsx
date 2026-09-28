
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const EnrolledCourses = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const { data: enrolled = [], refetch } = useQuery({
        queryKey: ['enrolled'],
        queryFn: async () => {
            const res = await axiosSecure.get('/enrolled');
            return res.data;
        }
    });

    const handleSelectCourse = course => {
        Swal.fire({
            title: "Are you sure?",
            text: "Course Completed",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/enrolled/${course._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: 'Finished',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        })
    }

    const handleDeleteCourse = course => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Unenrolled?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/enrolled/${course._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Unenrolled",
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
                            enrolled.filter(coursereq => coursereq.owneremail === user.email).map((course, index) =>
                                <tr key={course._id}>
                                    <th>{index + 1}</th>
                                    <td><div className="mask mask-squircle w-12 h-12">
                                        <img src={course.courseimage} />
                                    </div></td>
                                    <td>{course.coursename}</td>
                                    <td>{course.courseemail}</td>
                                    <td>{course.coursenumber}</td>
                                    <td>{course.courseaddress}</td>
                                    <td>
                                        {
                                            course.finished === 'false' ?
                                                <button onClick={() => handleSelectCourse(course)} className="border border-teal-800 hover:text-teal-800 px-4 py-1 rounded-lg text-base" >
                                                    <TiTick></TiTick>
                                                </button> : <button disabled className=" border-teal-800 px-4 py-1 rounded-lg text-teal-800" >
                                                    <TiTick></TiTick>
                                                </button>}
                                    </td>
                                    <td>{
                                        course.finished === 'true' ?
                                            <button onClick={() => handleDeleteCourse(course)} className="border border-red-500 hover:text-red-500 px-4 py-1 rounded-lg text-base " >
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

export default EnrolledCourses;