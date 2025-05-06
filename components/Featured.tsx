import Image from "next/image"
import secondImage from '@/assets/images/second.jpg'
import thirdImage from '@/assets/images/third.png'
import { getFeaturedData } from "@/sanity/lib/helpers/queries"
import { FEATURED_QUERYResult } from "@/sanity.types"
import { urlFor } from "@/sanity/lib/image"
// import borderStyle from '@/assets/images/style.png'


const Featured = async () => {

    const creationData: FEATURED_QUERYResult = await getFeaturedData('creation-of-the-blog');
    const artistData: FEATURED_QUERYResult = await getFeaturedData('meet-the-artist');

  return (
    <section className="w-full min-h-screen relative">
        <h3 className="text-3xl font-bold font-serif mb-12 mt-16 ml-12 md:ml-[335px] md:mt-56 md:mb-0">Featured Posts</h3>

        <div className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center gap-5 md:-mt-28">
            <div className="w-[500px]l h-full flex flex-col gap-5 justify-center items-center">

                {/* 
                    TODO
                    THE FIRST TWO CARDS CAN BE CONTROLLED FROM THE CMS
                    IT WILL BE MAPPED FROM THE SANITY DATABASE

                    ADD A FEATURED TOGGLE IN THE CMS
                    ONLY ENABLE TWO POST THE MAX

                */}

                <div className="flex flex-col md:flex-row">
                    <div>
                        {/* post thumbnail */}
                        <Image src={urlFor(artistData?.mainImage).url()} alt={'post thumbnail'} width={250} height={250} className={'h-[235px] w-[270px]'}/>
                    </div>
                    <div className="w-[270px] h-[235px] bg-[#EAF2F5] p-5">
                        {/* post title - description - button */}
                        <h4 className="font-semibold">{artistData?.title}</h4>
                        <p className="mt-2">
                           {artistData?.description}
                        </p>

                        <button className="mt-5 bg-[#FFE5CE] p-2 font-thin cursor-pointer">Read More</button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div>
                        {/* post thumbnail */}
                        <Image src={urlFor(creationData?.mainImage).url()} alt={'post thumbnail'} width={250} height={270} className={'h-[235px] w-[270px]'}/>
                    </div>
                    <div className="w-[270px] h-[235px] bg-[#EAF2F5] p-5">
                        {/* post title - description - button */}
                        <h4 className="font-semibold">{creationData?.title}</h4>
                        <p className="mt-2">
                            {creationData?.description}
                        </p>
                        <button className="mt-5 bg-[#FFE5CE] p-2 font-thin cursor-pointer">Read More</button>
                    </div>
                </div>
            
            </div>

            <div className="flex flex-col">
                <div>
                    {/* post thumbnail */}
                    <Image src={thirdImage} alt={'post thumbnail'} width={250} height={250} className={'w-[270px] h-[235px]'}/>
                </div>
                <div className="w-[270px] h-[235px] bg-[#EAF2F5] p-5">
                    {/* post title - description - button */}
                    <h4 className="font-semibold">Meet the Artist</h4>
                    <p className="mt-2">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque, ullam.
                    </p>

                    <button className="mt-5 bg-[#FFE5CE] p-2 font-thin cursor-pointer">Read More</button>
                </div>
            </div>

            {/* <div className="w-full hidden md:block absolute bottom-5">
                <Image src={borderStyle} alt={'border style'} width={250} height={250} className="w-full"/>
            </div>   */}
        </div>

    </section>
  )
}
export default Featured