export const blogPostsQuery = `
*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  author,
  description,
  publishedAt,
  mainImage{
    asset,
    alt
  }
}
`

export const singlePostBySlugQuery = `
*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  author,
  description,
  publishedAt,
  mainImage{
    asset,
    alt
  },
  body
}
`

export const recentPostsQuery = `
*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  mainImage{
    asset,
    alt
  }
}
`

export const galleryCategoriesQuery = `
*[_type == "galleryCategory"] | order(sortOrder asc, title asc){
  _id,
  title,
  "slug": slug.current,
  projectType,
  projectDate,
  summary,
  coverImage{ asset, alt }
}
`

export const galleryCategoryBySlugQuery = `
*[_type == "galleryCategory" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  projectType,
  projectDate,
  summary,
  coverImage{ asset, alt }
}
`

export const galleryImagesByCategorySlugQuery = `
*[_type == "galleryImage" && category->slug.current == $slug]
| order(sortOrder asc, createdAt desc){
  _id,
  title,
  createdAt,
  image{ asset, alt }
}
`

export const galleryCategorySlugsQuery = `
*[_type == "galleryCategory" && defined(slug.current)] | order(sortOrder asc, title asc){
  "slug": slug.current
}
`