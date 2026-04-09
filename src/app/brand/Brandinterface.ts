// Brand item
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// Metadata (pagination)
export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

// Full API Response
export interface BrandsResponse {
  results: number;
  metadata: Metadata;
  data: Brand[];
}