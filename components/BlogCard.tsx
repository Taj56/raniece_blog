'use client';

import Image from 'next/image';

type BlogCardProps = {
  author: string;
  authorAvatar: string;
  datePosted: string;
  readTime: string;
  title: string;
  description: string;
  imageUrl: string;
};

export default function BlogCard({
  author,
  authorAvatar,
  datePosted,
  readTime,
  title,
  description,
  imageUrl,
}: BlogCardProps) {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-md overflow-hidden shadow-md">
      {/* Left Image */}
      <div className="w-full md:w-1/2 h-64 relative">
        <Image
          src={imageUrl}
          alt="blog cover"
          fill
          className="object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <Image
            src={authorAvatar}
            alt={author}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span>{author}</span>
          <span>•</span>
          <span>{datePosted}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">{title}</h2>

        {/* Description */}
        <p className="text-gray-700 mb-4">{description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>0 views</span>
          <span>0 comments</span>
          <button className="text-red-400 hover:text-red-600 text-lg">♡</button>
        </div>
      </div>
    </div>
  );
}
