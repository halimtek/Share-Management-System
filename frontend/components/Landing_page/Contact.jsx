import Head from "next/head";
import { useState } from "react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactus = { name, email, message };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contactus`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactus),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setName("");
        setEmail("");
        setMessage("");
        setError("");
        setSuccess("Message sent successfully 🚀");
      } else {
        setError(data.message || "Something went wrong");
        setSuccess("");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div id="contact" className="bg-gray-50">

      <Head>
        <title>Contact Us - Shareholder Management System</title>
      </Head>

      {/* HERO SECTION */}
      <section className="text-center pt-28 pb-10 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Let’s Build Something Together
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Have a question or proposal? We’d love to hear from you. Our team
          will respond as soon as possible.
        </p>
      </section>

      {/* MAIN SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE */}
        <div className="hidden md:block">
          <img
            src="/assets/logo/contact.jpg"
            alt="contact"
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* FORM CARD */}
        <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Contact Us
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Fill out the form and we’ll get back to you.
          </p>

          {/* SUCCESS / ERROR */}
          {success && (
            <p className="mb-4 text-green-600 text-sm">{success}</p>
          )}
          {error && (
            <p className="mb-4 text-red-500 text-sm">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-[#134e4a]"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-[#134e4a]"
              required
            />

            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-[#134e4a]"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#134e4a] text-white py-3 rounded-xl font-medium hover:bg-[#0f3d3a] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;