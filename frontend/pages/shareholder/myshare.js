// import Head from 'next/head';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Layout from '../shareholder';
// import { data } from 'autoprefixer';


// export default function UserProfile() {
//   const [user, setUser] = useState(null);
//   const router = useRouter();
//   const [error, setError] = useState(null)
//   const [showLayout,setShowLayout]=useState(false)
//   useEffect(() => {
//     async function fetchUser() {
//       const users= JSON.parse(sessionStorage.getItem("user"));
//       if(users){
//         const config = {
//           headers: {
//             Authorization: `Bearer ${users.token}`,
//           },
//         }
//         const response = await fetch('http://localhost:8000/api/user/info',config)
//         const data = await response.json()
//         if(response.ok){
//           setUser(data)
//           console.log(data)
//         }
//         else{
//           setError(data)
//           console.log(data.message)
//         }
//       }
//       else{
//         console.log("not authoried")
//         router.push("/login");
//       }
//     }
//  fetchUser()
//   }, [])
//   return (
//     user &&
//    <Layout>   
//     <div className="bg-gray-100 min-h-screen">
//       <Head>
//         <title>'s Profile</title>
//       </Head>
//       <div className="max-w-5xl mx-auto py-16 px-4">
//         <h1 className="text-3xl font-medium text-blue-400 mb-8">{user.firstname}'s Profile</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="bg-white border border-gray-200 rounded-lg p-4 shadow">
//           <div className="bg-white border border-gray-200 rounded-lg p-4 shadow">
//             <h2 className="text-lg font-medium text-red-400 mb-4">Personal Information</h2>
//             <p className="text-gray-600 mb-2">
//               <span className="font-semibold">First Name:<span className='pl-2 text-green-600'>{user.firstname}</span></span> 
//             </p>
//             <p className="text-gray-600 mb-2">
//               <span className="font-semibold">Middle Name:<span className='pl-2 text-green-600'>{user.middlename}</span></span> 
//             </p>
//             <p className="text-gray-600 mb-2">
//               <span className="font-semibold">Last name:<span className='pl-2 text-green-600'>{user.lastname}</span></span> 
//             </p>
//             <p className="text-gray-600 mb-2">
//               <span className="font-semibold">Email:<span className='pl-2 text-green-600'>{user.email}</span></span> 
//             </p>
//             <p className="text-gray-600 mb-2">
//               <span className="font-semibold">Phone:<span className='pl-2 text-green-600'>{user.phoneNo}</span></span> 
//             </p>
//             <p className="text-gray-600 mb-2">
//               <span className="font-semibold">City:<span className='pl-2 text-green-600'>{user.city}</span></span> 
//             </p>
//             <p className="text-gray-600 mb-2">
//               <span className="font-semibold">Subcity:<span className='pl-2 text-green-600'>{user.subcity}</span></span> 
//             </p>
           
//             <p className="text-gray-600 mb-2">
//               <span className="font-semibold">wereda:<span className='pl-2 text-green-600'>{user.wereda}</span></span> 
//             </p>
            
          
//             </div>
//             <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4 shadow">
//           <h2 className="text-lg font-medium mt-8 mb-4 text-red-400 ">Shareholder Information</h2>
            
//             <p className="text-gray-600 mb-2">
//               <span className="font-semibold ">Shares Amount:<span className='pl-2 text-green-600'>{user.shareamount.toFixed(2)}</span></span> 
//             </p>
//           </div>
//           </div>
          
//           <div className="bg-white border border-gray-200 rounded-lg p-4 shadow">
//             <h2 className="text-lg font-medium text-red-400 mb-4">Profile Picture</h2>
//             {/* <img src={`http://localhost:5000/${item.img}`}/><br></br> */}
//             <img
//         src={`http://localhost:8000/${user.image}`}
//        alt="Profile" 
//              className="w-full rounded-lg" />
//           </div>
//         </div>
//       </div>
//     </div>
//     </Layout>
 
//   );
// }

import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../shareholder';
import { data } from 'autoprefixer';

// import { getUserById } from '../utils/database';

// Define the UserProfile component
export default function UserProfile() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [error, setError] = useState(null)
  const [showLayout,setShowLayout]=useState(false)
  useEffect(() => {
    async function fetchUser() {
      const user= JSON.parse(sessionStorage.getItem("user"));
      if(user){
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      // if(user && user.roll===0){
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/info`,config)
        const data = await response.json()
        if(response.ok){
          setUser(data)
          console.log(data)
          // console.log(response)
        }
        else{
          setError(data)
          console.log(data.message)
        }
      }
      else{
        console.log("not authoried")
        router.push("/login");
      }
    }
 fetchUser()
  }, [])
  return (
    user &&
   <Layout>   
    <div className="bg-gray-100 min-h-screen -mt-10">
      <Head>
        <title>'s Profile</title>
      </Head>
      <div className="max-w-5xl  mx-auto py-16 px-4">
        <div className='flex justify-between mb-15 my-5'>
        <h1 className="text-3xl font-medium text-blue-400 mt-4">{user.firstname}'s Profile</h1>
        {/* <img
        src={`http://localhost:8000/${user.image}`}
       alt="Profile" 
             className="w-30 h-20 rounded-full" /> */}
             <div className="flex justify-center mb-4">
        <picture>
          <img
            className="w-28 h-auto rounded-3xl"
            src={`${process.env.NEXT_PUBLIC_API_URL}/${user.image}`}
            alt="user image"
          />
        </picture>
        </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 h-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-4 w-full shadow">
          
            <div className=' text-center items-center bg-lime-600  rounded-lg px-auto'> <h2 className="text-lg font-medium text-center text-gray-900 mb-4">Personal Information</h2></div>


            
            <div className='flex justify-start px-10   mt-8 pb-5 hover:scale-110 ease-in duration-300'>
            <p className="text-orange-500 pl-10 ">
            <span className="font-semibold">First Name:</span>
            </p>
            <p className="text-orange-500 pl-10 ">
            <span className=' text-green-600 hover:text-green-800 '>{user.firstname}</span>
            </p>
           
            </div>
            

            <div className='flex justify-start px-10   hover:scale-110 ease-in duration-300 pb-5'>
            <p className="text-orange-500 pl-10 ">
            <span className="font-semibold">Middle Name:</span>
            </p>
            <p className="text-orange-500 pl-10 ">
            <span className=' text-green-600 hover:text-green-800 '>{user.middlename}</span>
            </p>
           
            </div>

            <div className='flex justify-start px-10   hover:scale-110 ease-in duration-300 pb-5'>
            <p className="text-orange-500 pl-10 ">
            <span className="font-semibold">Last Name:</span>
            </p>
            <p className="text-orange-500 pl-10 ">
            <span className=' text-green-600 hover:text-green-800 '>{user.lastname}</span>
            </p>
           
            </div>


            <div className='flex justify-start px-10   hover:scale-110 ease-in duration-300 pb-5'>
            <p className="text-orange-500 pl-10 ">
            <span className="font-semibold">Email:</span>
            </p>
            <p className="text-orange-500 pl-10 ">
            <span className=' text-green-600 hover:text-green-800 '>{user.email}</span>
            </p>
           
            </div>
            

            <div className='flex justify-start px-10   hover:scale-110 ease-in duration-300 pb-5'>
            <p className="text-orange-500 pl-10 ">
            <span className="font-semibold">Phone no:</span>
            </p>
            <p className="text-orange-500 pl-10 ">
            <span className=' text-green-600 hover:text-green-800 '>{user.phoneNo}</span>
            </p>
           
            </div>
            

            {/* <div className='flex justify-start px-10  mt-4 '>
            </div> */}

<div className='flex justify-start px-10   hover:scale-110 ease-in duration-300 pb-5'>
            <p className="text-orange-500 pl-10 ">
            <span className="font-semibold">City:</span>
            </p>
            <p className="text-orange-500 pl-10 ">
            <span className=' text-green-600 hover:text-green-800 '>{user.city}</span>
            </p>
           
            </div>
          
          

            <div className='flex justify-start px-10   hover:scale-110 ease-in duration-300 pb-5'>
            <p className="text-orange-500 pl-10 ">
            <span className="font-semibold">Subcity:</span>
            </p>
            <p className="text-orange-500 pl-10 ">
            <span className=' text-green-600 hover:text-green-800 '>{user.subcity}</span>
            </p>
           
            </div>

            
            <div className='flex justify-start px-10   hover:scale-110 ease-in duration-300 pb-5'>
            <p className="text-orange-500 pl-10 ">
            <span className="font-semibold">Wereda:</span>
            </p>
            <p className="text-orange-500 pl-10 ">
            <span className=' text-green-600 hover:text-green-800 '>{user.wereda}</span>
            </p>
           
            </div>
           
            
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow ">
            <div className=' text-center items-center bg-slate-600  rounded-lg px-auto'> <h2 className="text-lg font-medium text-center text-white mb-4">Share Information</h2></div>

            
            <div className='flex justify-start px-10 mt-8 pb-5 hover:scale-110 ease-in duration-300'>
            <p className="text-orange-500 pl-10 ">
            <span className="font-semibold">Share-amount:</span>
            </p>
            <p className="text-orange-500 pl-10 ">
            <span className=' text-green-600 hover:text-green-800 '>{user.shareamount}</span>
            </p>
           
            </div>
            
          </div>
            </div>
             
          </div>
        </div>
    </Layout>
  );
}
