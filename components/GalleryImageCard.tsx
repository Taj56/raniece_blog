/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"

export type GalleryImage = {
  _id: string
  title?: string
  createdAt?: string
  image?: { asset?: any; alt?: string }
}

export default function GalleryImageCard({ item }: { item: GalleryImage }) {
  const img =
    item.image?.asset
      ? urlFor(item.image).width(1200).height(1200).fit("crop").url()
      : "/mini.webp"

  return (
    <div className="overflow-hidden border border-gray-200 bg-white">
      <div className="relative aspect-square w-full">
        <Image
          src={img}
          alt={item.image?.alt || item.title || "Gallery image"}
          fill
          className="object-cover"
        />
      </div>

      {item.title ? (
        <div className="px-3 py-2">
          <div className="text-sm text-gray-800">{item.title}</div>
        </div>
      ) : null}
    </div>
  )
}