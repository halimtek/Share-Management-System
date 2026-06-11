import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const Aboutus = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Who We Are",
      text: "Shareholder Management System is a software company providing modern solutions for managing shareholders efficiently and securely.",
    },
    {
      title: "Our Vision",
      text: "To become a leading platform in shareholder management by delivering reliable, scalable, and user-friendly tools.",
    },
    {
      title: "Our Mission",
      text: "To empower businesses with secure and simple shareholder management tools that improve decision-making and transparency.",
    },
  ];

  const next = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <div id="aboutus" className="bg-gray-50">

      <Head>
        <title>About Us</title>
      </Head>

      {/* HERO SECTION */}
      <section className="text-center pt-28 pb-10 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          About Our Platform
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          We build modern shareholder management tools designed for
          simplicity, speed, and scalability.
        </p>
      </section>

      {/* MAIN SLIDER SECTION */}
      <section className="max-w-5xl mx-auto px-6 pb-24">

        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-10 text-center relative">

          {/* TITLE */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {slides[currentSlide].title}
          </h2>

          {/* TEXT */}
          <p className="text-gray-600 mt-4 leading-relaxed">
            {slides[currentSlide].text}
          </p>

          {/* CONTROLS */}
          <div className="flex items-center justify-center gap-6 mt-10">

            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
            >
              ‹
            </button>

            {/* DOTS */}
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    i === currentSlide
                      ? "bg-[#134e4a] scale-125"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
            >
              ›
            </button>
          </div>
        </div>

        {/* EXTRA INFO GRID */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <div className="bg-white p-6 rounded-xl border hover:shadow-md transition">
            <h3 className="font-semibold text-lg">Simple</h3>
            <p className="text-gray-600 text-sm mt-2">
              Easy-to-use interface for managing shareholders.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border hover:shadow-md transition">
            <h3 className="font-semibold text-lg">Secure</h3>
            <p className="text-gray-600 text-sm mt-2">
              Built with security-first architecture.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border hover:shadow-md transition">
            <h3 className="font-semibold text-lg">Scalable</h3>
            <p className="text-gray-600 text-sm mt-2">
              Designed to grow with your business.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Aboutus;