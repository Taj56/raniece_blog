import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"

export type GalleryCategory = {
  _id: string
  title?: string
  slug?: string
  description?: string
  coverImage?: { asset?: any; alt?: string }
}

export default function GalleryCategoryCard({ category }: { category: GalleryCategory }) {
  const href = category.slug ? `/gallery/${category.slug}` : "/gallery"

  const img =
    category.coverImage?.asset
      ? urlFor(category.coverImage).width(1200).height(800).fit("crop").url()
      : "/mini.webp"

  return (
    <Link
      href={href}
      className="group block overflow-hidden border border-gray-200 bg-white"
    >
      <div className="relative h-[240px] w-full">
        <Image
          src={img}
          alt={category.coverImage?.alt || "Category cover"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="px-5 py-4">
        <h3 className="font-serif text-xl font-bold text-gray-900">
          {category.title || ""}
        </h3>

        {category.description ? (
          <p className="mt-2 text-sm font-light leading-6 text-gray-600">
            {category.description}
          </p>
        ) : null}
      </div>
    </Link>
  )
}