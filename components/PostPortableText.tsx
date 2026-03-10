import Image from "next/image"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-[14px] leading-7 text-gray-700">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 font-serif text-2xl font-bold text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-7 font-serif text-xl font-bold text-gray-900">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-gray-300 pl-4 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc pl-6 text-gray-700">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal pl-6 text-gray-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mt-2">{children}</li>,
    number: ({ children }) => <li className="mt-2">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const src = urlFor(value).width(1200).fit("max").url()
      const alt = value?.alt || "post image"

      return (
        <div className="mt-8 flex w-full justify-center">
          <div className="relative w-full max-w-[360px] overflow-hidden">
            <Image
              src={src}
              alt={alt}
              width={720}
              height={720}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      )
    },
  },
}

export default function PostPortableText({ value }: { value: any }) {
  return <PortableText value={value} components={components} />
}