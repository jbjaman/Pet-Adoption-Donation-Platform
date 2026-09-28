// import { FaDonate } from "react-icons/fa";
// import { NavLink } from "react-router-dom";

// const DonateSection = () => {
//     return (
//         <div className="bg-teal-50 mx-8 rounded-3xl p-10">
//             <div className="grid grid-cols-4">
//                 <div className="col-span-3">
//                     {/* <p className="text-4xl text-slate-800 font-bold py-5">Share The Love</p> */}
//                     <hr className="w-1/6 border-2 border-teal-900" />
//                     <p className="text-6xl text-teal-950 pt-9 font-extrabold">Donate To Give Pets<br />A Second Chance !</p>
//                 </div>
//                 <p className="text-2xl font-bold hover:font-extrabold text-teal-800 self-end"><NavLink to="/dtncamp">Share Love &gt;</NavLink></p>
//             </div>
//             <div className="grid grid-cols-2 mt-10 gap-5">
//                 <div className="grid grid-cols-2 shadow-md shadow-slate-400 rounded-3xl">
//                     <div>
//                         <img className="rounded-l-3xl" src="https://i.ibb.co/qyHjKx1/don1.png" alt="" />
//                     </div>
//                     <div className=" text-slate-800 bg-teal-50 w-full rounded-r-3xl p-3">
//                         <p className="text-2xl font-extrabold ">Paws for a Cause</p>
//                         <p className="font-bold my-2">Join Our Pet Donation Drive! Support will be directed towards adoption initiatives.</p>
//                         <div>
//                             <NavLink to="/dtncamp"> <button className="rounded-full border border-teal-800 hover:border-2 text-xl text-slate-800 p-2"><FaDonate></FaDonate></button></NavLink>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 shadow-md shadow-slate-400 rounded-3xl">
//                     <div>
//                         <img className="rounded-l-3xl" src="https://i.ibb.co/9yH19Tn/don2.png" alt="" />
//                     </div>
//                     <div className=" text-slate-800 bg-teal-50 w-full rounded-r-3xl p-3">
//                         <p className="text-2xl font-extrabold ">Give a Paw Up</p>
//                         <p className="font-bold my-2">Support will be directed towards adoption pets find loving families and permanent homes.</p>
//                         <div>
//                             <NavLink to="/dtncamp"><button className="rounded-full border border-teal-800 hover:border-2 text-xl text-slate-800 p-2"><FaDonate></FaDonate></button></NavLink>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 shadow-md shadow-slate-400 rounded-3xl">
//                     <div>
//                         <img className="rounded-l-3xl" src="https://i.ibb.co/tsyDyTk/don3.png" alt="" />
//                     </div>
//                     <div className=" text-slate-800 bg-teal-50 w-full rounded-r-3xl p-3">
//                         <p className="text-2xl font-extrabold ">Pet Rescue Mission</p>
//                         <p className="font-bold my-2">Your donation will go towards providing essential medical care for injured or sick animals.</p>
//                         <div>
//                             <NavLink to="/dtncamp"> <button className="rounded-full border border-teal-800 hover:border-2 text-xl text-slate-800 p-2"><FaDonate></FaDonate></button></NavLink>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 shadow-md shadow-slate-400 rounded-3xl">
//                     <div>
//                         <img className="rounded-l-3xl" src="https://i.ibb.co/thg9Wqx/campaign1.png" alt="" />
//                     </div>
//                     <div className=" text-slate-800 bg-teal-50 w-full rounded-r-3xl p-3">
//                         <p className="text-2xl font-extrabold ">Sweet Homes</p>
//                         <p className="font-bold my-2">Funds will be used to supply nutritious food and shelter for pets awaiting their forever homes.</p>
//                         <div>
//                             <NavLink to="/dtncamp"> <button className="rounded-full border border-teal-800 hover:border-2 text-xl text-slate-800 p-2"><FaDonate></FaDonate></button></NavLink>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DonateSection;

import { FaDonate } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const DonateSection = () => {
  return (
    <div className="bg-teal-50 mx-8 rounded-3xl p-10">
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          {/* <p className="text-4xl text-slate-800 font-bold py-5">Share The Love</p> */}
          <hr className="w-1/6 border-2 border-teal-900" />
          <p className="text-6xl text-teal-950 pt-9 font-extrabold">
            Donate To Give Pets
            <br />A Second Chance !
          </p>
        </div>
        <p className="text-2xl font-bold hover:font-extrabold text-teal-800 self-end">
          <NavLink to="/dtncamp">Share Love &gt;</NavLink>
        </p>
      </div>
      <div className="grid grid-cols-2 mt-10 gap-5">
        <div className="grid grid-cols-2 shadow-md shadow-slate-400 rounded-3xl">
          <div>
            <img
              className="rounded-l-3xl"
              src="https://i.ibb.co/qyHjKx1/don1.png"
              alt=""
            />
          </div>
          <div className=" text-slate-800 bg-teal-50 w-full rounded-r-3xl p-3">
            <p className="text-2xl font-extrabold ">Paws for a Cause</p>
            <p className="font-bold my-2">
              Join Our Pet Donation Drive! Support will be directed towards
              adoption initiatives.
            </p>
            <div>
              <NavLink to="/dtncamp">
                {" "}
                <button className="rounded-full border border-teal-800 hover:border-2 text-xl text-slate-800 p-2">
                  <FaDonate></FaDonate>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 shadow-md shadow-slate-400 rounded-3xl">
          <div>
            <img
              className="rounded-l-3xl"
              src="https://i.ibb.co/9yH19Tn/don2.png"
              alt=""
            />
          </div>
          <div className=" text-slate-800 bg-teal-50 w-full rounded-r-3xl p-3">
            <p className="text-2xl font-extrabold ">Give a Paw Up</p>
            <p className="font-bold my-2">
              Support will be directed towards adoption pets find loving
              families and permanent homes.
            </p>
            <div>
              <NavLink to="/dtncamp">
                <button className="rounded-full border border-teal-800 hover:border-2 text-xl text-slate-800 p-2">
                  <FaDonate></FaDonate>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 shadow-md shadow-slate-400 rounded-3xl">
          <div>
            <img
              className="rounded-l-3xl"
              src="https://i.ibb.co/tsyDyTk/don3.png"
              alt=""
            />
          </div>
          <div className=" text-slate-800 bg-teal-50 w-full rounded-r-3xl p-3">
            <p className="text-2xl font-extrabold ">Pet Rescue Mission</p>
            <p className="font-bold my-2">
              Your donation will go towards providing essential medical care for
              injured or sick animals.
            </p>
            <div>
              <NavLink to="/dtncamp">
                {" "}
                <button className="rounded-full border border-teal-800 hover:border-2 text-xl text-slate-800 p-2">
                  <FaDonate></FaDonate>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 shadow-md shadow-slate-400 rounded-3xl">
          <div>
            <img
              className="rounded-l-3xl"
              src="https://i.ibb.co/thg9Wqx/campaign1.png"
              alt=""
            />
          </div>
          <div className=" text-slate-800 bg-teal-50 w-full rounded-r-3xl p-3">
            <p className="text-2xl font-extrabold ">Sweet Homes</p>
            <p className="font-bold my-2">
              Funds will be used to supply nutritious food and shelter for pets
              awaiting their forever homes.
            </p>
            <div>
              <NavLink to="/dtncamp">
                {" "}
                <button className="rounded-full border border-teal-800 hover:border-2 text-xl text-slate-800 p-2">
                  <FaDonate></FaDonate>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateSection;
