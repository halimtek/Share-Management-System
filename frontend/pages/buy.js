import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import Heator from "../components/Landing_page/Heator";

const buy = () => {
  const router = useRouter();

  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [country, setCountry] = useState("Ethiopia"); // FIX: prevent empty country
  const [city, setCity] = useState("");
  const [subcity, setSubcity] = useState("");
  const [wereda, setWereda] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [shareamount, setShareAmount] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const formData = new FormData();

    // ✔ ALL REQUIRED FIELDS (safe mapping)
    formData.append("firstname", firstname);
    formData.append("middlename", middlename);
    formData.append("lastname", lastname);
    formData.append("country", country || "Ethiopia"); // FIX SAFETY
    formData.append("city", city);
    formData.append("subcity", subcity);
    formData.append("wereda", wereda);
    formData.append("email", email);
    formData.append("phoneNo", phoneNo);
    formData.append("password", password);
    formData.append("houseNo", houseNo);
    formData.append("shareamount", shareamount);

    if (image) {
      formData.append("image", image, image.name);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/buyer`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || "Something went wrong");
        return;
      }

      if (data?.error) {
        setError(data.error);
        return;
      }

      // redirect to chapa checkout
      if (data?.message) {
        router.push(data.message);
      }

    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
  <Heator>
    <>
      <Head>
        <title>Become a Shareholder</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 py-10 px-4">

        {/* Hero */}
        <div className="max-w-7xl mx-auto mb-10 py-4">
          <div className="bg-gradient-to-r from-[#134e4a] to-[#0f766e] rounded-3xl overflow-hidden shadow-xl">

            <div className="grid md:grid-cols-2 items-center">

              <div className="p-10 md:p-16 text-white">
                {/* <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                  Shareholder Registration
                </span> */}

                <h1 className="text-5xl font-bold mt-6">
                  Become a Shareholder
                </h1>

                <p className="mt-4 text-slate-200 text-lg">
                  Invest securely and become part of our growing company.
                </p>
              </div>

              <div className="hidden md:flex justify-center p-10">
                <img
                  src="/assets/logo/manage.jpg"
                  alt="shareholder"
                  className="rounded-3xl w-full max-w-md shadow-2xl"
                />
              </div>

            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">

              {/* LEFT */}
              <div className="lg:col-span-2 space-y-8">

                {/* Personal Information */}
                <div className="bg-white rounded-3xl shadow-lg p-8">

                  <h2 className="text-2xl font-bold mb-6 text-slate-800">
                    Personal Information
                  </h2>

                  <div className="grid md:grid-cols-3 gap-4">

                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="input-modern"
                    />

                    <input
                      type="text"
                      placeholder="Middle Name"
                      value={middlename}
                      onChange={(e) => setMiddleName(e.target.value)}
                      required
                      className="input-modern"
                    />

                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="input-modern"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">

                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="input-modern"
                    />

                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="input-modern"
                    />
                  </div>

                  <div className="mt-4">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      required
                      className="input-modern"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="bg-white rounded-3xl shadow-lg p-8">

                  <h2 className="text-2xl font-bold mb-6 text-slate-800">
                    Address Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">

                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="input-modern"
                    />

                    <input
                      type="text"
                      placeholder="Subcity"
                      value={subcity}
                      onChange={(e) => setSubcity(e.target.value)}
                      required
                      className="input-modern"
                    />

                    <input
                      type="text"
                      placeholder="Wereda"
                      value={wereda}
                      onChange={(e) => setWereda(e.target.value)}
                      required
                      className="input-modern"
                    />

                    <input
                      type="text"
                      placeholder="House Number"
                      value={houseNo}
                      onChange={(e) => setHouseNo(e.target.value)}
                      required
                      className="input-modern"
                    />

                    <input
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      className="input-modern md:col-span-2"
                    />
                  </div>
                </div>

                {/* Investment */}
                <div className="bg-white rounded-3xl shadow-lg p-8">

                  <h2 className="text-2xl font-bold mb-6 text-slate-800">
                    Investment Details
                  </h2>

                  <input
                    type="number"
                    placeholder="Share Amount"
                    value={shareamount}
                    onChange={(e) => setShareAmount(e.target.value)}
                    required
                    className="input-modern"
                  />
                </div>

                {/* Upload */}
                <div className="bg-white rounded-3xl shadow-lg p-8">

                  <h2 className="text-2xl font-bold mb-6 text-slate-800">
                    Verification Document
                  </h2>

                  <label className="block border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center cursor-pointer hover:border-teal-600 transition">

                    <p className="font-semibold">
                      Upload Profile Image
                    </p>

                    <p className="text-gray-500 text-sm mt-2">
                      JPG, PNG supported
                    </p>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  {image && (
                    <div className="mt-6">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
                        className="w-40 h-40 object-cover rounded-2xl border"
                      />
                    </div>
                  )}
                </div>

              </div>

              {/* RIGHT */}
              <div>

                <div className="sticky top-28 bg-[#134e4a] text-white rounded-3xl shadow-xl p-8">

                  <h2 className="text-2xl font-bold mb-8">
                    Registration Summary
                  </h2>

                  <div className="space-y-4">

                    <div className="flex justify-between">
                      <span>Name</span>
                      <span>{firstname || "-"}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Email</span>
                      <span>{email || "-"}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Country</span>
                      <span>{country || "-"}</span>
                    </div>

                    <div className="border-t border-white/20 pt-4">

                      <div className="text-sm opacity-80">
                        Share Amount
                      </div>

                      <div className="text-4xl font-bold mt-2">
                        {shareamount || 0}
                      </div>

                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-8 bg-white text-[#134e4a] py-4 rounded-2xl font-bold text-lg hover:scale-105 transition"
                  >
                    Continue To Payment
                  </button>

                  {error && (
                    <p className="mt-4 text-red-200 text-center">
                      {error}
                    </p>
                  )}

                </div>

              </div>

            </div>
          </form>
        </div>
      </div>
    </>
  </Heator>
);
};

export default buy;