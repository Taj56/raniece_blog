/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image"
import Link from "next/link"
import thirdImage from "@/assets/images/third.png"
import { getFeaturedData } from "@/sanity/lib/helpers/queries"
import { urlFor } from "@/sanity/lib/image"

const Featured = async () => {
  const rawCreationData = await getFeaturedData("creation-of-the-blog")
  const rawArtistData = await getFeaturedData("meet-the-artist")

  const creationData = Array.isArray(rawCreationData) ? null : rawCreationData
  const artistData = Array.isArray(rawArtistData) ? null : rawArtistData

  const artistImage = artistData?.mainImage
    ? urlFor(artistData.mainImage).url()
    : thirdImage

  const creationImage = creationData?.mainImage
    ? urlFor(creationData.mainImage).url()
    : thirdImage

  return (
    <section className="relative min-h-screen w-full">
      <h3 className="ml-12 mt-16 mb-12 font-serif text-3xl font-bold md:mt-56 md:mb-0 md:ml-[335px]">
        Featured Posts
      </h3>

      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-5 md:-mt-28 md:flex-row">
        <div className="h-full flex-col items-center justify-center gap-5">
          <div className="flex flex-col md:flex-row">
            <div>
              <Image
                src={artistImage}
                alt={artistData?.title || "post thumbnail"}
                width={250}
                height={250}
                className="h-[235px] w-[270px] object-cover"
              />
            </div>

            <div className="h-[235px] w-[270px] bg-[#EAF2F5] p-5">
              <h4 className="font-semibold">
                {artistData?.title || "Meet the Artist"}
              </h4>

              <p className="mt-2">
                {artistData?.description || "No description available."}
              </p>

              {artistData?.currentSlug ? (
                <Link
                  href={`/blog/${artistData.currentSlug}`}
                  className="mt-5 inline-block cursor-pointer bg-[#FFE5CE] p-2 font-thin"
                >
                  Read More
                </Link>
              ) : (
                <button
                  className="mt-5 cursor-not-allowed bg-[#FFE5CE] p-2 font-thin opacity-70"
                  disabled
                >
                  Read More
                </button>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-col md:flex-row">
            <div>
              <Image
                src={creationImage}
                alt={creationData?.title || "post thumbnail"}
                width={250}
                height={270}
                className="h-[235px] w-[270px] object-cover"
              />
            </div>

            <div className="h-[235px] w-[270px] bg-[#EAF2F5] p-5">
              <h4 className="font-semibold">
                {creationData?.title || "Creation of the Blog"}
              </h4>

              <p className="mt-2">
                {creationData?.description || "No description available."}
              </p>

              {creationData?.currentSlug ? (
                <Link
                  href={`/blog/${creationData.currentSlug}`}
                  className="mt-5 inline-block cursor-pointer bg-[#FFE5CE] p-2 font-thin"
                >
                  Read More
                </Link>
              ) : (
                <button
                  className="mt-5 cursor-not-allowed bg-[#FFE5CE] p-2 font-thin opacity-70"
                  disabled
                >
                  Read More
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <Image
              src={thirdImage}
              alt="post thumbnail"
              width={250}
              height={250}
              className="h-[235px] w-[270px] object-cover"
            />
          </div>

          <div className="h-[235px] w-[270px] bg-[#EAF2F5] p-5">
            <h4 className="font-semibold">Meet the Artist</h4>
            <p className="mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque,
              ullam.
            </p>

            <button className="mt-5 cursor-pointer bg-[#FFE5CE] p-2 font-thin">
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Featured