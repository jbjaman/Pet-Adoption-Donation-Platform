const PetFoodExtra = () => {
  const foodImages = [
    "https://i.ibb.co/61ft2RS/food1.png",
    "https://i.ibb.co/zrP0BBb/food2.png",
    "https://i.ibb.co/n82MCtG/food3.png",
    "https://i.ibb.co/HHMspBS/food4.png",
    "https://i.ibb.co/VY3nfN6/food5.png",
    "https://i.ibb.co/25hDf4v/food6.png",
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {foodImages.map((image, index) => (
            <div
              key={image}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <img
                className="aspect-square h-full w-full object-cover transition duration-500 hover:scale-105"
                src={image}
                alt={`Pet food ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
            Pet Essentials
          </p>

          <h2 className="mt-3 text-4xl font-extrabold leading-tight text-teal-950 sm:text-5xl">
            Save an Extra 10%
            <br />
            on Every Product Order
          </h2>

          <div className="mt-5 h-1 w-20 rounded-full bg-teal-700" />

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            Give your pets the care they deserve with quality food and everyday
            essentials designed to keep them happy and healthy.
          </p>

          <button className="mt-7 inline-flex items-center rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800">
            Buy Now
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PetFoodExtra;
