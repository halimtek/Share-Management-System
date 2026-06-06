export default function LatestNews({ news }) {
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
    // const response = await fetch('https://api.example.com/latest-news');
    const response = await fetch('http://localhost:5000/api/adminnews');
    const news = await response.json();
    return {
      props: {
        news,
      },
    };
  }
  