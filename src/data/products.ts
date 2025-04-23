import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    category: "Electronics",
    rating: 4.8,
    image: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 40-hour battery life, and ultra-comfortable ear cushions for all-day wear.",
    features: [
      "Active Noise Cancellation",
      "40-hour Battery Life",
      "Bluetooth 5.2",
      "Built-in Microphone",
      "Touch Controls"
    ],
    inStock: true,
    tags: ["headphones", "audio", "wireless", "premium"]
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    price: 249.99,
    category: "Furniture",
    rating: 4.6,
    image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Work in comfort with our ergonomic office chair. Designed to support proper posture with lumbar support, adjustable armrests, and breathable mesh fabric that keeps you cool during long work sessions.",
    features: [
      "Adjustable Height",
      "Lumbar Support",
      "Breathable Mesh",
      "360° Swivel",
      "Sturdy 5-wheel Base"
    ],
    inStock: true,
    tags: ["furniture", "office", "chair", "ergonomic"]
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    price: 199.99,
    category: "Electronics",
    rating: 4.5,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Track your fitness goals with precision using our smart fitness watch. Monitor heart rate, sleep patterns, and various workout metrics. Water-resistant and featuring a 5-day battery life.",
    features: [
      "Heart Rate Monitor",
      "Sleep Tracking",
      "5-day Battery Life",
      "Water Resistant (50m)",
      "GPS Tracking"
    ],
    inStock: true,
    discountPercentage: 15,
    tags: ["electronics", "fitness", "smartwatch", "health"]
  },
  {
    id: 4,
    name: "Professional Camera Kit",
    price: 1299.99,
    category: "Electronics",
    rating: 4.9,
    image: "https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Capture stunning photos and videos with our professional camera kit. Includes a high-resolution DSLR camera, two premium lenses, a tripod, and a carrying case.",
    features: [
      "24.2MP Sensor",
      "4K Video Recording",
      "Dual Lens Kit (18-55mm & 70-300mm)",
      "Adjustable ISO 100-25600",
      "Wi-Fi & Bluetooth Connectivity"
    ],
    inStock: true,
    tags: ["electronics", "camera", "photography", "professional"]
  },
  {
    id: 5,
    name: "Minimalist Desk Lamp",
    price: 89.99,
    category: "Home Decor",
    rating: 4.7,
    image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Add style and functionality to your workspace with our minimalist desk lamp. Features adjustable brightness levels, color temperature control, and a sleek design that complements any decor.",
    features: [
      "Touch Controls",
      "5 Brightness Levels",
      "3 Color Temperatures",
      "USB Charging Port",
      "Auto-Off Timer"
    ],
    inStock: true,
    tags: ["home", "lighting", "desk", "minimal"]
  },
  {
    id: 6,
    name: "Premium Coffee Maker",
    price: 159.99,
    category: "Kitchen",
    rating: 4.6,
    image: "https://images.pexels.com/photos/6542313/pexels-photo-6542313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Brew barista-quality coffee at home with our premium coffee maker. Programmable settings, thermal carafe to keep coffee hot for hours, and a built-in grinder for the freshest taste.",
    features: [
      "Built-in Grinder",
      "Programmable Timer",
      "Thermal Carafe",
      "Water Filtration System",
      "Multiple Brew Strengths"
    ],
    inStock: true,
    discountPercentage: 10,
    tags: ["kitchen", "coffee", "appliance", "premium"]
  },
  {
    id: 7,
    name: "Leather Messenger Bag",
    price: 129.99,
    category: "Fashion",
    rating: 4.7,
    image: "https://images.pexels.com/photos/6308096/pexels-photo-6308096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Carry your essentials in style with our genuine leather messenger bag. Features multiple compartments, including a padded laptop sleeve, and adjustable shoulder strap for comfort.",
    features: [
      "Genuine Full-grain Leather",
      "Padded 15\" Laptop Compartment",
      "Water-resistant Lining",
      "Adjustable Shoulder Strap",
      "Magnetic Closures"
    ],
    inStock: true,
    tags: ["fashion", "bag", "leather", "accessory"]
  },
  {
    id: 8,
    name: "Smart Home Speaker",
    price: 179.99,
    category: "Electronics",
    rating: 4.5,
    image: "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Transform your home with our smart speaker. Voice-controlled to play music, answer questions, control smart home devices, and more, all with rich, room-filling sound.",
    features: [
      "360° Audio",
      "Voice Assistant",
      "Smart Home Controls",
      "Multi-room Sync",
      "Bluetooth & Wi-Fi Connectivity"
    ],
    inStock: false,
    tags: ["electronics", "smart home", "speaker", "audio"]
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.rating >= 4.7);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, count = 4): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, count);
};

export const categories = [
  "All",
  ...Array.from(new Set(products.map(product => product.category)))
];