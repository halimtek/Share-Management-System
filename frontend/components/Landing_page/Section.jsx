import Head from "next/head";
import Sell from "@/components/Landing_page/Sell";

const Section = () => {
  return (
    <>
      <Head>
        <title>Section Page - Shareholder Management System</title>
      </Head>

      <div className="bg-gray-50">

        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-6 pt-28 pb-20 grid md:grid-cols-2 gap-10 items-center">

          {/* TEXT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Digital Share Management
            </h1>

            <p className="text-gray-600 mt-4 max-w-md">
              Save time, reduce cost, and improve efficiency with our modern share management platform.
            </p>

            <div className="mt-6">
              <button className="bg-[#134e4a] text-white px-6 py-3 rounded-xl hover:bg-[#0f3d3a] transition">
                Get Started
              </button>
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <img
              src="/assets/logo/manage.jpg"
              alt="manage"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </section>

        {/* SELL COMPONENT */}
        <Sell />

        {/* FEATURE SECTION */}
        <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}
          <div>
            <img
              src="/assets/logo/plb.jpg"
              alt="paperless boards"
              className="rounded-2xl shadow-lg"
            />
          </div>

          {/* TEXT CARD */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

            <span className="inline-block text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600">
              Reduce compliance risk
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
              Paperless Boards
            </h2>

            <p className="text-gray-600 mt-4">
              It’s time to stop printing and scanning. Manage everything digitally in one secure platform.
            </p>

            <p className="text-gray-500 mt-3 text-sm leading-relaxed">
              Manage every aspect of your share system in a secure cloud environment.
              Store documents, track updates, and streamline digital workflows efficiently.
            </p>

            <button className="mt-6 bg-[#134e4a] text-white px-5 py-2 rounded-xl hover:bg-[#0f3d3a] transition">
              Learn More
            </button>
          </div>
        </section>

      </div>
    </>
  );
};

export default Section;