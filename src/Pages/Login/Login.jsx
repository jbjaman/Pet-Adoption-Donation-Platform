import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaLock, FaPaw } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {
  const loadUser = useLoaderData();

  const [loginError, setLoginError] = useState("");

  const { signIn, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");

        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "You are Banned",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((error) => console.log(error));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoginError("");

    signIn(email, password)
      .then((result) => {
        const loggedInUser = result.user;

        const logUser = loadUser.filter(
          (myemail) => myemail.email === loggedInUser.email,
        );

        if (logUser[0]?.role === "ban") {
          handleLogOut();
          return;
        }

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Welcome Back",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from, {
          replace: true,
        });
      })
      .catch((error) => {
        console.error(error.message);
        setLoginError("Doesn't Match");
      });
  };

  return (
    <>
      <Helmet>
        <title>Paw | Login</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 pt-[76px]">
        <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl lg:grid-cols-2">
          {/* Left side */}
          <div className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-14">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50">
                  <FaPaw className="text-xl text-teal-700" />
                </div>

                <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
                  Welcome back
                </p>

                <h1 className="mt-2 text-3xl font-extrabold text-slate-800 sm:text-4xl">
                  Login to Paw
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Sign in to manage your pets, donations, courses and adoption
                  activities.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email
                  </label>

                  <div className="relative">
                    <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-teal-700" />

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-teal-700" />

                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-50"
                      required
                    />
                  </div>
                </div>

                {loginError && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    Invalid user or wrong password.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-teal-700 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md"
                >
                  Login
                </button>
              </form>

              <div className="my-7 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Or continue with
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <SocialLogin />

              <p className="mt-7 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-teal-700 hover:underline"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="relative hidden overflow-hidden lg:block">
            <img
              src="https://i.ibb.co/jL0Scyy/banner3.png"
              alt="Happy pet"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

            <div className="absolute bottom-12 left-10 right-10 text-white">
              <span className="rounded-full bg-teal-700/90 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                Every Pet Deserves a Home
              </span>

              <h2 className="mt-5 text-4xl font-extrabold leading-tight">
                Welcome to a community
                <br />
                that cares for pets.
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-6 text-slate-200">
                Connect with pets, people and resources that make responsible
                pet care easier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
