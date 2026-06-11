import React, { useState, useEffect } from "react";
import NewsCard from "../../pages/shareholder/newspage";

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/adminnews`
        );

        const data = await response.json();

        console.log("NEWS API:", data); // 🔍 debug

        const safeNews = Array.isArray(data)
          ? data
          : data?.news || data?.data || [];

        setNews(safeNews);
      } catch (err) {
        setError("Failed to load news");
      }
    }

    fetchNews();
  }, []);

  const featured = news[0];
  const sideNews = news.slice(1, 5);
  const latestNews = news.slice(5);
  
  return (
    <div className="bg-[#f5f5f5] min-h-screen py-10">

      {/* HEADER */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <h1 className="text-2xl font-bold text-red-600">News</h1>
          <span className="text-sm text-gray-500">
            Live updates • Ethiopia
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* ===== TOP SECTION ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* FEATURED STORY */}
          <div className="lg:col-span-7 bg-white rounded-xl overflow-hidden shadow-sm">
            {featured ? (
              <div className="p-6">

                <span className="text-xs text-red-600 font-bold uppercase">
                  Top Story
                </span>

                <h2 className="text-2xl font-bold mt-2 text-gray-900">
                  {featured.title}
                </h2>

                {/* IMAGE (NEW) */}
               
                {featured.image && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${featured.image}`}
                    alt={featured.title}
                    className="w-full h-64 object-cover rounded-lg mt-4"
                  />
                )}

                <p className="text-gray-600 mt-4 line-clamp-3">
                  {featured.description}
                </p>

                <p className="text-gray-500 mt-3 text-sm line-clamp-4">
                  {featured.content}
                </p>

                <button className="mt-5 text-red-600 font-semibold hover:underline">
                  Read full story →
                </button>
              </div>
            ) : (
              <p className="p-5 text-gray-400">No featured news</p>
            )}
          </div>

          {/* SIDE HEADLINES */}
          <div className="lg:col-span-5 bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-sm font-bold text-gray-700 mb-3">
              Headlines
            </h3>

            <div className="space-y-4">
              {sideNews.map((item) => (
                <div
                  key={item.id}
                  className="border-b pb-3 last:border-b-0"
                >
                  <h4 className="font-semibold hover:text-red-600 cursor-pointer">
                    {item.title}
                  </h4>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== LATEST NEWS ===== */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Latest News
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition"
              >
                <NewsCard adminnews={item} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default News;