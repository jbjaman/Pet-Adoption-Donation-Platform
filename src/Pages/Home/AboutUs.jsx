

const AboutUs = () => {
    return (

        <div className="grid place-items-center  ml-3 py-5 px-10">
            <p className="text-6xl text-center text-teal-950 font-extrabold py-5">Our Goals</p>
            <hr className="w-1/6 border-2 border-teal-900" />
            <div className="grid grid-cols-3 pt-5">
                <p className="col-span-2 text-xl text-slate-800 font-semibold ">Our mission is simple yet profound - to provide a helping hand to our furry friends who cannot speak for themselves. We are committed to ensuring that every pet receives the care, love, and attention they deserve. By fostering a sense of community and shared responsibility. Paw is more than just an organization. Through collaborative efforts and community engagement, we aim to build a network of support that extends beyond our immediate team. Together, we can create a ripple effect of compassion that reaches far and wide.
                </p>
                <img className="p-2 rounded-3xl" src="https://i.ibb.co/M1KxRwH/goals.png" alt="" />
            </div>
            <p className="text-xl text-slate-800 font-semibold pb-5">At the heart of our organization is a deep passion for animals. We understand that pets are not just pets; they are beloved members of families, loyal companions, and a source of joy. This understanding fuels our determination to create a better future for animals who may have faced hardship or abandonment.</p>
        </div>

    );
};

export default AboutUs;