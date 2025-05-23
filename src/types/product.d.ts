// Interface for items returned by the /search API
export interface SearchResultItem {
  page_content: string;
  metadata: {
    brand: string | null;
    category: string;
    color: string;
    price: number;
    availability: string;
    _id: string;
    _collection_name: string;
  };
  product: Product; // This will now refer to the new Product interface
}

// Interface for a single product returned by the /products/{id} API
export interface Product {
  _id: string;
  source_file: string;
  product_name_schema: string;
  brand_schema: string;
  description_schema: string;
  color_schema: string;
  sku_schema: string;
  product_group_id_schema: string;
  material_schema: string;
  gender_schema: string | null;
  category_schema: string;
  aggregate_rating_schema: {
    rating_value: number;
    review_count: number;
  };
  offers_schema: Array<{
    sku: string;
    url: string;
    price_currency: string;
    price: string;
    availability: string;
  }>;
  product_name_display: string;
  price_details_display: {
    mrp_info: string;
  };
  displayed_color_name: string;
  available_colors_swatches: Array<{
    name: string;
    swatch_image_url: string;
    is_current: boolean;
    link: string;
  }>;
  sizes_display: Array<{
    size: string;
    availability_text: string;
  }>;
  description_and_fit: {
    general_description: string;
    art_no: string;
    details: { [key: string]: string | string[] }; // details can be string or string[]
  };
  main_image_url: string;
  image_variants: Array<{
    url: string;
    width: string;
  }>;
  materials: {
    composition: string[];
    materials_explained: { [key: string]: string };
  };
  care_guide: {
    intro_text: string;
    learn_more_link: string;
    instructions: string[];
  };
  delivery_and_payment: {
    info: string[];
  };
  breadcrumbs_schema: Array<{
    name: string;
    url: string;
    position: string;
  }>;
  vector_description: string;
}
