// Categories
import Tshirts from "../assets/Tshirt.png";
import Hoodies from "../assets/Hoodie.png";
import Sweatshirts from "../assets/SweatShirts.png";
import Jackets from "../assets/Boomer.png";
import Shorts from "../assets/Shorts.png";

import Tshirt from "./Tshirt.png";
import Hoodie from "./Hoodie.png";
import SweatShirt from "./SweatShirts.png";
import Boomer from "./Boomer.png";
import Short from "./Shorts.png";

// Users (for testimonials)
import user1 from "./testimonials/user1.jpg";
import user2 from "./testimonials/user2.jpg";
import user3 from "./testimonials/user3.jpg";

// Blogs
import blog1 from "../assets/blogs/blog1.jpg";
import blog2 from "../assets/blogs/blog2.jpg";
import blog3 from "../assets/blogs/blog3.jpg";
import blog4 from "../assets/blogs/blog4.jpg";

export const categories = [
  {
    name: "t-shirts",
    image: Tshirts,
  },
  {
    name: "hoodies",
    image: Hoodies,
  },
  {
    name: "sweatshirts",
    image: Sweatshirts,
  },
  {
    name: "jackets",
    image: Jackets,
  },
  {
    name: "shorts",
    image: Shorts,
  },
];

export const dummyProducts = [
  {
    _id: "1",
    name: "Classic One Piece Anime Tshirt with Bold Print",
    image: [Tshirt],
    price: 95,
    offerPrice: 45,
    sizes: ["M", "L", "XL"],
    description:
      "Show off your love for One Piece with this classic anime t-shirt, featuring a bold print that combines comfort and style for everyday wear.",
    category: "t-shirts",
    popular: true,
    inStock: true,
  },
  {
    _id: "2",
    name: "Itadori Yuji Hoodie with Vibrant Graphic Design",
    image: [Hoodie],
    price: 89,
    offerPrice: 40,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Stay stylish and comfortable with this Itadori Yuji hoodie, featuring vibrant graphic design that brings your favorite character to life.",
    category: "hoodies",
    popular: true,
    inStock: true,
  },
  {
    _id: "3",
    name: "Pain Naruto Sweatshirt with Striking Artwork",
    image: [SweatShirt],
    price: 92,
    offerPrice: 35,
    sizes: ["S", "M", "L"],
    description:
      "Show your anime pride with this Pain Naruto sweatshirt, featuring striking artwork and a comfortable, casual fit.",
    category: "sweatshirts",
    popular: true,
    inStock: true,
  },
  {
    _id: "4",
    name: "Itachi Uchiha Boomer Jacket with High-Quality Print",
    image: [Boomer],
    price: 98,
    offerPrice: 50,
    sizes: ["M", "L", "XL"],
    description:
      "Channel your inner Itachi with this premium boomer jacket, featuring high-quality prints and a bold ninja-inspired design.",
    category: "jackets",
    popular: true,
    inStock: true,
  },
  {
    _id: "5",
    name: "One Piece Shorts",
    image: [Short],
    price: 85,
    offerPrice: 30,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Level up your casual look with these One Piece shorts, blending anime-inspired style with all-day comfort.",
    category: "shorts",
    popular: false,
    inStock: true,
  },
  {
    _id: "6",
    name: "One Piece Shorts",
    image: [Short],
    price: 85,
    offerPrice: 30,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Level up your casual look with these One Piece shorts, blending anime-inspired style with all-day comfort.",
    category: "shorts",
    popular: false,
    inStock: true,
  },
  {
    _id: "7",
    name: "Itachi Uchiha Boomer Jacket with High-Quality Print",
    image: [Boomer],
    price: 98,
    offerPrice: 50,
    sizes: ["M", "L", "XL"],
    description:
      "Channel your inner Itachi with this premium boomer jacket, featuring high-quality prints and a bold ninja-inspired design.",
    category: "jackets",
    popular: true,
    inStock: true,
  },
];

export const blogs = [
  {
    title: "Top 10 Iconic Anime Outfits Every Fan Dreams Of Wearing",
    image: blog1,
  },
  {
    title: "From Screen to Street: How Anime Fashion Inspires Today’s Trends",
    image: blog2,
  },
  {
    title: "Must-Have Anime Tops for Every True Otaku Wardrobe",
    image: blog3,
  },
  {
    title:
      "The Evolution of Anime Style: From Classic Characters to Modern Drip",
    image: blog4,
  },
];

export const dummyOrders = [
  {
    _id: "66i7guy876h756gwgreghc56456v5tc",
    userId: "68591d36daf423db94fa8f4f",
    items: [
      { product: dummyProducts[0], quantity: 2, size: "M" },
      { product: dummyProducts[1], quantity: 1, size: "L" },
    ],
    address: {
      firstName: "John",
      lastName: "Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      country: "USA",
      zipcode: "10001",
      phone: "+1 123 456 7890",
    },
    amount: 85,
    paymentMethod: "stripe",
    isPaid: true,
    status: "Delivered",
    createdAt: "2024-06-10T10:00:00.000Z",
  },
  {
    _id: "66i7guy876h756gwgreghc56457v5tc",
    userId: "68591d36daf423db94fa8f4g",
    items: [
      { product: dummyProducts[2], quantity: 2, size: "M" },
      { product: dummyProducts[3], quantity: 1, size: "L" },
    ],
    address: {
      firstName: "John",
      lastName: "Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      country: "USA",
      zipcode: "10001",
      phone: "+1 123 456 7890",
    },
    amount: 85,
    paymentMethod: "stripe",
    isPaid: true,
    status: "Delivered",
    createdAt: "2024-06-10T10:00:00.000Z",
  },
];

export const testimonials = [
  {
    name: "Alice Johnson",
    date: "2024-05-20",
    feedback:
      "I absolutely love the quality of the products! They are stylish and comfortable.",
    image: user1,
  },
  {
    name: "Bob Smith",
    date: "2024-05-22",
    feedback:
      "Great customer service and fast shipping. Highly recommend this store!",
    image: user2,
  },
  {
    name: "Charlie Brown",
    date: "2024-05-23",
    feedback:
      "The sizing was a bit off for me, but the return process was easy.",
    image: user3,
  },
];
