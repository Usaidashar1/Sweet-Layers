import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const SANITY_PROJECT_ID = "q4r6dusg";
export const SANITY_DATASET = "production";

export const sanityClient: SanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-10-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
type ImageSource = Parameters<typeof builder.image>[0];
export const urlFor = (source: ImageSource) => builder.image(source);

export type Product = {
  _id: string;
  name: string;
  slug?: { current: string };
  price: number;
  offerPrice?: number;
  description?: string;
  image?: ImageSource;
  category: "cakes" | "muffins" | "cupcakes" | "brownies" | "cookies" | "desserts";
  weight?: string;
  availability?: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  createdDate?: string;
};

export type Testimonial = {
  _id: string;
  name: string;
  location?: string;
  message: string;
  rating?: number;
  avatar?: ImageSource;
};

export type GalleryImage = {
  _id: string;
  title?: string;
  image: ImageSource;
  order?: number;
};

export const productsQuery = `*[_type == "product"] | order(createdDate desc){
  _id, name, slug, price, offerPrice, description, image, category, weight,
  availability, featured, bestSeller, createdDate
}`;

export const testimonialsQuery = `*[_type == "testimonial"]{_id, name, location, message, rating, avatar}`;

export const galleryQuery = `*[_type == "galleryImage"] | order(order asc){_id, title, image, order}`;

export const CATEGORIES: { value: Product["category"]; label: string }[] = [
  { value: "cakes", label: "Cakes" },
  { value: "muffins", label: "Muffins" },
  { value: "cupcakes", label: "Cupcakes" },
  { value: "brownies", label: "Brownies" },
  { value: "cookies", label: "Cookies" },
  { value: "desserts", label: "Desserts" },
];

export const WHATSAPP_NUMBER = "919999999999"; // TODO: replace with real number
export const PHONE_DISPLAY = "+91 99999 99999";
export const INSTAGRAM_URL = "https://instagram.com/sweetlayers";
export const LOCATION = "Karimnagar, Telangana, India";
export const BUSINESS_HOURS = "Mon – Sun • 10:00 AM – 9:00 PM";
