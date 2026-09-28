import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
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
  const onSubmit = (data) =>
    createUser(data.email, data.password)
      .then(() =>
        updateUserProfile(data.name, data.photoURL).then(() =>
          axiosPublic.post("/users", {
            name: data.name,
            email: data.email,
            image: data.photoURL,
          }),
        ),
      )
      .then((res) => {
        if (res?.data?.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Account created",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate("/");
        }
      })
      .catch(console.log);
  return (
    <>
      <Helmet>
        <title>Paw | Register</title>
      </Helmet>
      <div className="paw-container flex min-h-screen items-center justify-center py-28">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 lg:grid-cols-[.9fr_1.1fr]">
          <div className="order-2 p-7 sm:p-12 lg:order-1">
            <span className="paw-eyebrow">Join the community</span>
            <h1 className="paw-title">Create your Paw account.</h1>
            <p className="mt-3 text-slate-500">
              Save your favorites, send adoption requests and stay connected.
            </p>
            <div className="mt-6">
              <SocialLogin />
            </div>
            <div className="my-6 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              or use email
              <span className="h-px flex-1 bg-slate-200" />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4 sm:grid-cols-2"
            >
              <Field label="Full name" error={errors.name}>
                <input
                  {...register("name", { required: true })}
                  placeholder="Your name"
                />
              </Field>
              <Field label="Photo URL" error={errors.photoURL}>
                <input
                  {...register("photoURL", { required: true })}
                  placeholder="https://..."
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="Password" error={errors.password}>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 16,
                    pattern:
                      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$@!%&*?])/,
                  })}
                  placeholder="8–16 characters"
                />
              </Field>
              <button className="paw-btn mt-2 sm:col-span-2">
                Create account
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link className="font-bold text-teal-800" to="/login">
                Log in
              </Link>
            </p>
          </div>
          <div className="relative order-1 min-h-[300px] lg:order-2 lg:min-h-[650px]">
            <img
              src="https://i.ibb.co/HVKz0Wx/banner1.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 to-transparent" />
            <div className="absolute bottom-10 left-8 right-8 text-white sm:left-10">
              <p className="text-sm font-bold uppercase tracking-widest text-teal-200">
                Together we can
              </p>
              <h2 className="mt-2 font-['Manrope'] text-3xl font-extrabold sm:text-4xl">
                Help more pets find home.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const Field = ({ label, error, children }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>
    {
      <div className="[&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-slate-200 [&_input]:bg-slate-50 [&_input]:px-4 [&_input]:py-3 [&_input]:outline-none [&_input]:focus:border-teal-600 [&_input]:focus:bg-white">
        {children}
      </div>
    }
    {error && (
      <span className="mt-1 block text-xs font-semibold text-red-500">
        This field is required
      </span>
    )}
  </label>
);
export default SignUp;
