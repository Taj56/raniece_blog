import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

export const getFeaturedData = async (slug: string) => {
    const FEATURED_QUERY = defineQuery(`*[_type == 'post' && slug.current == $slug] | order(name asc)[0]{
        "currentSlug": slug.current,
        mainImage,
        description,
        title
    }`)
        
    // console.log(FEATURED_QUERY)

    try {
        const featuredData = await sanityFetch({
            query: FEATURED_QUERY,
            params: {
                slug
            }
        })
        return featuredData.data || [];
    } catch (error) {
        console.error('Error fetching featured data', error);
        return [];
    }
}