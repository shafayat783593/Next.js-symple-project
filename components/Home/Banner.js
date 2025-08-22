"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// ✅ Dynamically import carousel to avoid SSR error
const Carousel = dynamic(
    () => import("react-responsive-carousel").then((mod) => mod.Carousel),
    { ssr: false }
);

const slides = [
    {
        id: 1,
        title: "Electronic Devices",
        tagline: "Latest gadgets designed for performance and innovation.",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSndqL4EUuGrAKHtoEP9lGr8E_qbO5NXBpKQw&s",
    },
    {
        id: 2,
        title: "Power Electronic",
        tagline: "Efficient power solutions for modern technology.",
        image:
            "https://images.ctfassets.net/wp1lcwdav1p1/3cAQ87K4KsHjfXGrQdkzBZ/b47523eae1fb2ac5b12bdf6619d71f2f/GettyImages-1307216100.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive",
    },
    {
        id: 3,
        title: "Glass Products and Components",
        tagline: "Durable and premium-quality glass for every application.",
        image:
            "https://www.schott.com/-/media/project/onex/shared/teasers/consumer-electronics/consumer-electronics_01-displays_00_720x450.jpg?rev=fe6df7a508644a7d8e294e6c294a317b",
    },
];

const Banner = () => {
    return (
        <div className="w-11/12 mx-auto rounded-2xl max-h-[600px] mt-5">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={5000}
                transitionTime={900}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="relative">
                        {/* Responsive Image */}
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full rounded-3xl my-5 h-[250px] sm:h-[400px] md:h-[600px] object-cover brightness-[.6]"
                        />

                        {/* Overlay Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
                            <h2 className="text-xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-lg">
                                {slide.title}
                            </h2>
                            <p className="text-sm sm:text-lg md:text-xl mb-3 sm:mb-6 drop-shadow-lg">
                                {slide.tagline}
                            </p>
                            <Link
                                href="/notFound"
                                className="px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg font-semibold text-sm sm:text-lg shadow-md hover:shadow-xl transition-all"
                            >
                                Buy Now
                            </Link>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
