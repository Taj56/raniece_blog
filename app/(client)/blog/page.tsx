import Container from "@/components/Container"
import Link from "next/link"
import { Search } from "lucide-react"
import BlogPostCard, { BlogPost } from "@/components/BlogPostCard"
import { client } from "@/sanity/lib/client"
import { blogPostsQuery } from "@/lib/sanity.queries"

export const revalidate = 60

const Blog = async () => {
  const posts = await client.fetch<BlogPost[]>(blogPostsQuery)

  return (
    <Container className="min-h-screen pt-10">
      <div className="mx-auto w-full max-w-[980px] px-5">
        <div className="flex h-[50px] items-center justify-between">
          <Link href="/blog" className="text-sm font-light text-gray-700">
            All Posts
          </Link>

          <button
            type="button"
            className="rounded-full p-2 text-gray-700 hover:bg-gray-100"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
        </div>

        <section className="mt-6 flex w-full flex-col gap-10 pb-14">
          {posts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </section>
      </div>
    </Container>
  )
}

export default Blog