// import { FaRegEdit } from "react-icons/fa";
// import { MdOutlinePause } from "react-icons/md";
// import { BiDonateHeart } from "react-icons/bi";
// import { useContext } from "react";
// import { AuthContext } from "../../Providers/AuthProvider";
// import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { MdPlayArrow } from "react-icons/md";
// import Swal from "sweetalert2";
// import { NavLink } from "react-router-dom";

// const MyCampaigns = () => {
//     const { user } = useContext(AuthContext);
//     const axiosSecure = UseAxiosSecure();
//     const { data: donations = [], refetch } = useQuery({
//         queryKey: ['donations'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/donations');
//             return res.data;
//         }
//     });

//     const handlePauseDon = donations => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "I want to pause the campaign",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.patch(`/donations/${donations._id}`)
//                     .then(res => {
//                         console.log(res.data);
//                         if (res.data.modifiedCount > 0) {
//                             refetch();
//                             Swal.fire({
//                                 position: "top-end",
//                                 icon: "success",
//                                 title: 'Campaign Paused',
//                                 showConfirmButton: false,
//                                 timer: 1500
//                             });
//                         }
//                     })
//             }
//         })
//     }

//     return (
//         <>
//             <div className="">
//                 <table className="text-center w-full ">
//                     <thead className=" bg-slate-100 text-sm text-teal-800">
//                         <tr>
//                             <th>SL No.</th>
//                             <th>Name</th>
//                             <th>Max Donation</th>
//                             <th>Progress</th>
//                             <th>View</th>
//                             <th>Status</th>
//                             <th>Update</th>

//                         </tr>
//                     </thead>
//                     <tbody className="text-slate-900 h-12">
//                         {
//                             donations.filter(mycamp => mycamp.email === user.email).map((donations, index) =>
//                                 <tr key={donations._id}>
//                                     <th>{index + 1}</th>
//                                     <td>{donations.name}</td>
//                                     <td>${donations.maxdonation}</td>
//                                     <td><progress className="progress progress-success" value={100} max={donations.maxdonation}></progress></td>
//                                     <td>
//                                         <button className="border border-teal-800 hover:text-teal-800 px-4 py-1 rounded-lg text-sm" >
//                                             <BiDonateHeart></BiDonateHeart>
//                                         </button>
//                                     </td>
//                                     <td>
//                                         {donations.donstatus === true ?
//                                             <button onClick={() => handlePauseDon(donations)} className="border border-teal-800 hover:text-teal-800 px-4 py-1 rounded-lg text-sm" ><MdPlayArrow></MdPlayArrow>
//                                             </button> : <button disabled className=" text-teal-800 px-4 py-1 rounded-lg text-sm" ><MdOutlinePause></MdOutlinePause>
//                                             </button>
//                                         }
//                                     </td>
//                                     <td>
//                                         <NavLink to={`/dashboard/updatemycampaigns/${donations._id}`}>  <button className="border border-yellow-800 hover:text-yellow-800 px-4 py-1 rounded-lg text-sm" >
//                                             <FaRegEdit></FaRegEdit>
//                                         </button></NavLink>
//                                     </td>

//                                 </tr>

//                             )

//                         }

//                     </tbody>
//                     {/* foot */}
//                     <tfoot className="bg-slate-100 text-sm rounded-2xl">
//                         <tr>
//                             <th>SL No.</th>
//                             <th>Name</th>
//                             <th>Max Donation</th>
//                             <th>Progress</th>
//                             <th>View</th>
//                             <th>Status</th>
//                             <th>Update</th>

//                         </tr>
//                     </tfoot>

//                 </table>
//             </div>
//         </>
//     );
// };

// export default MyCampaigns;

// -------------------------------------->

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { BiDonateHeart } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlinePause, MdPlayArrow } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const MyCampaigns = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const { data: donations = [], refetch } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  const handlePauseDon = (donations) => {
    Swal.fire({
      title: "Are you sure?",
      text: "I want to pause the campaign",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/donations/${donations._id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Campaign Paused",
              showConfirmButton: false,
              timer: 1500,
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
              <th>Name</th>
              <th>Max Donation</th>
              <th>Progress</th>
              <th>View</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody className="text-slate-900 h-12">
            {donations
              .filter((mycamp) => mycamp.email === user.email)
              .map((donations, index) => (
                <tr key={donations._id}>
                  <th>{index + 1}</th>
                  <td>{donations.name}</td>
                  <td>${donations.maxdonation}</td>
                  <td>
                    <progress
                      className="progress progress-success"
                      value={100}
                      max={donations.maxdonation}
                    ></progress>
                  </td>
                  <td>
                    <button className="border border-teal-800 hover:text-teal-800 px-4 py-1 rounded-lg text-sm">
                      <BiDonateHeart></BiDonateHeart>
                    </button>
                  </td>
                  <td>
                    {donations.donstatus === true ? (
                      <button
                        onClick={() => handlePauseDon(donations)}
                        className="border border-teal-800 hover:text-teal-800 px-4 py-1 rounded-lg text-sm"
                      >
                        <MdPlayArrow></MdPlayArrow>
                      </button>
                    ) : (
                      <button
                        disabled
                        className=" text-teal-800 px-4 py-1 rounded-lg text-sm"
                      >
                        <MdOutlinePause></MdOutlinePause>
                      </button>
                    )}
                  </td>
                  <td>
                    <NavLink
                      to={`/dashboard/updatemycampaigns/${donations._id}`}
                    >
                      {" "}
                      <button className="border border-yellow-800 hover:text-yellow-800 px-4 py-1 rounded-lg text-sm">
                        <FaRegEdit></FaRegEdit>
                      </button>
                    </NavLink>
                  </td>
                </tr>
              ))}
          </tbody>
          {/* foot */}
          <tfoot className="bg-slate-100 text-sm rounded-2xl">
            <tr>
              <th>SL No.</th>
              <th>Name</th>
              <th>Max Donation</th>
              <th>Progress</th>
              <th>View</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default MyCampaigns;
