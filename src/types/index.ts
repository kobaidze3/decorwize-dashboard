
export interface Manufacturer {
  id: string;
  name: string;
  logo?: string;
  isSubscribed: boolean;
  brands: Brand[];
}

export interface Brand {
  id: string;
  manufacturerId: string;
  name: string;
  logo?: string;
  isSubscribed: boolean;
  collections: Collection[];
}

export interface Collection {
  id: string;
  brandId: string;
  name: string;
  thumbnail?: string;
  products: Product[];
}

export interface Product {
  id: string;
  collectionId: string;
  name: string;
  image: string;
  description?: string;
}

export interface Interior {
  id: string;
  name: string;
  image: string;
  isEnabled: boolean;
  isCustom: boolean;
}
