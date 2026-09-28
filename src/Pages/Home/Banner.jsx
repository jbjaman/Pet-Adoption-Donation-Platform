import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { NavLink } from 'react-router-dom';

const Banner = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className='relative'>
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
                className="mySwiper rounded-3xl"
            >
                <SwiperSlide>
                    <img src="https://i.ibb.co/R024GS4/banner4.png" alt="" />
                    <div className='absolute top-1/4 p-10 left-20'  >
                        <h3 className='text-8xl text-slate-100 font-extrabold'>Start Your <br />Adoption<br /> Journey Now</h3>
                        {
                            user ?
                                <NavLink to="/petlist"> <button className='mt-6 p-3 rounded-2xl font-bold text-3xl border-slate-100 hover:border-teal-800 hover:text-teal-800 text-slate-100 border-2 '>More</button> </NavLink>
                                :
                                <NavLink to="/signup"> <button className='mt-6 p-3 rounded-2xl font-bold text-3xl border-slate-100 hover:border-teal-800 hover:text-teal-800 text-slate-100 border-2 '>Sign Up</button> </NavLink>
                        }

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/HVKz0Wx/banner1.png" alt="" />
                    <div className='absolute top-1/4 p-10 right-20'  >
                        <h3 className='text-8xl text-slate-100 font-extrabold text-right'>Find the <br />Right<br />Pet for You</h3>
                        <p className='mt-6 text-3xl ml-20 text-slate-100 text-right'>Take our interactive new quiz to find<br /> the perfect pet to adopt</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/jL0Scyy/banner3.png" alt="" />
                    <div className='absolute top-1/4 p-10 right-20 '  >
                        <h3 className='text-8xl text-slate-100 font-extrabold text-right'>Every Pet <br />Deserves<br /> a Home</h3>
                        <p className='mt-6 text-3xl ml-20 text-slate-100 text-right'>Adopt a Pet Today</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/6XkyJCj/banner2.png" alt="" />
                    <div className='absolute bottom-1/4 px-10 pt-16 left-20'  >
                        <h3 className='text-8xl text-slate-100 font-extrabold'>Make a <br />Donation <br />for Pet<br /> Happiness</h3>
                    </div>
                </SwiperSlide>

            </Swiper>
            <div className='relative z-10 bottom-14 mx-28 '>
                <div className='grid grid-cols-5 items-center justify-center bg-slate-100 rounded-3xl py-8 shadow-lg shadow-slate-500'>
                    <button className=' text-2xl text-slate-900 font-semibold hover:text-teal-800'>Find a Cat</button>
                    <button className='border-l-2 text-2xl text-slate-900 font-semibold border-teal-900 hover:text-teal-800'>Find a Rabbit</button>
                    <div className=' flex justify-center '>
                        <img className="w-12 animate-pulse " src="https://i.ibb.co/bdCZb5J/petlogo.png" alt="" />
                    </div>
                    <button className='border-r-2 text-2xl text-slate-900 font-semibold border-teal-900 hover:text-teal-800'>Find a Dog</button>
                    <button className=' text-2xl text-slate-900 font-semibold hover:text-teal-800'>Find Others</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;




