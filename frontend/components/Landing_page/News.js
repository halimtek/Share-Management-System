import React, { useState, useEffect } from 'react'
import NewsCard from '../../pages/shareholder/newspage'

import { useRouter } from 'next/router'


const News = () => {

  const [news, setNews] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter();
  const [showLayout,setShowLayout]=useState(false)
  useEffect(() => {
    async function fetchNews() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/adminnews`)
        const data = await response.json()
        if(response.ok){
          setNews(data)
          setShowLayout(true)
          console.log(response)
          console.log(data)

        }
        else{
          setError(data)
          console.log(data.message)
        }
      // else{
      //   console.log("not authoried")
      //   router.push("/login");
      // }
    }
 fetchNews()
  }, [])
  return (
    <div id='news' className='bg-slate-100'>
      <div  className='px-10 py-6 mx-auto'>
      <div className="text-2xl font-bold  <div> ">News</div>
      <div 
      className="grid grid-cols-1 grid-flow-row w-2/3 mx-auto justify-center gap-5 mt-8 ">
         {news && <NewsCard adminnews={news}/>} 
      </div>
     </div>
     
     </div>
  )
}

export default News