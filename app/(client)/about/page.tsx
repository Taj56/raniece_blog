import Container from "@/components/Container"
import Image from "next/image"

export default function AboutPage() {
  return (
    <Container className="min-h-screen pt-16">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <h1 className="text-center font-serif text-5xl font-bold text-gray-900">
          About the Blog
        </h1>

        <div className="relative mx-auto mt-16 w-full max-w-[1000px] pb-44">
          {/* Large Hero Image */}
          <div className="relative mx-auto h-[600px] w-full overflow-hidden">
            <Image
              src="/about-image.jpg"
              alt="About hero"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Larger Yellow Overlay Card */}
          <div className="absolute left-1/2 top-[70%] w-[85%] max-w-[850px] -translate-x-1/2 border border-black/10 bg-[#f2c15b] px-16 py-16 shadow-lg">
            <h2 className="text-center font-serif text-4xl font-bold text-gray-900">
              Hi!
            </h2>

            <p className="mx-auto mt-6 max-w-[600px] text-center text-[15px] leading-7 text-gray-900">
              Here, is a glimpse into my artistic journey as a young creative.
              I’ll be sharing my experiences and challenges. You’ll get a
              behind-the-scenes look at my creative process, from initial
              concepts and sketches to finished pieces. I’ll also discuss
              the tools, techniques and inspirations that influence my work.
              Join me as I learn, explore and grow as an artist.
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}