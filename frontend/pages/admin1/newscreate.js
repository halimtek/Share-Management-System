import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../admin1";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const AddNews = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("description", description);

      if (image) {
        formData.append("image", image, image.name);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/adminnews`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);

        // ✅ proper reset
        setTitle("");
        setcontent("");
        setDescription("");
        setImage(null);

        // optional redirect
        // router.push("/admin1/news");
      } else {
        setError(data?.message || "Failed to create news");
      }
    } catch (err) {
      setError("Server error while submitting news");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setImage(file);
  };

  return (
    <Layout>
      <div className="px-6 md:px-20 py-6">

        {/* BACK BUTTON */}
        <Link
          href="/admin1/news"
          className="flex items-center text-gray-700 hover:text-pink-700 mb-6"
        >
          <FaArrowLeft size={18} className="mr-2" />
          <span className="text-sm font-medium">Back</span>
        </Link>

        {/* FORM CARD */}
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">

          <h1 className="text-2xl font-bold mb-6">
            Create News Article
          </h1>

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
              News published successfully 🎉
            </div>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* TITLE */}
            <div>
              <label className="block mb-2 font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:border-blue-400"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block mb-2 font-medium">
                Description
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:border-blue-400"
                required
              />
            </div>

            {/* CONTENT */}
            <div>
              <label className="block mb-2 font-medium">Content</label>
              <textarea
                rows="5"
                value={content}
                onChange={(e) => setcontent(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:border-blue-400"
                required
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="block mb-2 font-medium">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* PREVIEW */}
            {image && (
              <Image
                src={URL.createObjectURL(image)}
                alt="preview"
                width={600}
                height={300}
                className="rounded-lg"
              />
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Publishing..." : "Publish News"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddNews;