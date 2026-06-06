import Head from "next/head";
import { useState } from "react";
import Image from 'next/image';


const buy = () => {
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [subcity, setSubcity] = useState("");
  const [wereda, setWereda] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [paidbirr, setPaidBirr] = useState("");
  const [shareamount, setShareAmount] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('middlename', middlename);
    formData.append('phoneNo', phoneNo);
    formData.append('shareamount', shareamount);
    formData.append('paidbirr', paidbirr);
    formData.append('password', password);
    formData.append('subcity', subcity);
    formData.append('wereda', wereda);
    formData.append('city', city);
    formData.append('email', email);
    formData.append('country', country);
    formData.append('houseNo', houseNo);
    formData.append('lastname', lastname);
    if (image) {
      formData.append('image', image, image.name);
    }
  // const registration = {
  //   firstname,
  //   middlename,
  //   lastname,
  //   country,
  //   city,
  //   subcity,
  //   wereda,
  //   email,
  //   phoneNo,
  //   password,
  //   houseNo,
  //   paidbirr,
  //   shareamount,
  // };
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/buyer`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: formData,
  });
  const data = await response.json();
  if (response.ok) {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setCity("");
    setCountry("");
    setEmail("");
    setHouseNo("");
    setPassword("");
    setPhoneNo("");
    setShareAmount("");
    setPaidBirr("");
    setWereda("");
    setSubcity("");
    setError("");
    setImage(null);
    console.log(data);
  } else {
    setError(data.message);
  }
};
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    setImage(file);
  }
};
  return (
    
    
    
    <div id="buy" className="max-w-lg mx-auto rounded-lg bg-gray-400 pt-10 mt-10">
      <Head>
        <title className="">register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="font-bold text-gray-700 text-center mb-8 text-2xl">
          Buy And Be a Shareholder
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-x-4 ">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block mb-2 font-bold text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(event) => setFirstName(event.target.value)}
              value={firstname}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="middleName"
              className="block mb-2 font-bold text-gray-700"
            >
              Middle Name
            </label>
            <input
              type="text"
              id="middleName"
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(event) => setMiddleName(event.target.value)}
              value={middlename}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block mb-2 font-bold text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(event) => setLastName(event.target.value)}
              value={lastname}
            />
          </div>
        </div>

         <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-bold text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            required
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </div>
        
        {/* <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 font-bold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
             {...register("password", {
                    required: "Please enter password",
                    minLength: {
                      value: 6,
                      message: "password is more than 5 chars",
                    },
                  })}
            id="password"
            autoComplete="current-password"
            required
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div> */}
        <div className="rounded-md shadow-sm -space-y-px">
               <div className="my-4">
               <label 
                className="font-bold "
                 htmlFor="">Password</label>
               </div>
                <input
                  className=" appearance-none  relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                           "
                  type={"password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Please enter password",
                    minLength: {
                      value: 6,
                      message: "password is more than 5 chars",
                    },
                  })}
                  id="password"
                />
                {error.password && (
                  <div className="text-red-500 ">{error.password.message}</div>
                )}
              </div>

        <div className="mb-4">
          <label
            htmlFor="phoneNo"
            className="block mb-2 font-bold text-gray-700"
          >
            Phone No
          </label>
          <input
            type="tel"
            id="phoneNo"
            {...register("phoneNo", {
              
              minLength: {
                value: 6,
                message: "phone no is only 10 chars",
              },
            })}
            required
            autoComplete="tel"
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onChange={(event) => setPhoneNo(event.target.value)}
            value={phoneNo}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4 mb-4">
          <div>
            <label
              htmlFor="city"
              className="block mb-2 font-bold text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(event) => setCity(event.target.value)}
              value={city}
            />
          </div>

          <div>
            <label
              htmlFor="state"
              className="block mb-2 font-bold text-gray-700"
            >
              Subcity
            </label>
            <input
              type="text"
              id="subcity"
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(event) => setSubcity(event.target.value)}
              value={subcity}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="state"
              className="block mb-2 font-bold text-gray-700"
            >
              Wereda
            </label>
            <input
              type="text"
              id="wereda"
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(event) => setWereda(event.target.value)}
              value={wereda}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 mt-4">
          <div>
            <label
              htmlFor="houseNo"
              className="block mb-2 font-bold text-gray-700"
            >
              houseNo
            </label>
            <input
              type="text"
              id="houseNo"
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(event) => setHouseNo(event.target.value)}
              value={houseNo}
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block mb-2 font-bold text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(event) => setCountry(event.target.value)}
              value={country}
            />
          </div>
        </div>

        <div className="mb-4 mt-4">
          <label
            htmlFor="paidBirr"
            className="block mb-2 font-bold text-gray-700"
          >
            Paid Birr
          </label>
          <input
            type="number"
            id="paidBirr"
            required
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onChange={(event) => setPaidBirr(event.target.value)}
            value={paidbirr}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="shareAmount"
            className="block mb-2 font-bold text-gray-700"
          >
            Share Amount
          </label>
          <input
            type="number"
            id="shareAmount"
            required
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onChange={(event) => setShareAmount(event.target.value)}
            value={shareamount}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block font-medium mb-2">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {image && (
          <div className="mb-4">
            <Image src={URL.createObjectURL(image)} alt={image.name} width={640} height={360} className="rounded-md" />
          </div>
        )}
        <div className="mb-8">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mb-16"
          >
            BUY
          </button>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </div>
      </form>
      
    </div>
    
    
    
    
  )
}

export default buy