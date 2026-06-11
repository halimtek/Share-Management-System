import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function BuySharesButton() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">

      {/* CARD */}
      <div className="bg-gradient-to-br from-[#134e4a] to-gray-900 text-white rounded-2xl p-10 md:p-14 shadow-xl relative overflow-hidden">

        {/* subtle glow */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-green-400 via-transparent to-blue-500 blur-2xl"></div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-6">

          {/* TITLE */}
          <h2 className="text-3xl md:text-4xl font-bold">
            Invest in Your Future
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-200 max-w-2xl text-sm md:text-base leading-relaxed">
            Join our company’s success story by investing in available shares today.
            As a part-owner, you benefit from growth, innovation, and long-term value.
            Don’t miss the opportunity to be part of something bigger.
          </p>

          {/* CTA BUTTON */}
          <Link
            href="/buy"
            className="inline-flex items-center gap-2 bg-white text-[#134e4a] font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition shadow-md"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            Buy Shares Now
          </Link>

        </div>
      </div>
    </section>
  );
}