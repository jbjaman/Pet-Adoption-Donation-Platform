import { NavLink } from "react-router-dom";


const CallAction = () => {
    return (
        <div className="mx-8 grid grid-cols-5 mb-10">
            <div className="col-span-3 grid grid-rows-2 grid-flow-col gap-5">
                <div className=" row-span-2 ">
                    <img className="rounded-3xl" src="https://i.ibb.co/LR7YKNr/petad1.png" alt="1" />
                </div>
                <div className="row-span-1">
                    <img className="rounded-3xl" src="https://i.ibb.co/fX5yJk7/petad2.png" alt="2" />
                </div>
                <div className="row-span-1">
                    <img className="rounded-3xl" src="https://i.ibb.co/yscLhXm/petad3.png" alt="3" />
                </div>
            </div>
            <div className="col-span-2 ml-3 pt-5 px-10 grid">
                <hr className="w-1/3 border-2 border-teal-900" />
                <p className="text-6xl pt-5 text-teal-950 font-extrabold">Planning to Adopt a Pet ?</p>
                <p className="text-2xl py-5 font-semibold text-slate-800">Dogs make for the best friends, and it&apos;s only right that we celebrate them for all the joy and love they&apos;ve given us. Whether labled on dog bandana.</p>
                <p className="text-2xl font-bold hover:font-extrabold text-teal-800"><NavLink to="/petlist">How it Works &gt; </NavLink></p>
            </div>
        </div>
    );
};

export default CallAction;