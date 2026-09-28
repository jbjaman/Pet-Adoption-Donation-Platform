
import { FaPaw } from "react-icons/fa";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";


const SiteError = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="min-h-screen pt-56 text-teal-800">
                <p className="flex justify-center items-center text-5xl font-bold">4<FaPaw></FaPaw>4 Page Not Found</p>
            </div>
            <Footer></Footer>
        </>
    );
};

export default SiteError;