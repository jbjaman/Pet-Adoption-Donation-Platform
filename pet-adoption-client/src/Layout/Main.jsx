import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";

const Main = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="page-enter">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Main;
