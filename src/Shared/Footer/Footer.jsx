import { FaFacebook, FaGithub, FaLinkedinIn, FaPaw } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div className="lg:col-span-1">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl brightness-200">
              <img
                src="https://i.ibb.co/bdCZb5J/petlogo.png"
                alt="Paw logo"
                className="h-8 w-8 object-contain"
              />
            </div>

            <div>
              <p className="text-xl font-extrabold text-white">Paw</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-teal-400">
                Pet Care & Adoption
              </p>
            </div>
          </NavLink>

          <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">
            Helping pets find loving homes while making pet care, education and
            community support easier.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Explore
          </h3>

          <div className="space-y-3 text-sm">
            <NavLink to="/" className="block transition hover:text-teal-400">
              Home
            </NavLink>

            <NavLink
              to="/petlist"
              className="block transition hover:text-teal-400"
            >
              Pet Listing
            </NavLink>

            <NavLink
              to="/dtncamp"
              className="block transition hover:text-teal-400"
            >
              Donation
            </NavLink>

            <NavLink
              to="/education"
              className="block transition hover:text-teal-400"
            >
              Education
            </NavLink>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Support
          </h3>

          <div className="space-y-3 text-sm text-slate-400">
            <p className="transition hover:text-teal-400">About Us</p>

            <p className="transition hover:text-teal-400">FAQs</p>

            <p className="transition hover:text-teal-400">Partnerships</p>

            <p className="transition hover:text-teal-400">Privacy Policy</p>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Stay Connected
          </h3>

          <p className="mb-4 text-sm leading-6 text-slate-400">
            Get updates about pets, adoption and community activities.
          </p>

          <div className="flex">
            <input
              type="text"
              placeholder="Your email"
              className="min-w-0 flex-1 rounded-l-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-teal-600"
            />

            <button className="rounded-r-xl bg-teal-700 px-4 text-sm font-bold text-white transition hover:bg-teal-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:px-6 md:flex-row lg:px-8">
          <p className="text-xs text-slate-500">
            © 2024-26 Paw. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-slate-400 transition hover:bg-teal-700 hover:text-white"
            >
              <FaFacebook />
            </a>

            <a
              href="#"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-slate-400 transition hover:bg-teal-700 hover:text-white"
            >
              <FaGithub />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-slate-400 transition hover:bg-teal-700 hover:text-white"
            >
              <FaLinkedinIn />
            </a>

            <FaPaw className="ml-2 text-teal-600" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
