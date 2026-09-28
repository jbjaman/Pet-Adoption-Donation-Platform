import { FaPaw } from "react-icons/fa";


const DBError = () => {
    return (
        <>
            <div className="mt-28  text-teal-800">
                <p className="flex gap-3 justify-center items-center text-5xl font-bold"><FaPaw></FaPaw>Data Failed to Load</p>
            </div>

        </>
    );
};

export default DBError;