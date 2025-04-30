import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Slideshow from "@/components/Slideshow";

export default function Home() {

  const slides = [
    '/cake.png',
    '/earth.png',
    '/socks.png'
  ];

  return (
    <>
      <Hero />
      <Featured />
      <Slideshow images={slides} />
      <Footer />
    </>
  );
}
