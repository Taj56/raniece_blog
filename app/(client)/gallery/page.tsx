import Container from "@/components/Container"
import GalleryCategoryCard, { GalleryCategory } from "@/components/GalleryCategoryCard"
import { client } from "@/sanity/lib/client"
import { galleryCategoriesQuery } from "@/lib/sanity.queries"

export const revalidate = 60

export default async function GalleryPage() {
  const categories = await client.fetch<GalleryCategory[]>(galleryCategoriesQuery)

  return (
    <Container className="min-h-screen pt-16">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <h1 className="text-center font-serif text-5xl font-bold text-gray-900">
          Gallery
        </h1>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <GalleryCategoryCard key={c._id} category={c} />
          ))}
        </div>
      </div>
    </Container>
  )
}