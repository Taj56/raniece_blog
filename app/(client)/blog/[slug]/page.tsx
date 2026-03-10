/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/Container"
import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { recentPostsQuery, singlePostBySlugQuery } from "@/lib/sanity.queries"
import { urlFor } from "@/sanity/lib/image"
import PostPortableText from "@/components/PostPortableText"

type Post = {
  _id: string
  title?: string
  slug?: string
  author?: string
  description?: string
  publishedAt?: string
  mainImage?: { asset?: any; alt?: string }
  body?: any
}

type RecentPost = {
  _id: string
  title?: string
  slug?: string
  publishedAt?: string
  mainImage?: { asset?: any; alt?: string }
}

type PageProps = {
  params: Promise<{ slug: string }>
}

function formatTopDate(dateISO?: string) {
  if (!dateISO) return ""
  const d = new Date(dateISO)
  if (Number.isNaN(d.getTime())) return ""
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

export const revalidate = 60

export default async function SingleBlogPostPage({ params }: PageProps) {
  const { slug } = await params

  const post = await client.fetch<Post>(singlePostBySlugQuery, { slug })

  if (!post?._id) {
    return (
      <Container className="min-h-screen pt-10">
        <div className="mx-auto w-full max-w-[760px] px-5">
          <p className="text-gray-700">Post not found.</p>
          <Link href="/blog" className="mt-4 inline-block text-sm text-gray-700 underline">
            Back to Blog
          </Link>
        </div>
      </Container>
    )
  }

  const recent = await client.fetch<RecentPost[]>(recentPostsQuery)

  const dateLabel = formatTopDate(post.publishedAt)
  const heroUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1400).height(800).fit("crop").url()
    : ""

  return (
    <Container className="min-h-screen pt-10">
      <div className="mx-auto w-full max-w-[860px] px-5">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="font-medium text-gray-800">{post.author || "Unknown"}</span>
            <span>•</span>
            <span>{dateLabel}</span>
          </div>

          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-gray-900">
            {post.title || ""}
          </h1>
        </div>

        <div className="mx-auto w-full max-w-[760px]">
          <div className="prose prose-neutral max-w-none">
            <PostPortableText value={post.body || []} />
          </div>

          <div className="mt-10 border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-800">Recent Posts</h3>
              <Link href="/blog" className="text-xs text-gray-600 hover:underline">
                See All
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {recent
                .filter((p) => p.slug !== post.slug)
                .slice(0, 3)
                .map((p) => {
                  const img = p.mainImage?.asset
                    ? urlFor(p.mainImage).width(500).height(350).fit("crop").url()
                    : "/mini.webp"

                  return (
                    <Link
                      key={p._id}
                      href={`/blog/${p.slug}`}
                      className="block overflow-hidden border border-gray-200 bg-white"
                    >
                      <div className="relative h-[120px] w-full">
                        <Image
                          src={img}
                          alt={p.mainImage?.alt || "recent post"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <div className="font-serif text-sm font-bold text-gray-900">
                          {p.title || ""}
                        </div>
                      </div>
                    </Link>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}