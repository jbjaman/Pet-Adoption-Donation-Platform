// import { useContext } from "react";
// import { AuthContext } from "../../Providers/AuthProvider";
// import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { FaRegEdit } from "react-icons/fa";
// import { NavLink } from "react-router-dom";
// import { MdDelete } from "react-icons/md";
// import { FaUserGraduate } from "react-icons/fa";

// const MyCourses = () => {
//     const { user } = useContext(AuthContext);
//     const axiosSecure = UseAxiosSecure();
//     const { data: courses = [], refetch } = useQuery({
//         queryKey: ['courses'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/courses');
//             return res.data;
//         }
//     });

//     const handleFinishedCourse = async (course) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "Finished",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Ok"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 console.log(course.email);
//                 const updateCourse = {

//                     name: course.name,
//                     instructor: course.instructor,
//                     duration: course.duration,
//                     location: course.location,
//                     outline: course.outline,
//                     image: course.image,
//                     email: course.email,
//                     endcourse: "true"

//                 }
//                 const updated = axiosSecure.put(`/courses/${course._id}`, updateCourse)
//                     .then(res => {
//                         console.log(updated.data);
//                         if (res.data.modifiedCount > 0) {
//                             refetch();
//                             Swal.fire({
//                                 position: "top-end",
//                                 icon: "success",
//                                 title: 'Course Finished',
//                                 showConfirmButton: false,
//                                 timer: 1500
//                             });
//                         }
//                     })
//             }
//         })
//     }

//     const handleDeletecourse = course => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You want to delete?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.delete(`/courses/${course._id}`)
//                     .then(res => {
//                         if (res.data.deletedCount > 0) {
//                             refetch();
//                             Swal.fire({
//                                 title: "Deleted!",
//                                 text: "This Course has been deleted.",
//                                 icon: "success"
//                             });
//                         }
//                     })
//             }
//         });
//     }

//     return (
//         <>
//             <div className="">
//                 <table className="text-center w-full ">
//                     <thead className=" bg-slate-100 text-sm text-teal-800">
//                         <tr>
//                             <th>SL No.</th>
//                             <th>Profile</th>
//                             <th>Name</th>
//                             <th>Duration</th>
//                             <th>Status</th>
//                             <th>Finished</th>
//                             <th>Update</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody className="text-slate-900">
//                         {
//                             courses.filter(mycourses => mycourses.email === user.email).map((courses, index) =>
//                                 <tr key={courses._id}>
//                                     <th>{index + 1}</th>
//                                     <td className="flex justify-center"><div className="mask mask-squircle w-12 h-12">
//                                         <img src={courses.image} />
//                                     </div></td>
//                                     <td>{courses.name}</td>
//                                     <td>{courses.duration}</td>
//                                     <td>{courses.endcourse === 'true' ? "Finished" : "Running"}</td>
//                                     <td>{courses.endcourse === 'false' ? <button onClick={() => { handleFinishedCourse(courses) }} className="border border-teal-800 hover:text-teal-800 px-4 py-1 rounded-lg text-sm" >
//                                         <FaUserGraduate></FaUserGraduate>
//                                     </button> :
//                                         <button disabled className="  text-teal-800 px-4 py-1 rounded-lg text-sm" >
//                                             <FaUserGraduate></FaUserGraduate>
//                                         </button>
//                                     }
//                                     </td>
//                                     <td>
//                                         <NavLink to={`/dashboard/updatemycourses/${courses._id}`}>  <button className="border border-yellow-800 hover:text-yellow-800 px-4 py-1 rounded-lg text-sm" >
//                                             <FaRegEdit></FaRegEdit>
//                                         </button></NavLink>
//                                     </td>
//                                     <td>
//                                         <button onClick={() => handleDeletecourse(courses)} className="border border-red-500 hover:text-red-500 px-4 py-1 rounded-lg text-sm " >
//                                             <MdDelete></MdDelete>
//                                         </button>
//                                     </td>
//                                 </tr>
//                             )
//                         }
//                     </tbody>
//                     {/* foot */}
//                     <tfoot className="bg-slate-100 text-sm rounded-2xl">
//                         <tr>
//                             <th>SL No.</th>
//                             <th>Profile</th>
//                             <th>Name</th>
//                             <th>Duration</th>
//                             <th>Status</th>
//                             <th>Finished</th>
//                             <th>Update</th>
//                             <th>Delete</th>
//                         </tr>
//                     </tfoot>

//                 </table>
//             </div>
//         </>
//     );
// };

// export default MyCourses;

// ------------------------------------>

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaRegEdit, FaUserGraduate } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const { data: courses = [], refetch } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courses");
      return res.data;
    },
  });

  const handleFinishedCourse = async (course) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Finished",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(course.email);
        const updateCourse = {
          name: course.name,
          instructor: course.instructor,
          duration: course.duration,
          location: course.location,
          outline: course.outline,
          image: course.image,
          email: course.email,
          endcourse: "true",
        };
        const updated = axiosSecure
          .put(`/courses/${course._id}`, updateCourse)
          .then((res) => {
            console.log(updated.data);
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Course Finished",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  const handleDeletecourse = (course) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/courses/${course._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "This Course has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <>
      <div className="">
        <table className="text-center w-full ">
          <thead className=" bg-slate-100 text-sm text-teal-800">
            <tr>
              <th>SL No.</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Finished</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-slate-900">
            {courses
              .filter((mycourses) => mycourses.email === user.email)
              .map((courses, index) => (
                <tr key={courses._id}>
                  <th>{index + 1}</th>
                  <td className="flex justify-center">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={courses.image} />
                    </div>
                  </td>
                  <td>{courses.name}</td>
                  <td>{courses.duration}</td>
                  <td>
                    {courses.endcourse === "true" ? "Finished" : "Running"}
                  </td>
                  <td>
                    {courses.endcourse === "false" ? (
                      <button
                        onClick={() => {
                          handleFinishedCourse(courses);
                        }}
                        className="border border-teal-800 hover:text-teal-800 px-4 py-1 rounded-lg text-sm"
                      >
                        <FaUserGraduate></FaUserGraduate>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="  text-teal-800 px-4 py-1 rounded-lg text-sm"
                      >
                        <FaUserGraduate></FaUserGraduate>
                      </button>
                    )}
                  </td>
                  <td>
                    <NavLink to={`/dashboard/updatemycourses/${courses._id}`}>
                      {" "}
                      <button className="border border-yellow-800 hover:text-yellow-800 px-4 py-1 rounded-lg text-sm">
                        <FaRegEdit></FaRegEdit>
                      </button>
                    </NavLink>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeletecourse(courses)}
                      className="border border-red-500 hover:text-red-500 px-4 py-1 rounded-lg text-sm "
                    >
                      <MdDelete></MdDelete>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          {/* foot */}
          <tfoot className="bg-slate-100 text-sm rounded-2xl">
            <tr>
              <th>SL No.</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Finished</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default MyCourses;
