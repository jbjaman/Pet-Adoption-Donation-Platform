import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaImage, FaLock, FaPaw, FaRegUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";

const SignUp = () => {
  const axiosPublic = UseAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;

      console.log(loggedUser);

      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            image: data.photoURL,
          };

          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              reset();

              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully",
                timer: 1500,
                showConfirmButton: false,
              });

              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <Helmet>
        <title>Paw | Register</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 pt-[76px]">
        <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl lg:grid-cols-2">
          {/* Left Image */}
          <div className="relative hidden overflow-hidden lg:block">
            <img
              src="https://i.ibb.co/HVKz0Wx/banner1.png"
              alt="Pets"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />

            <div className="absolute bottom-12 left-10 right-10 text-white">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-700/90 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                <FaPaw />
                Join Paw Community
              </div>

              <h2 className="text-4xl font-extrabold leading-tight xl:text-5xl">
                Give pets a better
                <br />
                chance at life.
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-6 text-slate-200">
                Create your account and become part of a community that cares
                about pets, adoption and responsible pet ownership.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14">
            <div className="w-full max-w-lg">
              <div className="mb-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50">
                  <FaPaw className="text-xl text-teal-700" />
                </div>

                <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
                  Create your account
                </p>

                <h1 className="mt-2 text-3xl font-extrabold text-slate-800 sm:text-4xl">
                  Register with Paw
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Create an account to manage your pets, donations, courses and
                  adoption activities.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>

                  <div className="relative">
                    <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-700" />

                    <input
                      type="text"
                      {...register("name", {
                        required: true,
                      })}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-50"
                    />
                  </div>

                  {errors.name && (
                    <p className="mt-1 text-xs font-semibold text-red-500">
                      Name is required
                    </p>
                  )}
                </div>

                {/* Photo */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Profile Photo URL
                  </label>

                  <div className="relative">
                    <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-700" />

                    <input
                      type="text"
                      {...register("photoURL", {
                        required: true,
                      })}
                      placeholder="Enter your photo URL"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-50"
                    />
                  </div>

                  {errors.photoURL && (
                    <p className="mt-1 text-xs font-semibold text-red-500">
                      Photo URL is required
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email
                  </label>

                  <div className="relative">
                    <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-teal-700" />

                    <input
                      type="email"
                      {...register("email", {
                        required: true,
                      })}
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-50"
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-1 text-xs font-semibold text-red-500">
                      Email is required
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-700" />

                    <input
                      type="password"
                      {...register("password", {
                        required: true,
                        minLength: 8,
                        maxLength: 16,
                        pattern:
                          /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$@!%&*?])/,
                      })}
                      placeholder="Create a password"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-50"
                    />
                  </div>

                  {errors.password?.type === "minLength" && (
                    <p className="mt-1 text-xs font-semibold text-red-500">
                      Minimum 8 characters required
                    </p>
                  )}

                  {errors.password?.type === "maxLength" && (
                    <p className="mt-1 text-xs font-semibold text-red-500">
                      Maximum 16 characters allowed
                    </p>
                  )}

                  {errors.password?.type === "pattern" && (
                    <p className="mt-1 text-xs font-semibold text-red-500">
                      Use uppercase, lowercase, number and special character
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-teal-700 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md"
                >
                  Create Account
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
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-teal-700 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
