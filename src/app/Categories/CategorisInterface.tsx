export interface AllCategoriesResponse {
  results: number
  metadata: Metadata
  data: AllCategoriesData[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface AllCategoriesData {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
