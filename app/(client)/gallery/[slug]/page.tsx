/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/Container"
import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import {
  galleryCategoryBySlugQuery,
  galleryCategorySlugsQuery,
  galleryImagesByCategorySlugQuery,
} from "@/lib/sanity.queries"
import { urlFor } from "@/sanity/lib/image"

type Category = {
  _id: string
  title?: string
  slug?: string
  projectType?: string
  projectDate?: string
  summary?: string
  coverImage?: { asset?: any; alt?: string }
}

type GalleryImage = {
  _id: string
  title?: string
  image?: { asset?: any; alt?: string }
}

export const revalidate = 60

export default async function GalleryCategoryPage({ params }: { params: { slug: string } }) {
  const category = await client.fetch<Category>(galleryCategoryBySlugQuery, {
    slug: params.slug,
  })

  if (!category?._id) {
    return (
      <Container className="min-h-screen pt-16">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <p className="text-gray-700">Category not found.</p>
          <Link href="/gallery" className="mt-4 inline-block text-sm underline">
            Back to Gallery
          </Link>
        </div>
      </Container>
    )
  }

  const images = await client.fetch<GalleryImage[]>(galleryImagesByCategorySlugQuery, {
    slug: params.slug,
  })

  // Previous/Next
  const slugs = await client.fetch<{ slug: string }[]>(galleryCategorySlugsQuery)
  const idx = slugs.findIndex((s) => s.slug === params.slug)
  const prev = idx > 0 ? slugs[idx - 1]?.slug : null
  const next = idx >= 0 && idx < slugs.length - 1 ? slugs[idx + 1]?.slug : null

  const hero =
    category.coverImage?.asset
      ? urlFor(category.coverImage).width(2400).height(1400).fit("crop").url()
      : "/mini.webp"

  // Split layout like Wix:
  // 1 big hero
  // 2-up row
  // remaining 2-up rows
  const firstTwo = images.slice(0, 2)
  const rest = images.slice(2)

  return (
    <Container className="min-h-screen pt-12">
      <div className="mx-auto w-full max-w-[1400px] px-10">
        {/* Top layout */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start">
          {/* Left: title + meta */}
          <div className="md:col-span-6">
            <h1 className="font-serif text-[72px] font-bold leading-[0.95] tracking-tight text-gray-900">
              {category.title || ""}
            </h1>

            <div className="mt-10 space-y-8 text-[15px] text-gray-800">
              <div>
                <div className="font-semibold">Project Type</div>
                <div className="mt-2 text-gray-700">{category.projectType || "-"}</div>
              </div>

              <div>
                <div className="font-semibold">Date</div>
                <div className="mt-2 text-gray-700">{category.projectDate || "-"}</div>
              </div>
            </div>
          </div>

          {/* Right: summary aligned high/right like Wix */}
          <div className="md:col-span-6 md:flex md:justify-end">
            <p className="mt-4 max-w-[420px] text-[14px] leading-7 text-gray-700 md:mt-2">
              {category.summary || ""}
            </p>
          </div>
        </div>

        {/* Big hero image (wide) */}
        <div className="relative mt-16 w-full overflow-hidden border border-gray-200 bg-white">
          <div className="relative h-[420px] w-full sm:h-[520px] md:h-[620px]">
            <Image
              src={hero}
              alt={category.coverImage?.alt || "Project hero"}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* 2-up row like Wix */}
        {firstTwo.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {firstTwo.map((img) => {
              const src =
                img.image?.asset
                  ? urlFor(img.image).width(2000).height(1500).fit("crop").url()
                  : "/mini.webp"

              return (
                <div
                  key={img._id}
                  className="overflow-hidden border border-gray-200 bg-white"
                >
                  <div className="relative h-[320px] w-full sm:h-[380px] md:h-[420px]">
                    <Image
                      src={src}
                      alt={img.image?.alt || img.title || "Gallery image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        ) : null}

        {/* Remaining images in 2-up rows */}
        {rest.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {rest.map((img) => {
              const src =
                img.image?.asset
                  ? urlFor(img.image).width(2000).height(1500).fit("crop").url()
                  : "/mini.webp"

              return (
                <div
                  key={img._id}
                  className="overflow-hidden border border-gray-200 bg-white"
                >
                  <div className="relative h-[320px] w-full sm:h-[380px] md:h-[420px]">
                    <Image
                      src={src}
                      alt={img.image?.alt || img.title || "Gallery image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        ) : null}

        {/* Prev / Next */}
        <div className="mt-14 flex items-center justify-between border-t border-gray-200 pt-10 text-sm text-gray-700">
          {prev ? (
            <Link href={`/gallery/${prev}`} className="hover:underline">
              ← Previous Project
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link href={`/gallery/${next}`} className="hover:underline">
              Next Project →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </Container>
  )
}