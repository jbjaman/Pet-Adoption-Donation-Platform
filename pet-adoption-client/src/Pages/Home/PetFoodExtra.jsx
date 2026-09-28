// const PetFoodExtra = () => {
//     return (
//         <div className="mx-8 grid grid-cols-6 mb-10">
//             <div className="col-span-3 grid grid-cols-3 gap-5 pt-8">
//                 <div className="">
//                     <img className="rounded-3xl" src="https://i.ibb.co/61ft2RS/food1.png" alt="1" />
//                 </div>
//                 <div className="">
//                     <img className="rounded-3xl" src="https://i.ibb.co/zrP0BBb/food2.png" alt="2" />
//                 </div>
//                 <div className="">
//                     <img className="rounded-3xl" src="https://i.ibb.co/n82MCtG/food3.png" alt="3" />
//                 </div>
//                 <div className="">
//                     <img className="rounded-3xl" src="https://i.ibb.co/HHMspBS/food4.png" alt="4" />
//                 </div>
//                 <div className="">
//                     <img className="rounded-3xl" src="https://i.ibb.co/VY3nfN6/food5.png" alt="5" />
//                 </div>
//                 <div className="">
//                     <img className="rounded-3xl" src="https://i.ibb.co/25hDf4v/food6.png" alt="6" />
//                 </div>
//             </div>
//             <div className="col-span-3 ml-3 pt-5 px-8">
//                 <p className="text-4xl text-slate-800 font-bold py-5">Pets Food</p>
//                 <hr className="w-1/4 border-2 border-teal-900" />
//                 <p className="text-6xl text-teal-950 font-extrabold py-5">Save an Extra 10% on Every Product Order</p>
//                 <p className="text-2xl font-bold hover:font-extrabold text-teal-800">Buy Now &gt; </p>
//             </div>
//         </div>
//     );
// };

// export default PetFoodExtra;

//--------------------------------------------->

const PetFoodExtra = () => {
  return (
    <div className="mx-8 grid grid-cols-6 mb-10">
      <div className="col-span-3 grid grid-cols-3 gap-5 pt-8">
        <div className="">
          <img
            className="rounded-3xl"
            src="https://i.ibb.co/61ft2RS/food1.png"
            alt="1"
          />
        </div>
        <div className="">
          <img
            className="rounded-3xl"
            src="https://i.ibb.co/zrP0BBb/food2.png"
            alt="2"
          />
        </div>
        <div className="">
          <img
            className="rounded-3xl"
            src="https://i.ibb.co/n82MCtG/food3.png"
            alt="3"
          />
        </div>
        <div className="">
          <img
            className="rounded-3xl"
            src="https://i.ibb.co/HHMspBS/food4.png"
            alt="4"
          />
        </div>
        <div className="">
          <img
            className="rounded-3xl"
            src="https://i.ibb.co/VY3nfN6/food5.png"
            alt="5"
          />
        </div>
        <div className="">
          <img
            className="rounded-3xl"
            src="https://i.ibb.co/25hDf4v/food6.png"
            alt="6"
          />
        </div>
      </div>
      <div className="col-span-3 ml-3 pt-5 px-8">
        <p className="text-4xl text-slate-800 font-bold py-5">Pets Food</p>
        <hr className="w-1/4 border-2 border-teal-900" />
        <p className="text-6xl text-teal-950 font-extrabold py-5">
          Save an Extra 10% on Every Product Order
        </p>
        <p className="text-2xl font-bold hover:font-extrabold text-teal-800">
          Buy Now &gt;{" "}
        </p>
      </div>
    </div>
  );
};

export default PetFoodExtra;
