// import { NavLink } from "react-router-dom";
// import { FaUserGraduate } from "react-icons/fa";

// const Education = () => {
//     return (
//         <div className="bg-teal-50 mx-8 rounded-3xl p-10">
//             <div className="grid grid-cols-4">
//                 <div className="col-span-3">
//                     {/* <p className="text-4xl text-slate-800 font-bold py-5">Share The Love</p> */}
//                     <hr className="w-1/6 border-2 border-teal-900" />
//                     <p className="text-6xl text-teal-950 pt-9 font-extrabold">The Ultimate <br />Workshop Series !</p>
//                 </div>
//                 <p className="text-2xl font-bold hover:font-extrabold text-teal-800 self-end"><NavLink to="/education">Learn From the Best &gt;</NavLink></p>
//             </div>
//             <div className="grid grid-cols-2 mt-10 gap-5">
//                 <div className="grid grid-cols-2 shadow-md shadow-slate-400 rounded-3xl">
//                     <div>
//                         <img className="rounded-l-3xl" src="https://i.ibb.co/C0YxQ6Q/edu4.png" alt="" />
//                     </div>
//                     <div className=" text-slate-800 bg-teal-50 w-full rounded-r-3xl p-3">
//                         <p className="text-2xl font-extrabold ">Paws & Learn</p>
//                         <p className="font-bold my-2">Engaging and informative initiative designed to valuable knowledge about responsible pet ownership.</p>
//                         <div>
//                             <NavLink to="/education"> <button className="rounded-full border border-teal-800 hover:border-2 text-xl text-slate-800 p-2"><FaUserGraduate></FaUserGraduate></button></NavLink>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 shadow-md shadow-slate-400 rounded-3xl">
//                     <div>
//                         <img className="rounded-l-3xl" src="https://i.ibb.co/LJGFjHW/edu3.png" alt="" />
//                     </div>
//                     <div className=" text-slate-800 bg-teal-50 w-full rounded-r-3xl p-3">
//                         <p className="text-2xl font-extrabold ">Adopt & Thrive</p>
//                         <p className="font-bold my-2">Where insightful workshops guide you towards journey with your newly adopted pet.</p>
//                         <div>
//                             <NavLink to="/education"><button className="rounded-full border border-teal-800 hover:border-2 text-xl text-slate-800 p-2"><FaUserGraduate></FaUserGraduate></button></NavLink>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 shadow-md shadow-slate-400 rounded-3xl">
//                     <div>
//                         <img className="rounded-l-3xl" src="https://i.ibb.co/VYyXtgb/education2.png" alt="" />
//                     </div>
//                     <div className=" text-slate-800 bg-teal-50 w-full rounded-r-3xl p-3">
//                         <p className="text-2xl font-extrabold ">Training Tails</p>
//                         <p className="font-bold my-2">Elevate your bond with your adopted pet through expert-led workshops.</p>
//                         <div>
//                             <NavLink to="/education"> <button className="rounded-full border border-teal-800 hover:border-2 text-xl text-slate-800 p-2"><FaUserGraduate></FaUserGraduate></button></NavLink>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 shadow-md shadow-slate-400 rounded-3xl">
//                     <div>
//                         <img className="rounded-l-3xl" src="https://i.ibb.co/VqbNbN4/petedu4.png" alt="" />
//                     </div>
//                     <div className=" text-slate-800 bg-teal-50 w-full rounded-r-3xl p-3">
//                         <p className="text-2xl font-extrabold ">Pet Care 101</p>
//                         <p className="font-bold my-2">Ensuring every owner is equipped with the knowledge to a lifetime of joy with their furry friends</p>
//                         <div>
//                             <NavLink to="/education"> <button className="rounded-full border border-teal-800 hover:border-2 text-xl text-slate-800 p-2"><FaUserGraduate></FaUserGraduate></button></NavLink>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Education;

// ---------------------------------------->

import { FaUserGraduate } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Education = () => {
  return (
    <div className="bg-teal-50 mx-8 rounded-3xl p-10">
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          {/* <p className="text-4xl text-slate-800 font-bold py-5">Share The Love</p> */}
          <hr className="w-1/6 border-2 border-teal-900" />
          <p className="text-6xl text-teal-950 pt-9 font-extrabold">
            The Ultimate <br />
            Workshop Series !
          </p>
        </div>
        <p className="text-2xl font-bold hover:font-extrabold text-teal-800 self-end">
          <NavLink to="/education">Learn From the Best &gt;</NavLink>
        </p>
      </div>
      <div className="grid grid-cols-2 mt-10 gap-5">
        <div className="grid grid-cols-2 shadow-md shadow-slate-400 rounded-3xl">
          <div>
            <img
              className="rounded-l-3xl"
              src="https://i.ibb.co/C0YxQ6Q/edu4.png"
              alt=""
            />
          </div>
          <div className=" text-slate-800 bg-teal-50 w-full rounded-r-3xl p-3">
            <p className="text-2xl font-extrabold ">Paws & Learn</p>
            <p className="font-bold my-2">
              Engaging and informative initiative designed to valuable knowledge
              about responsible pet ownership.
            </p>
            <div>
              <NavLink to="/education">
                {" "}
                <button className="rounded-full border border-teal-800 hover:border-2 text-xl text-slate-800 p-2">
                  <FaUserGraduate></FaUserGraduate>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 shadow-md shadow-slate-400 rounded-3xl">
          <div>
            <img
              className="rounded-l-3xl"
              src="https://i.ibb.co/LJGFjHW/edu3.png"
              alt=""
            />
          </div>
          <div className=" text-slate-800 bg-teal-50 w-full rounded-r-3xl p-3">
            <p className="text-2xl font-extrabold ">Adopt & Thrive</p>
            <p className="font-bold my-2">
              Where insightful workshops guide you towards journey with your
              newly adopted pet.
            </p>
            <div>
              <NavLink to="/education">
                <button className="rounded-full border border-teal-800 hover:border-2 text-xl text-slate-800 p-2">
                  <FaUserGraduate></FaUserGraduate>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 shadow-md shadow-slate-400 rounded-3xl">
          <div>
            <img
              className="rounded-l-3xl"
              src="https://i.ibb.co/VYyXtgb/education2.png"
              alt=""
            />
          </div>
          <div className=" text-slate-800 bg-teal-50 w-full rounded-r-3xl p-3">
            <p className="text-2xl font-extrabold ">Training Tails</p>
            <p className="font-bold my-2">
              Elevate your bond with your adopted pet through expert-led
              workshops.
            </p>
            <div>
              <NavLink to="/education">
                {" "}
                <button className="rounded-full border border-teal-800 hover:border-2 text-xl text-slate-800 p-2">
                  <FaUserGraduate></FaUserGraduate>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 shadow-md shadow-slate-400 rounded-3xl">
          <div>
            <img
              className="rounded-l-3xl"
              src="https://i.ibb.co/VqbNbN4/petedu4.png"
              alt=""
            />
          </div>
          <div className=" text-slate-800 bg-teal-50 w-full rounded-r-3xl p-3">
            <p className="text-2xl font-extrabold ">Pet Care 101</p>
            <p className="font-bold my-2">
              Ensuring every owner is equipped with the knowledge to a lifetime
              of joy with their furry friends
            </p>
            <div>
              <NavLink to="/education">
                {" "}
                <button className="rounded-full border border-teal-800 hover:border-2 text-xl text-slate-800 p-2">
                  <FaUserGraduate></FaUserGraduate>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
