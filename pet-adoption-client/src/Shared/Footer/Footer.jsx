import { FaFacebook, FaGithub, FaLinkedinIn, FaPaw } from "react-icons/fa";
import { FiArrowUpRight, FiHeart, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="mt-20 bg-slate-950 text-white">
      <div className="page-container py-14 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10">
                <img
                  src="https://i.ibb.co/bdCZb5J/petlogo.png"
                  alt="Paw logo"
                  className="h-9 w-9 object-contain"
                />
              </div>

              <div>
                <p className="text-xl font-extrabold">
                  Paw<span className="text-teal-400">Care</span>
                </p>
                <p className="text-xs text-slate-500">
                  Find a friend. Give a home.
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Helping loving families connect with pets who are looking for a
              safe, caring and permanent home.
            </p>

            <div className="mt-6 flex gap-2">
              {[FaFacebook, FaGithub, FaLinkedinIn].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 text-slate-400 transition hover:border-teal-500 hover:bg-teal-500 hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Explore
            </h3>

            <div className="mt-5 space-y-3 text-sm text-slate-400">
              <a
                href="/"
                className="flex items-center gap-2 transition hover:text-teal-400"
              >
                Home
                <FiArrowUpRight />
              </a>

              <a
                href="/petlist"
                className="flex items-center gap-2 transition hover:text-teal-400"
              >
                Find a Pet
                <FiArrowUpRight />
              </a>

              <a
                href="/dtncamp"
                className="flex items-center gap-2 transition hover:text-teal-400"
              >
                Donation
                <FiArrowUpRight />
              </a>

              <a
                href="/education"
                className="flex items-center gap-2 transition hover:text-teal-400"
              >
                Education
                <FiArrowUpRight />
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Support
            </h3>

            <div className="mt-5 space-y-3 text-sm text-slate-400">
              <p className="transition hover:text-white">About Us</p>

              <p className="transition hover:text-white">FAQs</p>

              <p className="transition hover:text-white">Privacy Policy</p>

              <p className="transition hover:text-white">Terms & Conditions</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Stay connected
            </h3>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              Get adoption tips, pet care guides and new pet updates.
            </p>

            <div className="mt-5 flex overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
              <div className="flex items-center pl-3 text-slate-500">
                <FiMail />
              </div>

              <input
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-600"
              />

              <button className="bg-teal-600 px-4 text-sm font-bold text-white transition hover:bg-teal-500">
                Join
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
              <FiHeart className="text-teal-500" />
              Every adoption changes a life.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-900">
        <div className="page-container flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-500 sm:flex-row">
          <p>© 2023-26 PawCare. All rights reserved.</p>

          <div className="flex items-center gap-2">
            <FaPaw className="text-teal-500" />
            Made for pets & people
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
