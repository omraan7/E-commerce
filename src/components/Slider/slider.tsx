"use client"

import { useState } from "react"
import { Navigation, Pagination, A11y, Autoplay, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'

import Image from 'next/image'

export default function AppSlider({
    imageslist,
    spaceBetween = 100,
    slidesPerView = 1,
    detials = false,
    navigation = true
}: {
    imageslist: string[],
    spaceBetween?: number,
    slidesPerView?: number,
    detials?: boolean,
    navigation?: boolean
}) {

    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

    // ✅ لو detials = true → الشكل الجديد
    if (detials) {
        return (
            <>
                {/* 🔵 السلايدر الكبير */}
                <Swiper
                    modules={[Navigation, Thumbs]}
                    navigation={navigation}
                    thumbs={{ swiper: thumbsSwiper }}
                    className="mb-4"
                >
                    {imageslist.map((e, i) => (
                        <SwiperSlide key={i}>
                            <div className="relative h-[400px] w-full">
                                <Image fill src={e} alt="" className="object-cover" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* 🟡 thumbnails */}
                <Swiper
                    modules={[Thumbs]}
                    onSwiper={setThumbsSwiper}
                    slidesPerView={4}
                    spaceBetween={10}
                    watchSlidesProgress
                >
                    {imageslist.map((e, i) => (
                        <SwiperSlide key={i}>
                            <div className="relative h-[100px] w-full cursor-pointer">
                                <Image fill src={e} alt="" className="object-cover rounded-md" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        )
    }

    // ✅ الشكل القديم (pagination)
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            navigation={navigation}
            loop={true}
            pagination={{ clickable: true }}
        >
            {imageslist.map((e, i) => (
                <SwiperSlide key={i}>
                    <div className="relative h-75">
                        <Image fill src={e} alt="" />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}