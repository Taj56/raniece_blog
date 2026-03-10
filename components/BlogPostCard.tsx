import Image from "next/image"
import Link from "next/link"
import { Heart, MoreVertical } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"

export type BlogPost = {
  _id: string
  title?: string
  slug?: string
  author?: string
  description?: string
  publishedAt?: string
  mainImage?: {
    asset?: any
    alt?: string
  }
  readTimeLabel?: string
  views?: number
  comments?: number
}

function formatDateLabel(dateISO?: string) {
  if (!dateISO) return ""
  const d = new Date(dateISO)
  if (Number.isNaN(d.getTime())) return ""
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

export default function BlogPostCard({ post }: { post: BlogPost }) {
  const dateLabel = formatDateLabel(post.publishedAt)

  const coverUrl =
    post.mainImage?.asset
      ? urlFor(post.mainImage).width(1200).height(900).fit("crop").url()
      : "/mini.webp"

  const coverAlt = post.mainImage?.alt || "blog cover"

  const href = post.slug ? `/blog/${post.slug}` : "/blog"

  return (
    <article className="w-full overflow-hidden rounded-none border border-gray-200 bg-white">
      <div className="flex flex-col md:h-[340px] md:flex-row">
        <Link href={href} className="relative block h-[260px] w-full md:h-full md:w-[46%]">
          <Image alt={coverAlt} src={coverUrl} fill className="object-cover" priority />
        </Link>

        <div className="flex w-full flex-col md:w-[54%]">
          <div className="flex items-start justify-between px-7 pt-6">
            <div className="leading-tight">
              <div className="text-sm text-gray-800">{post.author || "Unknown"}</div>
              <div className="mt-0.5 text-xs text-gray-500">
                {dateLabel}
                {post.readTimeLabel ? ` • ${post.readTimeLabel}` : ""}
              </div>
            </div>

            <button
              type="button"
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              aria-label="More"
            >
              <MoreVertical size={18} />
            </button>
          </div>

          <div className="px-7 pt-3">
            <Link href={href} className="block">
              <h2 className="font-serif text-4xl font-bold leading-tight text-gray-900">
                {post.title || ""}
              </h2>
            </Link>

            <p className="mt-3 text-base font-light leading-relaxed text-gray-600">
              {post.description || ""}
            </p>
          </div>

          <div className="mt-auto px-7 pb-5 pt-6">
            <div className="h-px w-full bg-gray-200" />

            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span>{post.views ?? 0} views</span>
                <span>{post.comments ?? 0} comments</span>
              </div>

              <button
                type="button"
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Like"
              >
                <Heart size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}