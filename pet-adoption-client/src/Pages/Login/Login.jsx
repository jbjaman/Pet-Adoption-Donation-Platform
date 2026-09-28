import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
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
  const loadUser = useLoaderData([]);
  const [loginError, setLoginError] = useState("");
  const { signIn, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handle = (e) => {
    e.preventDefault();
    const f = e.target;
    setLoginError("");
    signIn(f.email.value, f.password.value)
      .then((result) => {
        const u = result.user;
        const row = loadUser.find((x) => x.email === u.email);
        if (row?.role === "ban") {
          logOut();
          return;
        }
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Welcome back",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch(() => setLoginError("Invalid email or password"));
  };
  return (
    <>
      <Helmet>
        <title>Paw | Login</title>
      </Helmet>
      <div className="paw-container flex min-h-screen items-center justify-center py-28">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 lg:grid-cols-2">
          <div className="relative hidden min-h-[650px] lg:block">
            <img
              src="https://i.ibb.co/jL0Scyy/banner3.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-teal-900/10" />
            <div className="absolute bottom-10 left-10 right-10 text-white">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-200">
                Welcome to Paw
              </p>
              <h2 className="font-['Manrope'] text-4xl font-extrabold">
                Good things start with a paw.
              </h2>
            </div>
          </div>
          <div className="p-7 sm:p-12">
            <span className="paw-eyebrow">Member login</span>
            <h1 className="paw-title">Welcome back.</h1>
            <p className="mt-3 text-slate-500">
              Sign in to continue your adoption journey.
            </p>
            <div className="mt-7">
              <SocialLogin />
            </div>
            <div className="my-6 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              or continue with email
              <span className="h-px flex-1 bg-slate-200" />
            </div>
            <form onSubmit={handle} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Password
                </span>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
                />
              </label>
              {loginError && (
                <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">
                  {loginError}
                </p>
              )}
              <button className="paw-btn w-full">Login</button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-500">
              New here?{" "}
              <Link className="font-bold text-teal-800" to="/signup">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
