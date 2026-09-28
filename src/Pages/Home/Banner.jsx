import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AuthContext } from "../../Providers/AuthProvider";

const Banner = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="bg-slate-50 pt-[76px]">
      <div className="relative overflow-hidden">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative h-[520px] sm:h-[600px] lg:h-[680px]">
              <img
                src="https://i.ibb.co/R024GS4/banner4.png"
                alt="Pet adoption"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/35 to-transparent" />

              <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-10">
                <div className="max-w-2xl text-white">
                  <span className="inline-flex rounded-full bg-teal-700/90 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                    Find your new best friend
                  </span>

                  <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
                    Start Your
                    <br />
                    Adoption
                    <br />
                    Journey
                  </h1>

                  <p className="mt-5 max-w-lg text-base leading-7 text-slate-200 sm:text-lg">
                    Give a loving pet the home they deserve and discover a
                    friendship that lasts a lifetime.
                  </p>

                  {user ? (
                    <NavLink to="/petlist">
                      <button className="mt-7 rounded-xl bg-teal-700 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-teal-800">
                        Explore Pets
                      </button>
                    </NavLink>
                  ) : (
                    <NavLink to="/signup">
                      <button className="mt-7 rounded-xl bg-teal-700 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-teal-800">
                        Get Started
                      </button>
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative h-[520px] sm:h-[600px] lg:h-[680px]">
              <img
                src="https://i.ibb.co/HVKz0Wx/banner1.png"
                alt="Find the right pet"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-l from-slate-950/70 via-slate-900/25 to-transparent" />

              <div className="relative mx-auto flex h-full max-w-7xl items-center justify-end px-5 sm:px-8 lg:px-10">
                <div className="max-w-xl text-right text-white">
                  <span className="inline-flex rounded-full bg-teal-700/90 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                    Find the perfect companion
                  </span>

                  <h2 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
                    Find the
                    <br />
                    Right Pet
                    <br />
                    for You
                  </h2>

                  <p className="mt-5 text-base leading-7 text-slate-200 sm:text-lg">
                    Explore different pets and discover a companion that fits
                    your lifestyle.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative h-[520px] sm:h-[600px] lg:h-[680px]">
              <img
                src="https://i.ibb.co/jL0Scyy/banner3.png"
                alt="Every pet deserves a home"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-l from-slate-950/70 via-slate-900/20 to-transparent" />

              <div className="relative mx-auto flex h-full max-w-7xl items-center justify-end px-5 sm:px-8 lg:px-10">
                <div className="max-w-xl text-right text-white">
                  <span className="inline-flex rounded-full bg-teal-700/90 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                    Give love a home
                  </span>

                  <h2 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
                    Every Pet
                    <br />
                    Deserves
                    <br />a Home
                  </h2>

                  <p className="mt-5 text-base font-semibold text-slate-200 sm:text-lg">
                    Adopt a Pet Today
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 4 */}
          <SwiperSlide>
            <div className="relative h-[520px] sm:h-[600px] lg:h-[680px]">
              <img
                src="https://i.ibb.co/6XkyJCj/banner2.png"
                alt="Pet donation"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/30 to-transparent" />

              <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-10">
                <div className="max-w-xl text-white">
                  <span className="inline-flex rounded-full bg-teal-700/90 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                    Help a pet today
                  </span>

                  <h2 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
                    Make a
                    <br />
                    Donation
                    <br />
                    for Pet
                    <br />
                    Happiness
                  </h2>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Quick Categories */}
        <div className="relative z-10 mx-4 -mt-10 sm:mx-8 lg:mx-auto lg:-mt-16 lg:max-w-6xl">
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-xl sm:grid-cols-5">
            <button className="px-3 py-5 text-sm font-bold text-slate-700 transition hover:bg-teal-50 hover:text-teal-700 sm:text-base">
              Find a Cat
            </button>

            <button className="border-t border-slate-100 px-3 py-5 text-sm font-bold text-slate-700 transition hover:bg-teal-50 hover:text-teal-700 sm:border-l sm:border-t-0 sm:text-base">
              Find a Rabbit
            </button>

            <div className="order-first col-span-2 flex items-center justify-center bg-teal-50 py-4 sm:order-none sm:col-span-1 sm:bg-white">
              <img
                className="h-12 w-12 animate-pulse object-contain"
                src="https://i.ibb.co/bdCZb5J/petlogo.png"
                alt="Paw logo"
              />
            </div>

            <button className="border-t border-slate-100 px-3 py-5 text-sm font-bold text-slate-700 transition hover:bg-teal-50 hover:text-teal-700 sm:border-l sm:border-t-0 sm:text-base">
              Find a Dog
            </button>

            <button className="border-l border-slate-100 px-3 py-5 text-sm font-bold text-slate-700 transition hover:bg-teal-50 hover:text-teal-700 sm:text-base">
              Find Others
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
