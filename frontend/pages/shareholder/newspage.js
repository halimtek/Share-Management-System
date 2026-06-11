import React from "react";
import { formatDistanceToNow } from "date-fns";

const NewsCard = ({ adminnews }) => {
  if (!adminnews) return null;

  return (
    <div className="w-full h-auto mx-auto p-6 shadow-lg rounded-xl bg-white">

      {/* TITLE */}
      <div className="font-bold text-blue-700 text-lg">
        {adminnews.title}
      </div>

      {/* DESCRIPTION */}
      <div className="my-2 text-gray-700">
        {adminnews.description}
      </div>

      {/* CONTENT */}
      <div className="my-4 text-gray-600 text-sm">
        {adminnews.content}
      </div>

      {/* IMAGE (FIXED) */}
      {adminnews.image && (
        <img
          src={
            adminnews.image.startsWith("http")
              ? adminnews.image
              : `${process.env.NEXT_PUBLIC_API_URL}/${adminnews.image}`
          }
          className="w-full h-60 object-cover rounded-lg mt-3"
          alt={adminnews.title}
        />
      )}

      {/* TIME */}
      {adminnews.createdAt && (
        <p className="italic text-sm text-right text-blue-900 mt-3">
          {formatDistanceToNow(new Date(adminnews.createdAt), {
            addSuffix: true,
          })}
        </p>
      )}
    </div>
  );
};

export default NewsCard;