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
      <div id="buy" className="max-w-lg mx-auto rounded-lg bg-gray-400 pt-10 mt-10">
        <Head>
          <title>register</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          <h1 className="font-bold text-gray-700 text-center mb-8 text-2xl">
            Buy And Be a Shareholder
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">

          {/* UI untouched exactly as yours */}
          <div className="grid grid-cols-3 gap-x-4 ">

            <div className="mb-4">
              <label className="block mb-2 font-bold text-gray-700">
                First Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstname}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-bold text-gray-700">
                Middle Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => setMiddleName(e.target.value)}
                value={middlename}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-bold text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => setLastName(e.target.value)}
                value={lastname}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-md"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              className="w-full px-3 py-2 text-gray-700 border rounded-md"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700">
              Phone No
            </label>
            <input
              type="tel"
              required
              minLength={10}
              maxLength={10}
              className="w-full px-3 py-2 text-gray-700 border rounded-md"
              onChange={(e) => setPhoneNo(e.target.value)}
              value={phoneNo}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-4 mb-4">

            <div>
              <label className="block mb-2 font-bold text-gray-700">
                City
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-md"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>

            <div>
              <label className="block mb-2 font-bold text-gray-700">
                Subcity
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-md"
                onChange={(e) => setSubcity(e.target.value)}
                value={subcity}
              />
            </div>

            <div className="mt-4">
              <label className="block mb-2 font-bold text-gray-700">
                Wereda
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-md"
                onChange={(e) => setWereda(e.target.value)}
                value={wereda}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 mt-4">

            <div>
              <label className="block mb-2 font-bold text-gray-700">
                House No
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-md"
                onChange={(e) => setHouseNo(e.target.value)}
                value={houseNo}
              />
            </div>

            <div>
              <label className="block mb-2 font-bold text-gray-700">
                Country
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-md"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700">
              Share Amount
            </label>
            <input
              type="number"
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-md"
              onChange={(e) => setShareAmount(e.target.value)}
              value={shareamount}
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          {image && (
            <div className="mb-4">
              <Image
                src={URL.createObjectURL(image)}
                alt="preview"
                width={110}
                height={110}
                className="rounded-md"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md mb-16"
          >
            BUY
          </button>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </Heator>
  );
};

export default buy;