import Container from "@/components/Container"
import { Instagram, Youtube, Twitter, Music2 } from "lucide-react"

export default function ContactPage() {
  return (
    <Container className="min-h-screen pt-0">
      {/* Full width hero background */}
      <section
        className="w-full"
        style={{
          backgroundImage: "url(/about-image.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Match the big “banner” height like Wix */}
        <div className="mx-auto flex min-h-[720px] w-full max-w-[1400px] items-center px-6 py-12">
          {/* Big centered white card */}
          <div className="mx-auto w-full max-w-[1100px] border border-black/15 bg-white px-14 py-16 shadow-sm">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {/* Left */}
              <div>
                <h1 className="font-serif text-7xl font-bold tracking-tight text-[#8c1111]">
                  Say Hello !
                </h1>

                <p className="mt-6 max-w-[360px] text-[15px] leading-7 text-gray-700">
                  Feel free to leave to give feedback, suggestions and recommendations!
                  I&apos;d love to hear from you!
                </p>

                <div className="mt-16">
                  <div className="text-[13px] text-gray-800">Check me out!</div>

                  <div className="mt-4 flex items-center gap-3 text-gray-900">
                    <a
                      href="#"
                      aria-label="Instagram"
                      className="rounded-full p-2 hover:bg-gray-100"
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      href="#"
                      aria-label="YouTube"
                      className="rounded-full p-2 hover:bg-gray-100"
                    >
                      <Youtube size={20} />
                    </a>
                    <a
                      href="#"
                      aria-label="Twitter"
                      className="rounded-full p-2 hover:bg-gray-100"
                    >
                      <Twitter size={20} />
                    </a>
                    <a
                      href="#"
                      aria-label="Music"
                      className="rounded-full p-2 hover:bg-gray-100"
                    >
                      <Music2 size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right (form) */}
              <form className="space-y-6">
                <div>
                  <label className="text-[12px] text-gray-800">Name</label>
                  <input
                    className="mt-2 w-full border border-gray-400 px-3 py-2 text-sm outline-none focus:border-gray-700"
                    type="text"
                  />
                </div>

                <div>
                  <label className="text-[12px] text-gray-800">Email *</label>
                  <input
                    className="mt-2 w-full border border-gray-400 px-3 py-2 text-sm outline-none focus:border-gray-700"
                    type="email"
                    required
                  />
                </div>

                <div>
                  <label className="text-[12px] text-gray-800">Message</label>
                  <textarea
                    className="mt-2 h-[120px] w-full resize-none border border-gray-400 px-3 py-2 text-sm outline-none focus:border-gray-700"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full bg-[#8c1111] py-3 text-center text-sm font-medium text-white hover:bg-[#781010]"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}