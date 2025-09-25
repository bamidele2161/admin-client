import {
  AdidasIcon,
  AdidasProductIcon,
  AshluxIcon,
  AshProductIcon,
  HfIcon,
  HfProductIcon,
  ZttwIcon,
} from "../assets/svg/CustomSVGs";
import home1 from "../assets/home1.jpg";
import home3 from "../assets/home3.jpg";
import home2 from "../assets/home2.jpg";
import { type RowDataProps } from "../interfaces/Global";
import { useCookies } from "../hooks/cookiesHook";
import { persistor } from "../store/store";
export const brands = [
  {
    id: 1,
    name: "adidas",
    description: "ADIDAS NEW COLLECTION",
    img: AdidasIcon,
  },
  {
    id: 2,
    name: "ashlux",
    description: "ASHLUXURY NEW COLLECTION",
    img: AshluxIcon,
  },
  {
    id: 3,
    name: "hf",
    description: "HIGH-FASHION NEW COLLECTION",
    img: HfIcon,
  },
  { id: 4, name: "zttw", description: "ZTTW NEW COLLECTION", img: ZttwIcon },
];

export const carouselImages = [
  {
    src: home1,
    description: "DISCOVER YOUR STYLE",
  },
  {
    src: home2,
    description: "ELEVATE YOUR WARDROBE",
  },
  {
    src: home3,
    description: "UNLEASH YOUR CONFIDENCE",
  },
];

export const productData = [
  {
    id: 1,
    name: "adidas",
    description: "ADIDAS NEW COLLECTION",
    img: AdidasProductIcon,
    price: "4000",
  },

  {
    id: 2,
    name: "hf",
    description: "HIGH-FASHION NEW COLLECTION",
    img: HfProductIcon,
    price: "4000",
  },
  {
    id: 3,
    name: "ashlux",
    description: "ASHLUXURY NEW COLLECTION",
    img: AshProductIcon,
    price: "4000",
  },
  {
    id: 4,
    name: "zttw",
    description: "ZTTW NEW COLLECTION",
    img: HfProductIcon,
    price: "4000",
  },
];

export const categoriesData = [
  {
    id: 1,
    name: "Adidas",
  },

  {
    id: 2,
    name: "High-Fashion",
  },
  {
    id: 3,
    name: "Ashluxury",
  },
  {
    id: 4,
    name: "ZTTW",
  },
  {
    id: 5,
    name: "SlidesCity",
  },
  {
    id: 6,
    name: "Nike",
  },
  {
    id: 7,
    name: "Gucci",
  },
];

export const wearsList = [
  {
    id: "1",
    name: "Classic White Sneakers",
    brand: "Adidas",
    price: 89.99,
    rating: 5,
    gender: "FEMALE",
    reviews: 124,
    stock: 40,
    categoryId: 1,
    description: "Stylish and comfortable sneakers for everyday wear.",
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: ["white", "black"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "2",
    name: "Luxury Silk Scarf",
    brand: "High-Fashion",
    price: 149.99,
    rating: 4,
    gender: "MALE",
    stock: 27,
    categoryId: 1,
    reviews: 89,
    description: "Elegant silk scarf with a timeless design.",
    sizes: [],
    colors: ["red", "blue", "gold"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "3",
    name: "Black Turtleneck",
    brand: "Ashluxury",
    price: 79.99,
    rating: 5,
    reviews: 58,
    categoryId: 19,
    stock: 50,
    gender: "FEMALE",
    description: "Sophisticated black turtleneck for formal and casual wear.",
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: ["black"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "4",
    name: "Designer Slides",
    brand: "ZTTW",
    price: 49.99,
    rating: 4,
    categoryId: 1,
    gender: "MALE",
    stock: 90,
    reviews: 34,
    description: "Trendy slides perfect for summer outings.",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ["blue", "white", "black"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "5",
    name: "Teest",
    brand: "Ashluxury",
    price: 79.99,
    rating: 5,
    gender: "MALE",
    categoryId: 7,
    stock: 7,
    reviews: 58,
    description: "Sophisticated black turtleneck for formal and casual wear.",
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: ["black"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "6",
    name: "Leather Wallet",
    brand: "Gucci",
    price: 299.99,
    rating: 5,
    gender: "MALE",
    categoryId: 1,
    stock: 4,
    reviews: 56,
    description: "Premium leather wallet with multiple compartments.",
    sizes: [],
    colors: ["brown", "black"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "7",
    name: "Running Shoes",
    brand: "Adidas",
    price: 109.99,
    rating: 5,
    gender: "FEMALE",
    categoryId: 1,
    reviews: 145,
    stock: 500,
    description: "Durable and lightweight shoes for active lifestyles.",
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: ["red", "black", "blue"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "8",
    name: "Tailored Blazer",
    brand: "High-Fashion",
    price: 349.99,
    categoryId: 3,
    rating: 5,
    stock: 500,
    gender: "MALE",
    reviews: 76,
    description: "Sharp and stylish blazer for formal events.",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ["black", "gray"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "9",
    name: "Hoodie",
    brand: "Ashluxury",
    price: 59.99,
    rating: 4,
    categoryId: 3,
    stock: 13,
    gender: "FEMALE",
    reviews: 98,
    description: "Comfortable hoodie made from premium cotton.",
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: ["black", "gray"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "10",
    name: "Slide Sandals",
    brand: "SlidesCity",
    price: 39.99,
    rating: 3,
    reviews: 45,
    categoryId: 1,
    gender: "MALE",
    description: "Comfortable slide sandals with cushioned soles.",
    sizes: [38, 39, 40, 41, 42, 43],
    colors: ["white", "black"],
    stock: 500,
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "11",
    name: "Fitness Tank Top",
    brand: "Nike",
    price: 29.99,
    rating: 4,
    stock: 51,
    gender: "FEMALE",
    reviews: 72,
    categoryId: 1,
    description: "Breathable and sweat-wicking tank top for workouts.",
    sizes: [38, 39, 40, 41, 42],
    colors: ["black", "gray", "red"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "12",
    name: "Wool Scarf",
    brand: "Gucci",
    price: 199.99,
    rating: 5,
    gender: "FEMALE",
    categoryId: 1,
    stock: 500,
    reviews: 84,
    description: "Luxurious wool scarf for cold weather.",
    sizes: [],
    colors: ["gray", "black", "red"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "13",
    name: "Classic T-Shirt",
    brand: "Adidas",
    price: 19.99,
    gender: "MALE",
    categoryId: 8,
    stock: 60,
    rating: 4,
    reviews: 95,
    description: "A timeless crew neck t-shirt made from soft fabric.",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ["white", "black", "gray"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "14",
    name: "Evening Gown",
    categoryId: 8,
    brand: "High-Fashion",
    price: 599.99,
    rating: 5,
    gender: "FEMALE",
    stock: 10,
    reviews: 65,
    description: "Stunning evening gown for special occasions.",
    sizes: [38, 39, 40, 41],
    colors: ["black", "red"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "15",
    name: "Cargo Pants",
    brand: "Ashluxury",
    price: 89.99,
    categoryId: 2,
    gender: "MALE",
    stock: 100,
    rating: 4,
    reviews: 110,
    description: "Functional and stylish cargo pants with multiple pockets.",
    sizes: [38, 39, 40, 41, 42, 43],
    colors: ["green", "black", "gray"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "16",
    name: "Beach Slides",
    brand: "SlidesCity",
    price: 34.99,
    stock: 500,
    rating: 3,
    categoryId: 4,
    gender: "MALE",
    reviews: 50,
    description: "Water-resistant slides for beach and poolside.",
    sizes: [38, 39, 40, 41, 42],
    colors: ["blue", "black"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "17",
    name: "Track Pants",
    brand: "Nike",
    stock: 130,
    price: 59.99,
    rating: 4,
    categoryId: 1,
    gender: "FEMALE",
    reviews: 63,
    description: "Comfortable track pants with a slim-fit design.",
    sizes: [38, 39, 40, 41, 42],
    colors: ["black", "gray", "navy"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "18",
    name: "Designer Belt",
    brand: "Gucci",
    price: 349.99,
    rating: 5,
    stock: 500,
    categoryId: 11,
    reviews: 110,
    gender: "MALE",
    description: "Elegant leather belt with signature buckle.",
    sizes: [],
    colors: ["brown", "black"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "19",
    name: "Running Jacket",
    brand: "Adidas",
    price: 129.99,
    rating: 5,
    gender: "MALE",
    categoryId: 1,
    stock: 40,
    reviews: 138,
    description: "Lightweight running jacket with reflective details.",
    sizes: [38, 39, 40, 41, 42],
    colors: ["red", "black"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: "20",
    name: "Running Jacket",
    brand: "Adidas",
    price: 129.99,
    stock: 500,
    rating: 5,
    reviews: 138,
    gender: "FEMALE",
    categoryId: 4,
    description: "Lightweight running jacket with reflective details.",
    sizes: [38, 39, 40, 41, 42],
    colors: ["red", "black"],
    mainImage: "https://via.placeholder.com/150",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
];

export const navItems = [
  { name: "Home", path: "/", id: 1 },
  { name: "All Categories", path: "/", id: 2 },
  { name: "Visual Search", path: "/visual-search", id: 3 },
  { name: "About Us", path: "/about-us", id: 4 },
  { name: "FAQs", path: "/faqs", id: 5 },
];

export const transactionsData: RowDataProps[] = [
  {
    id: 1,
    sender: "John Doe",
    beneficiary: "Jane Smith",
    bank: "Bank of America",
    amount: 10000.5,
    transactionType: "transfer",
    status: "successful",
    createdAt: "2024-12-15T14:30:00Z",
  },
  {
    id: 2,
    sender: "Alice Green",
    beneficiary: "Bob White",
    bank: "Chase Bank",
    amount: 250000.0,
    transactionType: "credit",
    status: "successful",
    createdAt: "2024-12-17T09:45:00Z",
  },
  {
    id: 3,
    sender: "Charlie Black",
    beneficiary: "David Blue",
    bank: "Citibank",
    amount: 5000000.75,
    transactionType: "debit",
    status: "failed",
    createdAt: "2024-12-18T12:00:00Z",
  },
  {
    id: 4,
    sender: "Eve White",
    beneficiary: "Frank Gray",
    bank: "Wells Fargo",
    amount: 30000.0,
    transactionType: "transfer",
    status: "successful",
    createdAt: "2024-12-18T13:00:00Z",
  },
  {
    id: 5,
    sender: "Grace Black",
    beneficiary: "Henry Yellow",
    bank: "HSBC",
    amount: 150000.0,
    transactionType: "credit",
    status: "failed",
    createdAt: "2024-12-19T10:30:00Z",
  },
  {
    id: 6,
    sender: "John Doe",
    beneficiary: "Jane Smith",
    bank: "Bank of America",
    amount: 10000.5,
    transactionType: "transfer",
    status: "successful",
    createdAt: "2024-12-15T14:30:00Z",
  },
  {
    id: 7,
    sender: "Alice Green",
    beneficiary: "Bob White",
    bank: "Chase Bank",
    amount: 250000.0,
    transactionType: "credit",
    status: "successful",
    createdAt: "2024-12-17T09:45:00Z",
  },
  {
    id: 8,
    sender: "Charlie Black",
    beneficiary: "David Blue",
    bank: "Citibank",
    amount: 5000000.75,
    transactionType: "debit",
    status: "failed",
    createdAt: "2024-12-18T12:00:00Z",
  },
];

export const tableCustomStyles = {
  headCells: {
    style: {
      color: "var(--Grey1)",
      fontWeight: 600,
      backgroundColor: "#F6F6F7",
      fontSize: 14,
      display: "flex",
      justifyContent: "center",
    },
  },
  cells: {
    style: {
      color: "#352F36",
      fontSize: "14px",
      fontWeight: "400",
      display: "flex",
      verticalAlign: "middle",
      padding: "30px 10px",
      justifyContent: "center",
    },
  },
  columns: {
    0: {
      style: {
        textAlign: "left",
        border: "solid red 2px !important",
        display: "flex",
        justifyContent: "start !important",
      },
    },
  },
};

export const productCategories = [
  { id: 1, name: "Tops" },
  { id: 2, name: "Trousers" },
  { id: 3, name: "Dresses" },
  { id: 4, name: "Gym Tops" },
  { id: 5, name: "Gym Bottoms" },
  { id: 6, name: "Workout Shorts" },
  { id: 7, name: "Yoga Pants" },
  { id: 8, name: "Footwear" },
  { id: 9, name: "T-shirts & Polos" },
  { id: 10, name: "Jeans & Trousers" },
  { id: 11, name: "Suits & Blazers" },
];

export const gender = [
  { id: 1, name: "Male" },
  { id: 2, name: "Female" },
  { id: 3, name: "Unisex" },
];

export const shopProgressBar = [
  { id: 1, title: "Cart" },
  { id: 2, title: "Delivery" },
  { id: 3, title: "Payment" },
  { id: 4, title: "Confirmation" },
];
export const formatTimestamp = (
  timestamp: string,
  includeTime: boolean = true
): string => {
  const date = new Date(timestamp);

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString("en-US", dateOptions);

  if (includeTime) {
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
    return `${formattedDate} ${formattedTime}`;
  }

  return formattedDate;
};

export const LogoutUser = (navigate: any) => {
  const { removeTokenCookie } = useCookies();

  removeTokenCookie("ashoboxToken");
  removeTokenCookie("_chatwoot_session");

  localStorage.removeItem("persist:ashobox");
  localStorage.clear();
  sessionStorage.clear();

  persistor.purge();
  navigate("/signin");

  window.location.reload();
};

export const LogoutAdmin = (navigate: any) => {
  const { removeTokenCookie } = useCookies();

  removeTokenCookie("ashoboxToken");
  removeTokenCookie("_chatwoot_session");

  localStorage.removeItem("persist:ashobox");
  localStorage.clear();
  sessionStorage.clear();

  persistor.purge();
  navigate("/admin-signin");

  window.location.reload();
};

export const LogoutShopper = (navigate: any) => {
  const { removeTokenCookie } = useCookies();

  removeTokenCookie("ashoboxToken");
  removeTokenCookie("_chatwoot_session");

  localStorage.removeItem("persist:ashobox");
  localStorage.clear();
  sessionStorage.clear();

  persistor.purge();
  navigate("/");

  window.location.reload();
};

export const fashionColors = [
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Purple",
  "Orange",
  "Pink",
  "Gray",
  "Brown",
  "Beige",
  "Navy",
  "Teal",
  "Maroon",
];

export const fashionSizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
];

export const fashionMaterials = [
  { id: 1, name: "Cotton" },
  { id: 2, name: "Linen" },
  { id: 3, name: "Silk" },
  { id: 4, name: "Wool" },
  { id: 5, name: "Denim" },
  { id: 6, name: "Leather" },
  { id: 7, name: "Suede" },
  { id: 8, name: "Polyester" },
  { id: 9, name: "Nylon" },
  { id: 10, name: "Rayon" },
  { id: 11, name: "Spandex" },
  { id: 12, name: "Acrylic" },
  { id: 13, name: "Velvet" },
  { id: 14, name: "Chiffon" },
  { id: 15, name: "Satin" },
  { id: 16, name: "Fleece" },
  { id: 17, name: "Jersey" },
  { id: 18, name: "Tulle" },
  { id: 19, name: "Tweed" },
  { id: 20, name: "Canvas" },
];

export const faqs = [
  {
    id: 1,
    question: "What is AshoBox?",
    answer:
      "AshoBox is a fashion marketplace where customers can browse, shop, and order wears, while vendors can showcase and sell their products.",
  },
  {
    id: 2,
    question: "How do I create an account?",
    answer:
      "Simply click on the 'Sign Up' button, choose your role as either a customer or a vendor, and fill in the required details to get started.",
  },
  {
    id: 3,
    question: "Can I sell my products on AshoBox?",
    answer:
      "Yes, vendors can create a store on AshoBox, upload their wears, manage orders, and track their sales directly from their dashboard.",
  },
  {
    id: 4,
    question: "How do I place an order?",
    answer:
      "Browse through the available wears, add items you like to your cart, and proceed to checkout. You can review your order before making payment.",
  },
  {
    id: 5,
    question: "What payment methods are accepted?",
    answer:
      "AshoBox supports secure online payments, including debit/credit cards, bank transfers, and other local payment options.",
  },
  {
    id: 6,
    question: "Can I track my order?",
    answer:
      "Yes, once your order is placed, you can track its status from your customer dashboard until it is delivered.",
  },
  {
    id: 7,
    question: "How do I manage my store as a vendor?",
    answer:
      "Vendors have access to a dashboard where they can upload products, update stock, view orders, track sales, and monitor performance.",
  },
  {
    id: 8,
    question: "Is there a fee for selling on AshoBox?",
    answer:
      "AshoBox charges a small commission on each sale to help maintain the platform and provide secure transactions.",
  },
  {
    id: 9,
    question: "Can I return or exchange an item?",
    answer:
      "Yes, returns or exchanges are possible depending on the vendor’s return policy. Please check the product details or contact the vendor directly.",
  },
  {
    id: 10,
    question: "How do I contact customer support?",
    answer:
      "You can reach AshoBox support via the in-app help center, email, or chat. Our support team is always ready to assist you.",
  },
];
