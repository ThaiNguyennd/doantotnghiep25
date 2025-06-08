import React from 'react';
import banner1 from '../public/assets/4114.png';
import banner2 from '../public/assets/4141.png';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const Banner: React.FC = () => {
    return (
        <div className=" w-screen h-[80vh]  shadow  hover:shadow-lg transition">
            <Swiper
                spaceBetween={10}
                slidesPerView={1} // hiển thị 1 slide mỗi lần
                loop={true} // lặp vô hạn
                autoplay={{ delay: 3000 }} // tự động chuyển sau 3 giây (cần import thêm)
                pagination={{ clickable: true }}>
                <SwiperSlide>
                    <img
                        className="w-full h-full object-cover"
                        src={banner1}
                        alt="Banner 1"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="w-full h-full object-cover"
                        src={banner2}
                        alt="Banner 2"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
