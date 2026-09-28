import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import UseAuthor from "../../Hooks/UseAuthor";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn } = UseAuthor();
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };

  return (
    <div className=" lg:flex gap-3 justify-between">
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 text-xl font-bold text-slate-400 hover:border-2 rounded-full border p-1"
      >
        <FcGoogle></FcGoogle>Sign In
      </button>
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center font-bold  justify-center text-slate-400 gap-2 text-xl hover:border-2 rounded-full border p-1"
      >
        <FaFacebook></FaFacebook>Sign In
      </button>
    </div>
  );
};

export default SocialLogin;
