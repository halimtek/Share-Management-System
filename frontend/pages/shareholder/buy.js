import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../shareholder";

const buy = () => {
  const router = useRouter();

  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [shareamount, setShareAmount] = useState("");

  // ✅ NEW REQUIRED FIELDS (FROM BACKEND)
  const [country, setCountry] = useState("Ethiopia");
  const [city, setCity] = useState("Addis Ababa");
  const [subcity, setSubcity] = useState("");
  const [wereda, setWereda] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user) {
      setEmail(user.email || "");
      setFirstName(user.firstname || "");
      setLastName(user.lastname || "");
      setMiddleName(user.middlename || "");
      setPhoneNo(user.phoneNo || "");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const addshareamount = {
      firstname,
      middlename,
      lastname,
      email,
      phoneNo,
      shareamount,

      // ✅ REQUIRED 12 FIELDS
      country,
      city,
      subcity,
      wereda,
      houseNo,
      password,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/addshareamount`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addshareamount),
        }
      );

      const data = await response.json();

      if (response.ok && !data.error) {
        setError("");
        router.push(data.message);
      } else {
        setError(data.error || data.message);
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto mt-10 pt-10 rounded-lg bg-gray-400">
        <Head>
          <title>Buy a Share</title>
        </Head>

        <h1 className="font-bold text-gray-700 text-center mb-8 text-2xl">
          Buy And Increase Your Profit
        </h1>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">

          {/* NAME FIELDS */}
          <input value={firstname} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="input" />
          <input value={middlename} onChange={(e) => setMiddleName(e.target.value)} placeholder="Middle Name" className="input" />
          <input value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="input" />

          {/* EMAIL (readonly) */}
          <input value={email} readOnly className="input bg-gray-200" />

          {/* PHONE */}
          <input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} placeholder="Phone No" className="input" />

          {/* SHARE */}
          <input value={shareamount} onChange={(e) => setShareAmount(e.target.value)} placeholder="Share Amount" type="number" className="input" />

          {/* NEW FIELDS */}
          <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="input" />
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="input" />
          <input value={subcity} onChange={(e) => setSubcity(e.target.value)} placeholder="Subcity" className="input" />
          <input value={wereda} onChange={(e) => setWereda(e.target.value)} placeholder="Wereda" className="input" />
          <input value={houseNo} onChange={(e) => setHouseNo(e.target.value)} placeholder="House No" className="input" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="input" />

          <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-4">
            BUY
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </Layout>
  );
};

export default buy;