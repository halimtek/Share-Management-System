export default function LatestNews({ news = [] }) {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8">Latest News</h1>

      <ul>
        {news.map((item) => (
          <li key={item.id} className="mb-4">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="text-gray-500">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
  
  import fetch from 'node-fetch';

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/latest-news`);
  const result = await res.json();

  return {
    props: {
      news: result.data || [],
    },
    revalidate: 10, // ISR (VERY IMPORTANT)
  };
}