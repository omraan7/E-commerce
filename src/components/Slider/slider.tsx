"use client"

import { useState, useRef, useEffect } from "react"
import { Navigation, Pagination, A11y, Autoplay, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'

import Image from 'next/image'
import Link from "next/link"

export type SlideContent = {
    image: string
    title: string
    subtitle: string
    primaryBtn?: { label: string; href?: string }
    secondaryBtn?: { label: string; href?: string }
}

function SliderOverlay({
    slide,
    animKey,
    visible,
}: {
    slide: SlideContent
    animKey: number
    visible: boolean
}) {
    const getStyle = (delay: number): React.CSSProperties => ({
        transform: visible ? "translateY(0)" : "translateY(40px)",
        opacity: visible ? 1 : 0,
        transition: `transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, opacity 0.55s ease ${delay}s`,
        willChange: "transform, opacity",
    })

    return (
        <div
            key={animKey}
            className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-14 pointer-events-none"
            style={{ background: "rgba(0,0,0,0.5)" }}
        >
            <h2
                style={{
                    color: "#fff",
                    fontSize: "clamp(22px, 4vw, 40px)",
                    fontWeight: "800",
                    lineHeight: "1.25",
                    marginBottom: "12px",
                    maxWidth: "500px",
                    ...getStyle(0),
                }}
                dangerouslySetInnerHTML={{ __html: slide.title }}
            />

            <p
                style={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "16px",
                    marginBottom: "28px",
                    maxWidth: "400px",
                    ...getStyle(0.12),
                }}
            >
                {slide.subtitle}
            </p>

            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    flexWrap: "wrap",
                    pointerEvents: "auto",
                    ...getStyle(0.22),
                }}
            >
                {slide.primaryBtn && (
                    <Link
                        href={slide.primaryBtn.href ?? "#"}
                        style={{
                            background: "#fff",
                            color: "#1a7a35",
                            borderRadius: "8px",
                            padding: "12px 28px",
                            fontSize: "15px",
                            fontWeight: "700",
                            textDecoration: "none",
                            display: "inline-block",
                            transition: "transform 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                        {slide.primaryBtn.label}
                    </Link>
                )}
                {slide.secondaryBtn && (
                    <Link
                        href={slide.secondaryBtn.href ?? "#"}
                        style={{
                            background: "transparent",
                            color: "#fff",
                            border: "2px solid #fff",
                            borderRadius: "8px",
                            padding: "12px 28px",
                            fontSize: "15px",
                            fontWeight: "700",
                            textDecoration: "none",
                            display: "inline-block",
                            transition: "transform 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                        {slide.secondaryBtn.label}
                    </Link>
                )}
            </div>
        </div>
    )
}

export default function AppSlider({
    slides,
    imageslist,
    spaceBetween = 100,
    slidesPerView = 1,
    detials = false,
    navigation = true,
}: {
    slides?: SlideContent[]
    imageslist?: string[]
    spaceBetween?: number
    slidesPerView?: number
    detials?: boolean
    navigation?: boolean
}) {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [animKey, setAnimKey] = useState(0)
    const [visible, setVisible] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.3 }
        )
        if (wrapperRef.current) observer.observe(wrapperRef.current)
        return () => observer.disconnect()
    }, [])

    const handleSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex)
        setVisible(false)
        setTimeout(() => setVisible(true), 30)
        setAnimKey((k) => k + 1)
    }

    // ── detials mode ──────────────────────────────────────────────────────────
    if (detials) {
        const imgs = imageslist ?? slides?.map((s) => s.image) ?? []
        return (
            <>
                <Swiper
                    modules={[Navigation, Thumbs]}
                    navigation={navigation}
                    thumbs={{ swiper: thumbsSwiper }}
                    className="mb-4"
                >
                    {imgs.map((e, i) => (
                        <SwiperSlide key={i}>
                            <div className="relative h-100  w-full">
                                <Image fill src={e} alt="" className="object-cover" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    modules={[Thumbs]}
                    onSwiper={setThumbsSwiper}
                    slidesPerView={4}
                    spaceBetween={10}
                    watchSlidesProgress
                >
                    {imgs.map((e, i) => (
                        <SwiperSlide key={i}>
                            <div className="relative h-25 w-full cursor-pointer">
                                <Image fill src={e} alt="" className="object-cover rounded-md" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        )
    }

    // ── hero slider mode ──────────────────────────────────────────────────────
     const resolvedSlides: SlideContent[] = slides ?? (imageslist ?? []).map((img) => ({
        image: img,
        title: "Fresh Products Delivered<br/>to your Door",
        subtitle: "Get 20% off your first order",
        primaryBtn: { label: "Shop Now" },
        secondaryBtn: { label: "View Deals" },
    }))

    return (
        <div ref={wrapperRef} className="relative pb-2">
            <Swiper
            
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                navigation={navigation}
                loop={true}
                pagination={{ clickable: true }}
                onSlideChange={handleSlideChange}
                onSwiper={() => setTimeout(() => setVisible(true), 100)}
            >
                {resolvedSlides.map((slide, i) => (
                    <SwiperSlide key={i} >
                        <div className="relative h-100 w-full ">
                            <Image fill src={slide.image} alt={slide.title} className="object-cover " />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <SliderOverlay  
                slide={resolvedSlides[activeIndex] ?? resolvedSlides[0]}
                animKey={animKey}
                visible={visible}
            />
        </div>
    )
}