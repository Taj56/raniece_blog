// import Image from "next/image"

const Footer = () => {
  return (
    <>
        <section className="w-full min-h-[40vh] bg-[#FFE5CE] flex flex-col md:flex-row justify-center items-center gap-5 p-5">
            <h2 className="text-2xl md:text-4xl font-bold font-serif text-[#b32837] text-center w-[200px]">
                The Creative Journey
            </h2>

            <p className="w-[300px] md:w-[550px]">
                The Creative Journal is headquartered in Kingston, Jamaica <br />
                © 2025 The Creative Journal. Developed by <span className="font-bold">The Creative Journal</span>
            </p>
        </section>
        {/* <div className="w-full h-[20vh] bg-[#FFE5CE]">
            <Image src={"/wrap.png"} alt="" width={1000} height={1000} className="min-w-full min-h-full"/>
        </div> */}
    </>
  )
}
export default Footer